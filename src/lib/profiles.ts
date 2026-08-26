import { ClaimantProfile } from './types';

export const MOCK_PROFILES: Record<string, ClaimantProfile> = {
  '1': {
    id: '1',
    fullName: 'Jane Claimant',
    dob: '1985-04-12',
    email: 'jane.claimant@example.com',
    phone: '555-0198',
    contactPref: 'email',
    currentAddress: '123 Maple Street, Apt 4B, Springfield',
    moveInDate: '2023-01-15',
    householdSize: 2,
    incomeBand: '20k_40k',
    existingBenefits: ['food']
  },
  'demo': {
    id: 'demo',
    fullName: 'John Demo',
    dob: '1970-11-22',
    email: 'john.demo@example.com',
    phone: '555-0200',
    contactPref: 'phone',
    currentAddress: '456 Oak Avenue, Springfield',
    moveInDate: '2026-06-01', // Recent move, triggers previous address
    previousAddresses: '789 Pine Road, Springfield',
    householdSize: 1,
    incomeBand: 'under20k',
    existingBenefits: ['housing', 'medical']
  }
};

export function getProfile(id: string): ClaimantProfile | undefined {
  return MOCK_PROFILES[id];
}
