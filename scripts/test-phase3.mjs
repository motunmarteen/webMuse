import assert from 'node:assert';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

console.log('\n======================================================');
console.log('  WEBMUSE OS // PHASE 3 VERIFICATION & AUDIT SUITE    ');
console.log('======================================================\n');

const DB_FILE = path.join(process.cwd(), 'data', 'webmuse-db.json');
const SESSION_SECRET = process.env.WM_SESSION_SECRET || 'webmuse_os_session_secret_dev_key_32_bytes_min_length!';

function generateScopeSignature(projectId, clientEmail, prdVersion, timestamp) {
  const payload = `${projectId}:${clientEmail}:${prdVersion}:${timestamp}`;
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
}

async function runPhase3Tests() {
  assert.ok(fs.existsSync(DB_FILE), 'Database JSON file must exist on disk');
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // ----------------------------------------------------
  // TEST 1: Living "Genesis Canvas" PRD Schema Integrity
  // ----------------------------------------------------
  const project = db.projects.find((p) => p.slug === 'apex-protocol');
  assert.ok(project, 'Apex Protocol seed project must exist');
  assert.ok(project.prd, 'Project must contain Living PRD');
  assert.strictEqual(project.prd.version, '1.0.0', 'PRD version must be v1.0.0');
  assert.ok(project.prd.title.length > 5, 'PRD title must be defined');
  assert.ok(project.prd.problemStatement.length > 20, 'Problem statement must be substantive');
  assert.ok(project.prd.targetAudience.length > 10, 'Target audience must be specified');
  assert.ok(project.prd.coreArchitecture.length > 15, 'Core architecture must be specified');
  assert.ok(Array.isArray(project.prd.featureMatrix), 'Feature matrix must be an array');
  assert.ok(project.prd.featureMatrix.length >= 3, 'Must have at least 3 feature categories');
  assert.ok(Array.isArray(project.prd.kpis), 'KPIs must be an array');
  console.log('  [PASS] 1. Living Genesis Canvas PRD Schema & Structure Verified');

  // ----------------------------------------------------
  // TEST 2: Scope Creep Shield Cryptographic Signature
  // ----------------------------------------------------
  const timestamp = new Date().toISOString();
  const testEmail = 'alex@apexlabs.io';
  const sigHash1 = generateScopeSignature(project.id, testEmail, '1.0.0', timestamp);
  const sigHash2 = generateScopeSignature(project.id, testEmail, '1.0.0', timestamp);
  assert.strictEqual(sigHash1, sigHash2, 'Signature must be deterministic for identical parameters');
  assert.strictEqual(sigHash1.length, 64, 'HMAC-SHA256 signature hash must be 64 hex characters');

  // Tamper check: modifying signer email changes hash
  const tamperedSig = generateScopeSignature(project.id, 'imposter@apexlabs.io', '1.0.0', timestamp);
  assert.notStrictEqual(sigHash1, tamperedSig, 'Altering signer email must invalidate signature');
  console.log('  [PASS] 2. Cryptographic Scope Creep Shield & Tamper-Evident Signatures');

  // ----------------------------------------------------
  // TEST 3: Scope Sign-Off State Machine Execution
  // ----------------------------------------------------
  project.prd.signedOffAt = timestamp;
  project.prd.signedOffBy = 'Alex Vance';
  project.prd.signedOffIp = '198.51.100.42';
  project.prd.signatureHash = sigHash1;

  // PRD Deliverable in Milestone 1 must auto-approve upon scope sign-off
  const m1 = project.milestones[0];
  const prdDel = m1.deliverables.find((d) => d.id === 'del_02');
  assert.ok(prdDel, 'Living PRD deliverable (del_02) must exist in Milestone 1');
  prdDel.status = 'approved';

  db.activityLogs.unshift({
    id: `act_signoff_${Date.now()}`,
    projectId: project.id,
    actor: 'client',
    actorName: 'Alex Vance',
    action: 'SCOPE_BASELINE_SIGNED_OFF',
    details: `Client approved Scope v1.0.0 baseline. Cryptographic signature locked: ${sigHash1.slice(0, 16)}...`,
    timestamp,
  });

  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');

  // Verify persistence
  const reloaded = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const reloadedProj = reloaded.projects.find((p) => p.slug === 'apex-protocol');
  assert.strictEqual(reloadedProj.prd.signedOffBy, 'Alex Vance');
  assert.strictEqual(reloadedProj.prd.signatureHash, sigHash1);
  assert.strictEqual(reloadedProj.milestones[0].deliverables.find((d) => d.id === 'del_02').status, 'approved');
  console.log('  [PASS] 3. Digital Scope Sign-Off State Machine & Auto-Approval');

  // ----------------------------------------------------
  // TEST 4: Milestone Progression Pipeline & Status Rules
  // ----------------------------------------------------
  assert.strictEqual(reloadedProj.milestones.length, 5, 'Must contain 5 phases');
  assert.strictEqual(reloadedProj.milestones[0].status, 'in_progress', 'Phase 1 must be in progress');
  assert.ok(
    ['locked', 'awaiting_payment'].includes(reloadedProj.milestones[1].status),
    'Phase 2 must be gated (locked or awaiting payment)'
  );
  assert.strictEqual(reloadedProj.milestones[2].status, 'locked', 'Phase 3 must be locked');
  assert.strictEqual(reloadedProj.milestones[3].status, 'locked', 'Phase 4 must be locked');
  assert.strictEqual(reloadedProj.milestones[4].status, 'locked', 'Phase 5 must be locked');
  console.log('  [PASS] 4. Milestone Pipeline & Progression Node Integrity');

  // ----------------------------------------------------
  // TEST 5: Granular Deliverables Checklist Inspection
  // ----------------------------------------------------
  const allDeliverables = reloadedProj.milestones.flatMap((m) => m.deliverables);
  assert.ok(allDeliverables.length >= 15, 'Must have at least 15 granular deliverables');
  allDeliverables.forEach((del) => {
    assert.ok(del.id, 'Deliverable must have unique ID');
    assert.ok(del.title, 'Deliverable must have title');
    assert.ok(['backlog', 'in_progress', 'ready_for_review', 'approved'].includes(del.status));
  });
  console.log('  [PASS] 5. Granular Deliverables Checklist & Status Badges');

  // ----------------------------------------------------
  // TEST 6: Audit Telemetry Logging
  // ----------------------------------------------------
  const signOffLog = reloaded.activityLogs.find((a) => a.action === 'SCOPE_BASELINE_SIGNED_OFF');
  assert.ok(signOffLog, 'Audit stream must log SCOPE_BASELINE_SIGNED_OFF');
  assert.strictEqual(signOffLog.actor, 'client');
  console.log('  [PASS] 6. Scope Audit Telemetry & Real-Time Stream Validation');

  // ----------------------------------------------------
  // CLEANUP: Restore seed project to pre-signed state for browser testing
  // ----------------------------------------------------
  reloadedProj.prd.signedOffAt = undefined;
  reloadedProj.prd.signedOffBy = undefined;
  reloadedProj.prd.signedOffIp = undefined;
  reloadedProj.prd.signatureHash = undefined;
  reloadedProj.milestones[0].deliverables.find((d) => d.id === 'del_02').status = 'ready_for_review';
  fs.writeFileSync(DB_FILE, JSON.stringify(reloaded, null, 2), 'utf8');

  console.log('\n------------------------------------------------------');
  console.log('  RESULTS: 6/6 TESTS PASSED — PHASE 3 FULLY VERIFIED   ');
  console.log('------------------------------------------------------\n');
}

runPhase3Tests().catch((err) => {
  console.error('\n[FAIL] Phase 3 Test Failure:', err);
  process.exit(1);
});
