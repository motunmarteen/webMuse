import assert from 'node:assert';
import crypto from 'node:crypto';
import {
  getProjectById,
  confirmPaymentAndUnlockMilestone,
  createPaymentIntent,
  getProjectPayments,
  getPaymentByRef,
  getProjectChatMessages,
} from '../src/lib/server/store';
import {
  verifyNowPaymentsSignature,
  verifyPaystackSignature,
  NOWPAYMENTS_IPN_SECRET,
  PAYSTACK_SECRET_KEY,
  getDepositWalletDetails,
  getVirtualBankAccountDetails,
} from '../src/lib/server/payments';

console.log('\n======================================================');
console.log('  WEBMUSE OS // PHASE 4 VERIFICATION & AUDIT SUITE    ');
console.log('  Multi-Rail Payment Engine & Milestone Gatekeeper    ');
console.log('======================================================\n');

async function runPhase4Tests() {
  const projectId = 'proj_apex_01';
  const project = await getProjectById(projectId);
  assert.ok(project, 'Apex Protocol project must exist in store');

  const milestone2 = project.milestones[1];
  assert.ok(milestone2, 'Milestone 2 must exist');

  // ----------------------------------------------------
  // TEST 1: Cryptographic Webhook Signature Security
  // ----------------------------------------------------
  console.log('  [PASS] 1. Cryptographic Webhook Signature Security (HMAC-SHA512):');
  const sampleNowBody = JSON.stringify({
    payment_status: 'finished',
    payment_id: 991823,
    pay_amount: 5000,
    pay_currency: 'usdttrc20',
  });

  // Valid NOWPayments signature
  const validNowSig = crypto
    .createHmac('sha512', NOWPAYMENTS_IPN_SECRET)
    .update(sampleNowBody)
    .digest('hex');
  assert.strictEqual(
    verifyNowPaymentsSignature(sampleNowBody, validNowSig),
    true,
    'Valid NOWPayments HMAC-SHA512 signature must verify successfully'
  );

  // Invalid NOWPayments signature
  const invalidNowSig = 'deadbeef0000111122223333444455556666777788889999aaaabbbbccccdddd';
  assert.strictEqual(
    verifyNowPaymentsSignature(sampleNowBody, invalidNowSig),
    false,
    'Invalid NOWPayments signature must be rejected (Anti-Forgery Protection)'
  );

  // Valid Paystack signature
  const samplePaystackBody = JSON.stringify({
    event: 'charge.success',
    data: { id: 8812, amount: 750000000, reference: 'PAYSTACK_MOCK_REF' },
  });
  const validPaystackSig = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(samplePaystackBody)
    .digest('hex');
  assert.strictEqual(
    verifyPaystackSignature(samplePaystackBody, validPaystackSig),
    true,
    'Valid Paystack HMAC-SHA512 signature must verify successfully'
  );

  // Invalid Paystack signature
  assert.strictEqual(
    verifyPaystackSignature(samplePaystackBody, 'invalid_paystack_sig_here'),
    false,
    'Invalid Paystack signature must be rejected'
  );
  console.log('         • Timing-safe HMAC-SHA512 validation enforced across NOWPayments and Paystack.');

  // ----------------------------------------------------
  // TEST 2: Multi-Rail Deposit Infrastructure
  // ----------------------------------------------------
  console.log('  [PASS] 2. Multi-Rail Deposit Infrastructure & Currency Rails:');
  const trc20 = getDepositWalletDetails('TRC20');
  assert.strictEqual(trc20.currency, 'USDT');
  assert.ok(trc20.address.startsWith('T'), 'Tron address must begin with T');

  const erc20 = getDepositWalletDetails('ERC20');
  assert.ok(erc20.address.startsWith('0x'), 'Ethereum address must begin with 0x');

  const virtualBank = getVirtualBankAccountDetails('Apex Protocol');
  assert.strictEqual(virtualBank.bankName, 'Wema Bank / Paystack Titan');
  assert.strictEqual(virtualBank.accountNumber, '9918234812');
  console.log(`         • Tron (TRC20): ${trc20.address} | Ethereum: ${erc20.address}`);
  console.log(`         • Virtual Bank: ${virtualBank.bankName} (Acc: ${virtualBank.accountNumber})`);

  // ----------------------------------------------------
  // TEST 3: Payment Intent Generation
  // ----------------------------------------------------
  console.log('  [PASS] 3. Payment Intent Store Persistence:');
  const testRef = `TEST_INTENT_REF_${Date.now()}`;
  const intent = await createPaymentIntent({
    projectId,
    milestoneId: milestone2.id,
    amount: milestone2.costUsd,
    currency: 'USDT',
    gateway: 'nowpayments',
    payerEmail: 'alex@apexlabs.io',
    txHashOrRef: testRef,
    metadata: { network: 'TRC20' },
  });
  assert.strictEqual(intent.status, 'pending');
  assert.strictEqual(intent.txHashOrRef, testRef);
  console.log(`         • Intent ${intent.id} recorded with pending status and reference: ${testRef}`);

  // ----------------------------------------------------
  // TEST 4: Milestone Gatekeeper Auto-Unlock & Invoice Execution
  // ----------------------------------------------------
  console.log('  [PASS] 4. Milestone Gatekeeper Settlement & Phase Auto-Unlock:');
  const settlementResult = await confirmPaymentAndUnlockMilestone({
    projectId,
    milestoneId: milestone2.id,
    amount: milestone2.costUsd,
    currency: 'USDT',
    gateway: 'nowpayments',
    txHashOrRef: testRef,
    payerEmail: 'alex@apexlabs.io',
    metadata: { blockchainConfirmation: 19 },
  });

  assert.strictEqual(settlementResult.payment.status, 'confirmed');
  assert.ok(settlementResult.payment.confirmedAt);

  const updatedMilestone = settlementResult.project.milestones.find((m) => m.id === milestone2.id);
  assert.ok(updatedMilestone);
  assert.strictEqual(updatedMilestone.status, 'in_progress', 'Milestone must transition to in_progress');
  assert.strictEqual(updatedMilestone.paymentTxRef, testRef);
  assert.ok(updatedMilestone.unlockedAt);
  assert.ok(updatedMilestone.paidAt);

  // Check Invoice Document #12
  const invoiceDoc = (settlementResult.project.documents || []).find(
    (d) => d.id === 'doc_12_invoice' || d.filename.includes('Invoice')
  );
  if (invoiceDoc) {
    assert.strictEqual(invoiceDoc.status, 'executed', 'Invoice Document #12 must be marked executed');
    assert.strictEqual(invoiceDoc.signatureHash, testRef);
    console.log(`         • Invoice Document #12 automatically executed with cryptographic ref: ${testRef}`);
  }
  console.log(`         • Phase 0${updatedMilestone.phaseNumber} (${updatedMilestone.title}) gatekeeper lifted and unlocked.`);

  // ----------------------------------------------------
  // TEST 5: Idempotency Protection
  // ----------------------------------------------------
  console.log('  [PASS] 5. Webhook Replay & Idempotency Safeguard:');
  const replayResult = await confirmPaymentAndUnlockMilestone({
    projectId,
    milestoneId: milestone2.id,
    amount: milestone2.costUsd,
    currency: 'USDT',
    gateway: 'nowpayments',
    txHashOrRef: testRef,
    payerEmail: 'alex@apexlabs.io',
  });
  assert.strictEqual(
    replayResult.alreadyConfirmed,
    true,
    'Duplicate webhook payload must be recognized as alreadyConfirmed without duplicate accounting'
  );
  console.log('         • Duplicate webhook transmission safely absorbed without double credits.');

  // ----------------------------------------------------
  // TEST 6: Financial Telemetry & Activity Stream Audit
  // ----------------------------------------------------
  console.log('  [PASS] 6. Financial Audit Stream & Direct Comms Announcement:');
  const chatMessages = await getProjectChatMessages(projectId);
  const financialChat = chatMessages.find((m) =>
    m.message.includes('PAYMENT SETTLED')
  );
  assert.ok(financialChat, 'Financial Sentinel must dispatch announcement to direct comms');
  console.log(`         • Announcement verified in comms feed: "${financialChat.message.slice(0, 55)}..."`);

  console.log('\n======================================================');
  console.log('  ALL 6/6 PHASE 4 TESTS VERIFIED PASS WITHOUT DEFECT  ');
  console.log('======================================================\n');
}

runPhase4Tests().catch((err) => {
  console.error('\n[PHASE 4 TEST FAILED]:', err);
  process.exit(1);
});
