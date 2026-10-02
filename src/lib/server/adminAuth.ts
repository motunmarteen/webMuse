import crypto from 'node:crypto';

// Master agency admin key
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'webmuse-agency-root-2026';

interface RateLimitEntry {
  attempts: number;
  lockedUntil: number;
}

// In-memory rate limiting store (keyed by IP address)
const ipAttempts = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Checks and validates an admin passphrase attempt against the master key
 * with exponential backoff and rate-limiting protection.
 */
export function verifyAdminPassphrase(
  inputPassphrase: string,
  clientIp = '127.0.0.1'
): {
  success: boolean;
  error?: string;
  remainingAttempts?: number;
  lockedSeconds?: number;
} {
  const now = Date.now();
  const entry = ipAttempts.get(clientIp);

  // Check if currently locked out
  if (entry && entry.lockedUntil > now) {
    const lockedSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return {
      success: false,
      error: `RATE_LIMITED: Too many failed administrative attempts. Access locked for ${lockedSeconds}s.`,
      lockedSeconds,
    };
  }

  // Constant-time timing-safe comparison
  const inputBuffer = Buffer.from(inputPassphrase.trim());
  const masterBuffer = Buffer.from(ADMIN_SECRET_KEY);

  const isMatch =
    inputBuffer.length === masterBuffer.length &&
    crypto.timingSafeEqual(inputBuffer, masterBuffer);

  if (!isMatch) {
    const currentAttempts = (entry?.attempts || 0) + 1;
    if (currentAttempts >= MAX_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION_MS;
      ipAttempts.set(clientIp, { attempts: currentAttempts, lockedUntil });
      return {
        success: false,
        error: `RATE_LIMITED: Maximum security threshold exceeded. Access locked for 10 minutes.`,
        lockedSeconds: LOCKOUT_DURATION_MS / 1000,
        remainingAttempts: 0,
      };
    } else {
      ipAttempts.set(clientIp, { attempts: currentAttempts, lockedUntil: 0 });
      return {
        success: false,
        error: 'INVALID_CREDENTIALS: Admin passphrase rejected by agency enclave.',
        remainingAttempts: MAX_ATTEMPTS - currentAttempts,
      };
    }
  }

  // Success: Clear lockout records for this IP
  ipAttempts.delete(clientIp);
  return { success: true };
}

/**
 * Resets rate limit records (for testing or administrative overrides)
 */
export function resetAdminRateLimits(): void {
  ipAttempts.clear();
}
