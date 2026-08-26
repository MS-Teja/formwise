import { FieldDef, FormSectionId } from './types';

export const ALA_FORM_SCHEMA: FieldDef[] = [
  // §1 Identity
  {
    id: 'fullName',
    label: 'Full Legal Name',
    type: 'text',
    required: true,
    section: FormSectionId.IDENTITY,
    toolParamDescription: "The applicant's full legal name as it appears on official ID.",
  },
  {
    id: 'dob',
    label: 'Date of Birth',
    type: 'date',
    required: true,
    section: FormSectionId.IDENTITY,
    toolParamDescription: "The applicant's date of birth (YYYY-MM-DD).",
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    section: FormSectionId.IDENTITY,
    toolParamDescription: "Contact email address for the applicant.",
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    section: FormSectionId.IDENTITY,
    toolParamDescription: "Contact phone number for the applicant.",
  },
  {
    id: 'contactPref',
    label: 'Preferred Contact Method',
    type: 'select',
    required: true,
    section: FormSectionId.IDENTITY,
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'post', label: 'Postal Mail' },
    ],
    toolParamDescription: "How the agency should contact the applicant regarding this claim.",
  },

  // §2 Residence
  {
    id: 'currentAddress',
    label: 'Current Home Address',
    type: 'text',
    required: true,
    section: FormSectionId.RESIDENCE,
    toolParamDescription: "The applicant's current full residential address.",
  },
  {
    id: 'moveInDate',
    label: 'Date moved to current address',
    type: 'date',
    required: true,
    section: FormSectionId.RESIDENCE,
    toolParamDescription: "The date the applicant moved to their current address.",
  },
  {
    id: 'previousAddresses',
    label: 'Previous Addresses (Past 12 Months)',
    type: 'text',
    required: true,
    section: FormSectionId.RESIDENCE,
    toolParamDescription: "A list of previous addresses the applicant lived at in the last 12 months, if applicable.",
    conditionalOn: {
      fieldId: 'moveInDate',
      condition: (value: string) => {
        if (!value) return false;
        const moveIn = new Date(value);
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        return moveIn > twelveMonthsAgo;
      }
    }
  },

  // §3 Disability & Daily Life
  {
    id: 'conditionCategory',
    label: 'Primary Condition Category',
    type: 'select',
    required: true,
    section: FormSectionId.DISABILITY,
    options: [
      { value: 'mobility', label: 'Mobility or physical impairment' },
      { value: 'sensory', label: 'Sensory impairment (vision, hearing)' },
      { value: 'cognitive', label: 'Cognitive or learning disability' },
      { value: 'mental', label: 'Mental health condition' },
      { value: 'other', label: 'Other/Multiple' },
    ],
    toolParamDescription: "The primary category of the applicant's disability.",
  },
  {
    id: 'onsetDate',
    label: 'Date of Onset',
    type: 'date',
    required: true,
    section: FormSectionId.DISABILITY,
    toolParamDescription: "Approximate date when the condition began to impact daily life.",
  },
  {
    id: 'impactMobility',
    label: 'Impact: Moving around',
    type: 'radio',
    required: true,
    section: FormSectionId.DISABILITY,
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' },
    ],
    toolParamDescription: "Level of difficulty the applicant has with moving around.",
  },
  {
    id: 'mobilityAids',
    label: 'Mobility Aids Used',
    type: 'text',
    required: true,
    section: FormSectionId.DISABILITY,
    toolParamDescription: "List of mobility aids the applicant relies on (e.g., wheelchair, cane).",
    conditionalOn: {
      fieldId: 'impactMobility',
      condition: (value: string) => ['some', 'lot', 'cannot'].includes(value)
    }
  },

  // §4 Income & Household
  {
    id: 'householdSize',
    label: 'Household Size',
    type: 'number',
    required: true,
    section: FormSectionId.INCOME,
    toolParamDescription: "Number of people living in the applicant's household.",
  },
  {
    id: 'incomeBand',
    label: 'Annual Household Income',
    type: 'select',
    required: true,
    section: FormSectionId.INCOME,
    options: [
      { value: 'under20k', label: 'Under $20,000' },
      { value: '20k_40k', label: '$20,000 to $40,000' },
      { value: '40k_60k', label: '$40,000 to $60,000' },
      { value: 'over60k', label: 'Over $60,000' },
    ],
    toolParamDescription: "The annual income band for the household.",
  },
  {
    id: 'existingBenefits',
    label: 'Currently Receiving Other Benefits?',
    type: 'checkbox',
    required: false,
    section: FormSectionId.INCOME,
    options: [
      { value: 'housing', label: 'Housing Support' },
      { value: 'food', label: 'Food Assistance' },
      { value: 'medical', label: 'Medical Subsidy' },
    ],
    toolParamDescription: "List of any other government benefits currently received. Comma separated list of values: housing, food, medical.",
  },

  // §5 Evidence
  {
    id: 'medicalEvidence',
    label: 'Medical Evidence Document',
    type: 'file',
    required: true,
    section: FormSectionId.EVIDENCE,
    toolParamDescription: "A document providing medical evidence of the condition (PDF, JPG).",
  },
  {
    id: 'idDocument',
    label: 'Proof of Identity',
    type: 'file',
    required: true,
    section: FormSectionId.EVIDENCE,
    toolParamDescription: "A scanned copy of official ID (e.g., passport, driver's license).",
  },
  {
    id: 'proofOfResidence',
    label: 'Proof of Residence',
    type: 'file',
    required: true,
    section: FormSectionId.EVIDENCE,
    toolParamDescription: "A recent utility bill or lease agreement proving residence.",
  },

  // §6 Review & Declaration
  {
    id: 'consentInformation',
    label: 'I consent to the agency verifying my medical and financial information.',
    type: 'checkbox',
    required: true,
    section: FormSectionId.REVIEW,
    toolParamDescription: "Whether the applicant consents to information verification. Must be true.",
  },
  {
    id: 'declarationTruth',
    label: 'I declare that the information provided is true and accurate.',
    type: 'checkbox',
    required: true,
    section: FormSectionId.REVIEW,
    toolParamDescription: "Whether the applicant declares the information is true. Must be true.",
  }
];

export function getFieldsForSection(sectionId: FormSectionId): FieldDef[] {
  return ALA_FORM_SCHEMA.filter(field => field.section === sectionId);
}

export function getFieldById(fieldId: string): FieldDef | undefined {
  return ALA_FORM_SCHEMA.find(field => field.id === fieldId);
}
