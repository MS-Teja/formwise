import { logToolActivity, newInvocationId } from '../register-tools';
import { validateSection } from '@/lib/validation';
import { FormState, FormSectionId } from '@/lib/types';

export const validateSectionTool = {
  name: 'validate_section',
  description: 'Validates a specific form section against its rules and returns structured errors before proceeding. Call this before navigating to the next section.',
  inputSchema: {
    type: 'object',
    properties: {
      section_id: { type: 'string', description: 'The ID of the section to validate (e.g., identity, residence).' }
    },
    required: ['section_id']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'validate_section', input, status: 'running' });
    
    try {
      const state: FormState = (window as any).__FORM_STATE__;
      const dispatch = (window as any).__FORM_DISPATCH__;
      
      if (!state || !dispatch) {
        throw new Error("Form state not initialized.");
      }

      // 1. Perform validation logic
      const validationResult = validateSection(input.section_id as FormSectionId, state);
      
      // 2. Dispatch the validation action so the UI updates to show errors
      dispatch({ type: 'VALIDATE_SECTION', sectionId: input.section_id });
      
      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'validate_section', input, output: validationResult, status: 'success', duration });
      
      return JSON.stringify(validationResult);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'validate_section', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { readOnlyHint: true }
};
