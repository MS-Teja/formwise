export enum FormSectionId {
  IDENTITY = 'identity',
  RESIDENCE = 'residence',
  DISABILITY = 'disability',
  INCOME = 'income',
  EVIDENCE = 'evidence',
  REVIEW = 'review'
}

export type FieldType = 'text' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'checkbox' | 'number' | 'file';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  section: FormSectionId;
  options?: FieldOption[];
  toolParamDescription: string;
  conditionalOn?: {
    fieldId: string;
    condition: (value: any) => boolean;
  };
}

export interface FieldState {
  value: any;
  valid: boolean;
  error?: string;
  touched: boolean;
}

export interface SectionState {
  visible: boolean;
  fields: Record<string, FieldState>;
}

export interface FormState {
  applicationId: string;
  currentSection: FormSectionId;
  completionPercent: number;
  sections: Record<FormSectionId, SectionState>;
}

export interface ClaimantProfile {
  id: string;
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  contactPref: string;
  currentAddress: string;
  moveInDate: string;
  previousAddresses?: string;
  householdSize: number;
  incomeBand: string;
  existingBenefits: string[];
}
