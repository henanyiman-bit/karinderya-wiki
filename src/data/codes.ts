import type { VerificationStatus } from '../components/VerificationStatus.astro';

export interface KarinderyaCode {
  code: string;
  reward: string;
  codeStatus: VerificationStatus;
  rewardStatus: VerificationStatus;
  note?: string;
}

export const currentCodes: KarinderyaCode[] = [
  { code: '50KCCU', reward: '50,000 Cash', codeStatus: 'Official', rewardStatus: 'Reported' },
  { code: 'DECOPART1', reward: '5,000 Cash + 2 Cash Potions', codeStatus: 'Official', rewardStatus: 'Community Verified' },
  { code: '2MVISITS', reward: '5,000 Cash + Deluxe Stove', codeStatus: 'Community Verified', rewardStatus: 'Community Verified' },
  { code: '3MVISITS', reward: 'Folding Table + Folding Chair', codeStatus: 'Community Verified', rewardStatus: 'To be verified' },
  { code: 'BATINATAYOHA', reward: '5,000 Cash + 3 Concrete + Cash Potion', codeStatus: 'Community Verified', rewardStatus: 'Community Verified' },
];
