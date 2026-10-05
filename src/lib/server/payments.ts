import crypto from 'node:crypto';

export const NOWPAYMENTS_IPN_SECRET =
  process.env.NOWPAYMENTS_IPN_SECRET || 'webmuse_nowpayments_ipn_secret_default_key_2026';

export const PAYSTACK_SECRET_KEY =
  process.env.PAYSTACK_SECRET_KEY || 'sk_test_webmuse_paystack_secret_key_mock_9918';

export const NGN_PER_USD = 1500; // Standard 1 USD = 1,500 NGN rate

/**
 * Validates NOWPayments HMAC-SHA512 signature from x-nowpayments-sig header.
 */
export function verifyNowPaymentsSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  try {
    const hmac = crypto.createHmac('sha512', NOWPAYMENTS_IPN_SECRET);
    hmac.update(rawBody);
    const calculatedSig = hmac.digest('hex');

    const expectedBuffer = Buffer.from(calculatedSig, 'hex');
    const headerBuffer = Buffer.from(signatureHeader, 'hex');

    if (expectedBuffer.length !== headerBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, headerBuffer);
  } catch (err) {
    console.error('[Payment Crypto] NOWPayments sig verification error:', err);
    return false;
  }
}

/**
 * Validates Paystack HMAC-SHA512 signature from x-paystack-signature header.
 */
export function verifyPaystackSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  try {
    const hmac = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY);
    hmac.update(rawBody);
    const calculatedSig = hmac.digest('hex');

    const expectedBuffer = Buffer.from(calculatedSig, 'hex');
    const headerBuffer = Buffer.from(signatureHeader, 'hex');

    if (expectedBuffer.length !== headerBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, headerBuffer);
  } catch (err) {
    console.error('[Payment Crypto] Paystack sig verification error:', err);
    return false;
  }
}

/**
 * Deterministically generates or returns realistic deposit wallet addresses.
 */
export function getDepositWalletDetails(network: 'TRC20' | 'ERC20' | 'Polygon' | 'BSC' | 'BTC' | 'ETH' | 'SOL') {
  switch (network) {
    case 'TRC20':
      return {
        network: 'Tron (TRC20)',
        address: 'TY5Wj8t2uKpqL1o9dM3N9s4vZ8aX7c6B2p',
        currency: 'USDT',
        explorerUrl: 'https://tronscan.org/#/address/TY5Wj8t2uKpqL1o9dM3N9s4vZ8aX7c6B2p',
        confirmationsRequired: 19,
      };
    case 'ERC20':
      return {
        network: 'Ethereum (ERC20)',
        address: '0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        currency: 'USDT',
        explorerUrl: 'https://etherscan.io/address/0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        confirmationsRequired: 12,
      };
    case 'Polygon':
      return {
        network: 'Polygon (PoS)',
        address: '0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        currency: 'USDT',
        explorerUrl: 'https://polygonscan.com/address/0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        confirmationsRequired: 32,
      };
    case 'BSC':
      return {
        network: 'BNB Smart Chain (BEP20)',
        address: '0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        currency: 'USDT',
        explorerUrl: 'https://bscscan.com/address/0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        confirmationsRequired: 15,
      };
    case 'BTC':
      return {
        network: 'Bitcoin Native SegWit',
        address: 'bc1qm918v29a8f4c2810x98124bcvb72910fa820',
        currency: 'BTC',
        explorerUrl: 'https://mempool.space/address/bc1qm918v29a8f4c2810x98124bcvb72910fa820',
        confirmationsRequired: 2,
      };
    case 'ETH':
      return {
        network: 'Ethereum Mainnet',
        address: '0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io/address/0x991823B5A2f1b4028A9412F58aA1984Cb762810C',
        confirmationsRequired: 12,
      };
    case 'SOL':
      return {
        network: 'Solana Mainnet-Beta',
        address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        currency: 'SOL',
        explorerUrl: 'https://solscan.io/account/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        confirmationsRequired: 31,
      };
    default:
      return {
        network: 'Tron (TRC20)',
        address: 'TY5Wj8t2uKpqL1o9dM3N9s4vZ8aX7c6B2p',
        currency: 'USDT',
        explorerUrl: 'https://tronscan.org/#/address/TY5Wj8t2uKpqL1o9dM3N9s4vZ8aX7c6B2p',
        confirmationsRequired: 19,
      };
  }
}

/**
 * Returns dynamic virtual bank account information for Paystack / Moniepoint fiat transfers.
 */
export function getVirtualBankAccountDetails(projectName: string) {
  return {
    bankName: 'Wema Bank / Paystack Titan',
    accountNumber: '9918234812',
    accountName: `WebMuse Studios - ${projectName.slice(0, 16)}`,
    expiresInHours: 48,
    routingCode: '035',
  };
}

/**
 * Returns international wire transfer instructions.
 */
export function getWireTransferInstructions(projectSlug: string) {
  return {
    beneficiaryName: 'WebMuse Agency Operating Corp.',
    bankName: 'JPMorgan Chase Bank, N.A.',
    swiftBic: 'CHASUS33XXX',
    routingNumber: '021000021',
    accountNumber: '98210482910',
    address: '270 Park Avenue, New York, NY 10017, USA',
    referenceCode: `WM-${projectSlug.toUpperCase()}-WIRE`,
  };
}
