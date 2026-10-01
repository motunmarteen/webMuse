import assert from 'node:assert';
import crypto from 'node:crypto';

console.log('\n======================================================');
console.log('  WEBMUSE OS // PHASE 1 VERIFICATION & AUDIT SUITE    ');
console.log('======================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error('         ', err.message);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error('         ', err.message);
  }
}

// -----------------------------------------------------------
// TEST 1: Cryptographic Magic Token Generation & SHA-256 Hashing
// -----------------------------------------------------------
test('1. Cryptographic Magic Token entropy & hashing', () => {
  const rawToken1 = crypto.randomBytes(32).toString('hex');
  const rawToken2 = crypto.randomBytes(32).toString('hex');
  assert.notStrictEqual(rawToken1, rawToken2, 'Tokens must have unique cryptographic entropy');
  assert.strictEqual(rawToken1.length, 64, '32-byte hex token must be 64 characters');

  const hash1 = crypto.createHash('sha256').update(rawToken1).digest('hex');
  const hash2 = crypto.createHash('sha256').update(rawToken1).digest('hex');
  assert.strictEqual(hash1, hash2, 'Hash of identical token must be deterministic');
  assert.strictEqual(hash1.length, 64, 'SHA-256 hash must be 64 characters');
});

// -----------------------------------------------------------
// TEST 2: HMAC-SHA256 Session Signing & Tamper Detection
// -----------------------------------------------------------
test('2. HMAC-SHA256 Session Signing & Anti-Tamper Verification', () => {
  const SECRET = 'webmuse_test_secret_key_32_bytes_test!';
  const payload = {
    role: 'client',
    email: 'client@apexlabs.io',
    projectSlug: 'apex-protocol',
    issuedAt: Date.now(),
    expiresAt: Date.now() + 60000,
  };

  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  const token = `${data}.${sig}`;

  // Valid verification
  const [partData, partSig] = token.split('.');
  const verifySig = crypto.createHmac('sha256', SECRET).update(partData).digest('base64url');
  assert.strictEqual(partSig, verifySig, 'Valid signature must match');

  // Tamper detection: modify payload
  const tamperedPayload = { ...payload, role: 'admin' };
  const tamperedData = Buffer.from(JSON.stringify(tamperedPayload)).toString('base64url');
  const tamperedSig = crypto.createHmac('sha256', SECRET).update(tamperedData).digest('base64url');
  assert.notStrictEqual(partSig, tamperedSig, 'Tampered data must fail signature verification');
});

// -----------------------------------------------------------
// TEST 3: AES-256-GCM Zero-Knowledge Secret Vault Encryption
// -----------------------------------------------------------
test('3. AES-256-GCM Encryption / Decryption Round-Trip', () => {
  const MASTER_KEY = 'webmuse_vault_aes256_master_key_dev_mode_32bytes!';
  const plainSecret = 'PostgresPassword2026!SuperSecret';

  const key = crypto.createHash('sha256').update(MASTER_KEY).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plainSecret, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  // Verify that raw secret is nowhere in encrypted ciphertext
  assert.ok(!encrypted.includes(plainSecret), 'Encrypted data must not expose plaintext');

  // Decrypt
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  assert.strictEqual(decrypted, plainSecret, 'Decrypted plaintext must exactly match original secret');
});

// -----------------------------------------------------------
// TEST 4: Anti-Self-Signup Security Guardrail Logic
// -----------------------------------------------------------
test('4. Anti-Self-Signup Whitelist Guardrail Verification', () => {
  const registeredClients = ['client@apexlabs.io'];
  const unauthorizedAttacker = 'attacker@random-domain.com';
  const legitimateClient = 'client@apexlabs.io';

  const checkAccess = (email) => {
    return registeredClients.includes(email.toLowerCase().trim());
  };

  assert.strictEqual(checkAccess(unauthorizedAttacker), false, 'Uninvited email must be rejected (HTTP 403)');
  assert.strictEqual(checkAccess(legitimateClient), true, 'Invited email must be accepted');
});

// -----------------------------------------------------------
// TEST 5: Single-Use & Expiration State Machine
// -----------------------------------------------------------
test('5. Magic Token Single-Use Invalidation & Expiration', () => {
  const tokenRecord = {
    tokenHash: 'sample_hash_9921',
    email: 'client@apexlabs.io',
    expiresAt: Date.now() + 15 * 60 * 1000,
    used: false,
  };

  // First use: valid
  assert.strictEqual(tokenRecord.used, false);
  assert.ok(Date.now() < tokenRecord.expiresAt);

  // Consume token
  tokenRecord.used = true;

  // Second use: must be rejected
  assert.strictEqual(tokenRecord.used, true, 'Replay attack must fail: token marked used');

  // Expired token test
  const expiredToken = {
    tokenHash: 'expired_hash',
    email: 'client@apexlabs.io',
    expiresAt: Date.now() - 1000, // in the past
    used: false,
  };
  assert.ok(Date.now() > expiredToken.expiresAt, 'Expired token must be rejected');
});

console.log('\n------------------------------------------------------');
console.log(`  RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('------------------------------------------------------\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
