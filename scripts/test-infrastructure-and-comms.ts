import assert from 'node:assert';
import {
  getProjectById,
  getProjectChatMessages,
  sendChatMessage,
  markChatMessagesRead,
  subscribeToMaintenanceRetainer,
  reportEmergencyIncident,
  getProjectIncidentReports,
} from '../src/lib/server/store';

console.log('\n======================================================');
console.log('  WEBMUSE OS // INFRASTRUCTURE, COMMS & RETAINER TEST');
console.log('======================================================\n');

async function runTests() {
  const projectId = 'proj_apex_01';
  const project = await getProjectById(projectId);
  assert.ok(project, 'Project proj_apex_01 must exist');

  // TEST 1: Domains & SSL Expiry Monitor
  console.log('  [PASS] 1. Domain & SSL Expiry Monitor:');
  const domains = project.domains || [];
  assert.ok(domains.length >= 2, 'Must have at least 2 registered domains/subdomains');
  const primaryDomain = domains.find((d) => d.domain === 'apexprotocol.io');
  assert.ok(primaryDomain, 'Primary domain apexprotocol.io must be enrolled');
  assert.ok(primaryDomain.expiresAt, 'Domain must have an expiration date');
  assert.strictEqual(primaryDomain.sslStatus, 'active', 'SSL status must be active');
  console.log(`         • Domain: ${primaryDomain.domain} | Exp: ${primaryDomain.expiresAt} | SSL: ${primaryDomain.sslStatus}`);

  // TEST 2: SaaS Subscriptions Expiry & Cost Monitor
  console.log('  [PASS] 2. SaaS Subscriptions Expiry & Cost Monitor:');
  const subs = project.subscriptions || [];
  assert.ok(subs.length >= 4, 'Must have active SaaS subscriptions monitored');
  const cfSub = subs.find((s) => s.provider === 'Cloudflare');
  assert.ok(cfSub, 'Cloudflare subscription must be tracked');
  assert.ok(cfSub.renewDate, 'Renewal date must be defined');
  console.log(`         • Tracking ${subs.length} SaaS subscriptions (Supabase, Vercel, Cloudflare, Resend, etc.)`);

  // TEST 3: Complete Tooling Inventory
  console.log('  [PASS] 3. Complete Tooling Matrix (All Tools Used):');
  const tools = project.tools || [];
  assert.ok(tools.length >= 6, 'Must have full-stack tooling inventory');
  const nextTool = tools.find((t) => t.id === 'tool_nextjs');
  assert.ok(nextTool, 'Next.js tooling item must exist');
  assert.strictEqual(nextTool.category, 'frontend');
  console.log(`         • Curated inventory of ${tools.length} enterprise tools cataloged and verified`);

  // TEST 4: Direct In-Platform Agency Comms & Chat
  console.log('  [PASS] 4. Direct In-Platform Agency Comms & Chat:');
  const initialMessages = await getProjectChatMessages(projectId);
  assert.ok(initialMessages.length >= 2, 'Must have initial chat message dialogue');

  const clientMsg = await sendChatMessage({
    projectId,
    sender: 'client',
    senderName: 'Alex Vance',
    senderRole: 'Apex Labs Inc. Sponsor',
    message: 'Testing direct agency chat: Need confirmation on SSL cutover timing.',
  });
  assert.ok(clientMsg.id, 'Client message must receive ID');

  const agencyMsg = await sendChatMessage({
    projectId,
    sender: 'agency',
    senderName: 'Marteen Mubaraq',
    senderRole: 'WebMuse Lead Architect',
    message: 'Confirmed Alex! Cloudflare edge propagation is set for zero-downtime cutover.',
  });
  assert.ok(agencyMsg.id, 'Agency message must receive ID');

  const updatedMessages = await getProjectChatMessages(projectId);
  assert.ok(updatedMessages.length >= initialMessages.length + 2, 'Messages must persist in store');
  await markChatMessagesRead(projectId, 'client');
  console.log(`         • Verified bidirectional communication (Total messages: ${updatedMessages.length})`);

  // TEST 5: Annual Maintenance Retainer & 24/7 SLA
  console.log('  [PASS] 5. Annual Platform Maintenance & SLA Retainer:');
  const updatedProject = await subscribeToMaintenanceRetainer(
    projectId,
    'mission_critical',
    `TEST_WIRE_REF_${Date.now()}`,
    5000,
    7500000
  );
  assert.ok(updatedProject?.maintenanceRetainer, 'Maintenance retainer specification must exist');
  assert.strictEqual(updatedProject.maintenanceRetainer.status, 'active');
  assert.strictEqual(updatedProject.maintenanceRetainer.billingPeriod, 'yearly');
  assert.strictEqual(updatedProject.maintenanceRetainer.annualCostUsd, 5000);
  assert.strictEqual(updatedProject.maintenanceRetainer.annualCostNgn, 7500000);
  console.log(`         • Plan: ${updatedProject.maintenanceRetainer.tierName} ($${updatedProject.maintenanceRetainer.annualCostUsd.toLocaleString()}/yr)`);
  console.log(`         • SLA: ${updatedProject.maintenanceRetainer.slaResponseTime} | Expiry: ${updatedProject.maintenanceRetainer.expiresAt}`);

  // TEST 6: Emergency Incident Hotline & Health Sentinel
  console.log('  [PASS] 6. System Health Sentinel & Emergency Incident Hotline:');
  const health = project.healthSentinel;
  assert.ok(health, 'Health sentinel must be configured');
  assert.ok(health.uptimePercentage >= 99.9, 'Uptime percentage must meet SLA');

  const incident = await reportEmergencyIncident({
    projectId,
    reportedBy: 'alex@apexlabs.io',
    title: 'Automated Test Incident: Latency spike simulation',
    description: 'Testing emergency escalation hotline and chat alert dispatching.',
    severity: 'high',
  });
  assert.ok(incident.id, 'Incident must be logged');
  const incidents = await getProjectIncidentReports(projectId);
  assert.ok(incidents.length >= 1, 'Incident list must contain new report');
  console.log(`         • Live Uptime: ${health.uptimePercentage}% | Latency: ${health.avgLatencyMs}ms`);
  console.log(`         • Incident reported: "${incident.title}" [Severity: ${incident.severity}]`);

  console.log('\n======================================================');
  console.log('  ALL 6/6 INFRASTRUCTURE & COMMS SUITES VERIFIED PASS ');
  console.log('======================================================\n');
}

runTests().catch((err) => {
  console.error('\n[SUITE FAILED]:', err);
  process.exit(1);
});
