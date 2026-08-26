"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FormState, FormSectionId, FieldState } from './types';
import { validateSection, validateField } from './validation';
import { ALA_FORM_SCHEMA } from './form-schema';

type FormAction =
  | { type: 'SET_FIELD'; sectionId: FormSectionId; fieldId: string; value: any }
  | { type: 'SET_SECTION_VISIBLE'; sectionId: FormSectionId; visible: boolean }
  | { type: 'SET_CURRENT_SECTION'; sectionId: FormSectionId }
  | { type: 'VALIDATE_SECTION'; sectionId: FormSectionId }
  | { type: 'ATTACH_FILE'; sectionId: FormSectionId; fieldId: string; fileData: any }
  | { type: 'RESET_FORM' };

const initialSections: Record<FormSectionId, any> = Object.values(FormSectionId).reduce((acc, sectionId) => {
  acc[sectionId] = {
    visible: true, // all sections visible by default except conditional ones if any
    fields: {}
  };
  return acc;
}, {} as any);

const initialState: FormState = {
  applicationId: `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  currentSection: FormSectionId.IDENTITY,
  completionPercent: 0,
  sections: initialSections,
};

function calculateCompletion(sections: Record<FormSectionId, any>): number {
  // Simple completion logic: what % of required fields have valid values?
  let totalRequired = 0;
  let validRequired = 0;

  for (const field of ALA_FORM_SCHEMA) {
    if (field.required) {
      const section = sections[field.section];
      if (section && section.visible) {
        
        let isVisible = true;
        if (field.conditionalOn) {
           const parentFieldState = section.fields[field.conditionalOn.fieldId];
           if (parentFieldState) {
             isVisible = field.conditionalOn.condition(parentFieldState.value);
           } else {
             isVisible = false;
           }
        }
        
        if (isVisible) {
          totalRequired++;
          const fieldState = section.fields[field.id];
          if (fieldState && fieldState.valid && fieldState.value !== undefined && fieldState.value !== null && fieldState.value !== '') {
            validRequired++;
          }
        }
      }
    }
  }

  if (totalRequired === 0) return 0;
  return Math.round((validRequired / totalRequired) * 100);
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD': {
      const { sectionId, fieldId, value } = action;
      const section = state.sections[sectionId];
      
      const fieldDef = ALA_FORM_SCHEMA.find(f => f.id === fieldId);
      const validation = fieldDef ? validateField(fieldDef, value) : { valid: true };

      const newFields = {
        ...section.fields,
        [fieldId]: {
          value,
          valid: validation.valid,
          error: validation.error,
          touched: true
        }
      };

      const newState = {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            fields: newFields
          }
        }
      };
      
      newState.completionPercent = calculateCompletion(newState.sections);
      return newState;
    }
    
    case 'VALIDATE_SECTION': {
      const { sectionId } = action;
      const { valid, errors } = validateSection(sectionId, state);
      
      const section = state.sections[sectionId];
      const newFields = { ...section.fields };
      
      // Update fields with errors
      for (const error of errors) {
        newFields[error.fieldId] = {
          ...newFields[error.fieldId],
          valid: false,
          error: error.message,
          touched: true
        };
      }
      
      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            fields: newFields
          }
        }
      };
    }
    
    case 'ATTACH_FILE': {
       const { sectionId, fieldId, fileData } = action;
       const section = state.sections[sectionId];
       
       const newFields = {
        ...section.fields,
        [fieldId]: {
          value: fileData, // Storing file metadata/content
          valid: true,
          touched: true
        }
      };
      
      const newState = {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            fields: newFields
          }
        }
      };
      newState.completionPercent = calculateCompletion(newState.sections);
      return newState;
    }

    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.sectionId };

    case 'SET_SECTION_VISIBLE':
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: {
            ...state.sections[action.sectionId],
            visible: action.visible
          }
        }
      };

    case 'RESET_FORM':
      return {
          ...initialState,
          applicationId: `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

    default:
      return state;
  }
}

const FormContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
} | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Sync state to window for testing/WebMCP tools
  useEffect(() => {
    (window as any).__FORM_STATE__ = state;
    (window as any).__FORM_DISPATCH__ = dispatch;
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormStore() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormStore must be used within a FormProvider');
  }
  return context;
}
