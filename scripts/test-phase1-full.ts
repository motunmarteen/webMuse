import assert from 'node:assert';
import {
  getClients,
  getClientByEmail,
  getProjects,
  getProjectBySlug,
  saveMagicToken,
  verifyAndConsumeMagicToken,
  getVaultSecrets,
} from '../src/lib/server/store';
import { generateMagicToken, decryptSecret } from '../src/lib/server/crypto';

async function runFullVerification() {
  console.log('\n==================================================================');
  console.log('  WEBMUSE OS // FULL PHASE 1 STORE & CRYPTO INTEGRATION TEST      ');
  console.log('==================================================================\n');

  // 1. Initial Store Read & Auto-Seeding
  const clients = await getClients();
  assert.ok(clients.length >= 1, 'Clients table must be populated');
  const demoClient = await getClientByEmail('client@apexlabs.io');
  assert.ok(demoClient, 'client@apexlabs.io must exist');
  assert.strictEqual(demoClient.company, 'Apex Labs Inc.');
  console.log(`  [PASS] 1. Auto-seeding validated: Client "${demoClient.name}" (${demoClient.company})`);

  // 2. Anti-Self-Signup Rule Check
  const unknownClient = await getClientByEmail('hacker@unauthorized-domain.com');
  assert.strictEqual(unknownClient, null, 'Uninvited emails must return null (enforcing HTTP 403 in API)');
  console.log('  [PASS] 2. Anti-Self-Signup Whitelist enforcement verified (unregistered emails denied)');

  // 3. Project Model & Milestones Structure
  const projects = await getProjects();
  assert.ok(projects.length >= 1, 'Projects table must have at least one project');
  const project = await getProjectBySlug('apex-protocol');
  assert.ok(project, 'Project apex-protocol must exist');
  assert.strictEqual(project.milestones.length, 5, 'Project must contain exactly 5 phased milestones');
  assert.strictEqual(project.milestones[0].status, 'in_progress', 'Phase 1 must be in_progress');
  assert.strictEqual(project.milestones[1].status, 'locked', 'Phase 2 must be locked');
  assert.strictEqual(project.milestones[2].status, 'locked', 'Phase 3 must be locked');
  assert.strictEqual(project.milestones[3].status, 'locked', 'Phase 4 must be locked');
  assert.strictEqual(project.milestones[4].status, 'locked', 'Phase 5 must be locked');
  console.log(`  [PASS] 3. Project "${project.title}" validated with all 5 milestone phases`);

  // 4. Living PRD Canvas Structure
  assert.ok(project.prd, 'Project must include Living PRD');
  assert.strictEqual(project.prd.version, '1.0.0');
  assert.ok(project.prd.featureMatrix.length >= 3, 'PRD must include feature matrices');
  console.log(`  [PASS] 4. Living PRD Genesis Canvas verified (v${project.prd.version})`);

  // 5. Cryptographic Magic Link Lifecycle
  const { rawToken, tokenHash } = generateMagicToken();
  await saveMagicToken({
    rawToken,
    tokenHash,
    email: demoClient.email,
    projectId: project.id,
    expiresInMinutes: 15,
  });
  console.log('  [PASS] 5. Cryptographic Magic Token generated and saved');

  // Verify and consume token (First attempt: MUST SUCCEED)
  const verification = await verifyAndConsumeMagicToken(rawToken);
  assert.strictEqual(verification.valid, true, 'Valid token must be successfully consumed');
  assert.strictEqual(verification.email, demoClient.email);
  console.log('  [PASS] 6. Token successfully verified and consumed for client session');

  // Replay Attack Test (Second attempt with same token: MUST BE REJECTED)
  const replayAttempt = await verifyAndConsumeMagicToken(rawToken);
  assert.strictEqual(replayAttempt.valid, false, 'Replay attempt must fail (Single-use enforcement)');
  console.log('  [PASS] 7. Single-use guardrail verified (replaying consumed token rejected)');

  // 6. Black Box Secret Vault AES-256 Decryption Test
  const secrets = await getVaultSecrets(project.id, false);
  assert.ok(secrets.length >= 3, 'Project must have vault secrets');
  const stagingSecret = secrets.find((s) => s.category === 'staging_auth');
  assert.ok(stagingSecret, 'Staging auth secret must exist in vault');

  const decryptedPassword = decryptSecret({
    encryptedValue: stagingSecret.encryptedValue,
    iv: stagingSecret.iv,
    authTag: stagingSecret.authTag,
  });
  assert.strictEqual(decryptedPassword, 'Staging2026!ApexSecure#', 'Decrypted staging password must match');
  console.log('  [PASS] 8. Zero-Knowledge Secret Vault verified: AES-256-GCM decryption accurate');

  console.log('\n------------------------------------------------------------------');
  console.log('  ALL INTEGRATION TESTS PASSED (8/8) — ZERO ANOMALIES DETECTED   ');
  console.log('==================================================================\n');
}

runFullVerification().catch((err) => {
  console.error('\n[FATAL TEST ERROR]:', err);
  process.exit(1);
});
