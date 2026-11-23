export interface MerchantPaymentConfig {
  merchantEmail: string;
  accountHolder: string;
  iban: string;
  bic: string;
  bankName: string;
  gatewayProvider: string;
  isLinked: boolean;
  currency: string;
  minOrderValue: number;
}

const STORAGE_KEY = 'th_sportwelt_creditcard_merchant_config_v2';

export const DEFAULT_PAYMENT_CONFIG: MerchantPaymentConfig = {
  merchantEmail: 'th-sportwelt@outlook.de',
  accountHolder: 'Fatih Akmese',
  iban: 'DE63711600000008828830',
  bic: 'BYLADEM1ROS',
  bankName: 'Sparkasse Rosenheim-Bad Aibling / Deutsche Kreditbank',
  gatewayProvider: '256-Bit SSL 3D-Secure 2.0 Credit Card Gateway',
  isLinked: true,
  currency: 'EUR',
  minOrderValue: 89.00
};

export const formatIban = (iban: string): string => {
  const clean = iban.replace(/\s+/g, '').toUpperCase();
  return clean.match(/.{1,4}/g)?.join(' ') || clean;
};

export const getPaymentConfig = (): MerchantPaymentConfig => {
  if (typeof window === 'undefined') return DEFAULT_PAYMENT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PAYMENT_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PAYMENT_CONFIG,
      ...parsed,
      merchantEmail: parsed.merchantEmail || DEFAULT_PAYMENT_CONFIG.merchantEmail,
      accountHolder: parsed.accountHolder || DEFAULT_PAYMENT_CONFIG.accountHolder,
      iban: parsed.iban || DEFAULT_PAYMENT_CONFIG.iban
    };
  } catch {
    return DEFAULT_PAYMENT_CONFIG;
  }
};

export const savePaymentConfig = (config: Partial<MerchantPaymentConfig>): MerchantPaymentConfig => {
  const current = getPaymentConfig();
  const updated: MerchantPaymentConfig = {
    ...current,
    ...config
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save credit card payment config to localStorage', e);
  }
  return updated;
};
