import { logToolActivity, newInvocationId } from '../register-tools';
import { FormState, FormSectionId } from '@/lib/types';
import { getProfile, MOCK_PROFILES } from '@/lib/profiles';
import { getFieldsForSection } from '@/lib/form-schema';

export const autoFillFromProfileTool = {
  name: 'auto_fill_from_profile',
  description: `Deterministically fills fields in a specified section from a stored claimant profile against the form's declared semantics. Available profile IDs: ${Object.keys(MOCK_PROFILES).map(id => `"${id}"`).join(', ')}.`,
  inputSchema: {
    type: 'object',
    properties: {
      section_id: { type: 'string', description: 'The section ID to fill (identity, residence, disability, income, evidence, review).' },
      profile_id: { type: 'string', enum: Object.keys(MOCK_PROFILES), description: `The claimant profile ID. Must be one of: ${Object.keys(MOCK_PROFILES).join(', ')}.` }
    },
    required: ['section_id', 'profile_id']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'auto_fill_from_profile', input, status: 'running' });
    
    try {
      const state: FormState = (window as any).__FORM_STATE__;
      const dispatch = (window as any).__FORM_DISPATCH__;
      
      if (!state || !dispatch) {
        throw new Error("Form state not initialized.");
      }

      const profile = getProfile(input.profile_id);
      if (!profile) {
        const availableIds = Object.keys(MOCK_PROFILES);
        throw new Error(`Profile not found for ID: "${input.profile_id}". Available profile IDs are: ${availableIds.join(', ')}`);
      }

      const fields = getFieldsForSection(input.section_id as FormSectionId);
      const sectionState = state.sections[input.section_id as FormSectionId];
      
      const filled: string[] = [];
      const skipped: Array<{ field_id: string, reason: string }> = [];

      for (const field of fields) {
        // Evaluate conditional visibility based on CURRENT state (before fill)
        // In a more robust version, this would re-evaluate after each field fill
        let isVisible = true;
        if (field.conditionalOn) {
          const parentFieldState = sectionState.fields[field.conditionalOn.fieldId];
          if (parentFieldState) {
            isVisible = field.conditionalOn.condition(parentFieldState.value);
          } else {
            isVisible = false;
          }
        }

        if (!isVisible) {
           skipped.push({ field_id: field.id, reason: 'Field is conditionally hidden based on current form state.' });
           continue;
        }

        // Simple mapping: if the profile has a key matching the field id, use it.
        const profileValue = (profile as any)[field.id];
        
        if (profileValue !== undefined) {
           dispatch({ 
             type: 'SET_FIELD', 
             sectionId: input.section_id, 
             fieldId: field.id, 
             value: profileValue 
           });
           // Emit highlight event for the field animation
           window.dispatchEvent(new CustomEvent('webmcp:field-highlight', {
             detail: { fieldId: field.id, sectionId: input.section_id }
           }));
           filled.push(field.id);
        } else {
           skipped.push({ field_id: field.id, reason: 'No matching data in profile.' });
        }
      }
      
      // Update the UI to show the filled section
      dispatch({ type: 'SET_CURRENT_SECTION', sectionId: input.section_id });

      const result = { filled, skipped };
      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'auto_fill_from_profile', input, output: result, status: 'success', duration });
      
      return JSON.stringify(result);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'auto_fill_from_profile', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  // Mutating tool, so no readOnlyHint
  annotations: { untrustedContentHint: false }
};
