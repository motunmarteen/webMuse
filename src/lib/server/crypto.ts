import crypto from 'node:crypto';
import type { SessionPayload } from '@/lib/types/portal';

// Master secrets with sensible fallbacks for development
const SESSION_SECRET = process.env.WM_SESSION_SECRET || 'webmuse_os_session_secret_dev_key_32_bytes_min_length!';
const VAULT_MASTER_KEY = process.env.WM_VAULT_KEY || 'webmuse_vault_aes256_master_key_dev_mode_32bytes!';

/**
 * Generates a 32-byte cryptographic random token and its SHA-256 hash
 */
export function generateMagicToken(): { rawToken: string; tokenHash: string } {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  return { rawToken, tokenHash };
}

/**
 * Computes SHA-256 hash of a string
 */
export function hashToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

/**
 * Signs a session payload into a tamper-proof string token (Base64 + HMAC-SHA256)
 */
export function signSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('base64url');
  return `${data}.${signature}`;
}

/**
 * Verifies and decodes a signed session token. Returns null if invalid or expired.
 */
export function verifySession(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [data, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(data)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);
    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));

    // Check expiration
    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * AES-256-GCM encryption for zero-knowledge vault secrets
 */
export function encryptSecret(plainText: string, masterKeyOverride?: string): {
  encryptedValue: string;
  iv: string;
  authTag: string;
} {
  const key = crypto.createHash('sha256').update(masterKeyOverride || VAULT_MASTER_KEY).digest();
  const iv = crypto.randomBytes(12); // Standard 12-byte IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return {
    encryptedValue: encrypted,
    iv: iv.toString('hex'),
    authTag,
  };
}

/**
 * AES-256-GCM decryption for vault secrets
 */
export function decryptSecret(
  data: { encryptedValue: string; iv: string; authTag: string },
  masterKeyOverride?: string
): string {
  const key = crypto.createHash('sha256').update(masterKeyOverride || VAULT_MASTER_KEY).digest();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(data.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(data.authTag, 'hex'));

  let decrypted = decipher.update(data.encryptedValue, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Generates an immutable scope sign-off hash for the PRD
 */
export function generateScopeSignature(
  projectId: string,
  clientEmail: string,
  prdVersion: string,
  timestamp: string
): string {
  const payload = `${projectId}:${clientEmail}:${prdVersion}:${timestamp}`;
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
}
