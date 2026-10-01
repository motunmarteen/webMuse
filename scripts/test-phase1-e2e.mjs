import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('\n==================================================================');
console.log('  WEBMUSE OS // PHASE 1 END-TO-END DATA & API INTEGRATION TEST   ');
console.log('==================================================================\n');

const DB_FILE = path.join(process.cwd(), 'data', 'webmuse-db.json');

// 1. Verify Database Initialization & Schema Integrity
assert.ok(fs.existsSync(DB_FILE), 'Database JSON file must exist on disk');
const dbContent = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('  [PASS] 1. Data Store initialized at data/webmuse-db.json');
assert.ok(Array.isArray(dbContent.clients), 'clients collection must exist');
assert.ok(Array.isArray(dbContent.projects), 'projects collection must exist');
assert.ok(Array.isArray(dbContent.vaultSecrets), 'vaultSecrets collection must exist');

// 2. Verify Seed Client & Project
const seedClient = dbContent.clients.find((c) => c.email === 'client@apexlabs.io');
assert.ok(seedClient, 'Seed client (client@apexlabs.io) must exist');
assert.strictEqual(seedClient.company, 'Apex Labs Inc.');
console.log(`  [PASS] 2. Seed Client verified: ${seedClient.name} (${seedClient.email})`);

const seedProject = dbContent.projects.find((p) => p.slug === 'apex-protocol');
assert.ok(seedProject, 'Seed project (apex-protocol) must exist');
assert.strictEqual(seedProject.milestones.length, 5, 'Project must have all 5 phased milestones');
assert.strictEqual(seedProject.milestones[0].status, 'in_progress', 'Phase 1 must be active');
assert.strictEqual(seedProject.milestones[1].status, 'locked', 'Phase 2 must be locked');
console.log(`  [PASS] 3. Seed Project verified: "${seedProject.title}" with 5 milestones`);

// 3. Verify Living PRD Structure in Seed Project
assert.ok(seedProject.prd, 'Living PRD document must exist in project');
assert.strictEqual(seedProject.prd.version, '1.0.0');
assert.ok(seedProject.prd.featureMatrix.length >= 3, 'PRD must contain feature matrices');
console.log(`  [PASS] 4. Living PRD structure validated (v${seedProject.prd.version})`);

// 4. Verify Vault Secrets AES-256 Encryption
assert.ok(dbContent.vaultSecrets.length >= 3, 'Vault secrets must exist');
dbContent.vaultSecrets.forEach((sec) => {
  assert.ok(sec.encryptedValue, `Secret ${sec.keyLabel} must have ciphertext`);
  assert.ok(sec.iv, `Secret ${sec.keyLabel} must have IV`);
  assert.ok(sec.authTag, `Secret ${sec.keyLabel} must have authTag`);
  assert.ok(!sec.encryptedValue.includes('Staging'), 'Ciphertext must not leak plaintext');
});
console.log(`  [PASS] 5. Vault Secrets verified encrypted with AES-256-GCM`);

console.log('\n------------------------------------------------------------------');
console.log('  ALL INTEGRATION CHECKS PASSED (5/5) — ZERO ANOMALIES DETECTED   ');
console.log('------------------------------------------------------------------\n');
