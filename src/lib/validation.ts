import { FieldDef, FormState, FormSectionId, FieldState } from './types';
import { getFieldsForSection } from './form-schema';

export interface ValidationError {
  fieldId: string;
  message: string;
}

export function validateField(field: FieldDef, value: any): { valid: boolean; error?: string } {
  if (field.required && (value === undefined || value === null || value === '')) {
    return { valid: false, error: 'This field is required.' };
  }

  if (value) {
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { valid: false, error: 'Invalid email address.' };
    }

    if (field.type === 'checkbox' && field.required && value !== true && value !== 'true') {
      return { valid: false, error: 'You must agree to continue.' };
    }
  }

  return { valid: true };
}

export function validateSection(
  sectionId: FormSectionId,
  formState: FormState
): { valid: boolean; errors: ValidationError[] } {
  const fields = getFieldsForSection(sectionId);
  const errors: ValidationError[] = [];
  let valid = true;

  const sectionState = formState.sections[sectionId];
  if (!sectionState.visible) {
    return { valid: true, errors: [] }; // Hidden sections are considered valid
  }

  for (const field of fields) {
    // Check conditional visibility
    let isVisible = true;
    if (field.conditionalOn) {
      const parentFieldState = sectionState.fields[field.conditionalOn.fieldId];
      if (parentFieldState) {
        isVisible = field.conditionalOn.condition(parentFieldState.value);
      } else {
        // If parent isn't in this section, we might need to look across formState, 
        // but for ALA schema, parent is always in same section
        isVisible = false;
      }
    }

    if (isVisible) {
      const fieldState = sectionState.fields[field.id] || { value: '', touched: false };
      const validation = validateField(field, fieldState.value);
      if (!validation.valid) {
        valid = false;
        errors.push({ fieldId: field.id, message: validation.error || 'Invalid value' });
      }
    }
  }

  return { valid, errors };
}

export function validateForm(formState: FormState): {
  valid: boolean;
  sectionValidations: Record<FormSectionId, { valid: boolean; errors: ValidationError[] }>;
} {
  let formValid = true;
  const sectionValidations: Partial<Record<FormSectionId, { valid: boolean; errors: ValidationError[] }>> = {};

  const sections = Object.values(FormSectionId);
  for (const sectionId of sections) {
    const result = validateSection(sectionId, formState);
    sectionValidations[sectionId] = result;
    if (!result.valid) {
      formValid = false;
    }
  }

  return { valid: formValid, sectionValidations: sectionValidations as any };
}
