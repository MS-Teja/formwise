import { logToolActivity, newInvocationId } from '../register-tools';
import { FormState } from '@/lib/types';
import { ALA_FORM_SCHEMA } from '@/lib/form-schema';

export const getFormStateTool = {
  name: 'get_form_state',
  description: 'Returns a structured accessibility snapshot of the current ALA application form: sections, field roles, labels, current values, visibility, and validation status. Consumable by both AI agents and screen readers.',
  inputSchema: {
    type: 'object',
    properties: {
      include_hidden: { type: 'boolean', description: 'Include conditionally-hidden sections in the snapshot.' },
      section_id: { type: 'string', description: 'Optional. Return state for only a specific section to save budget.' }
    }
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'get_form_state', input, status: 'running' });
    
    try {
      // Form state is synced to window by FormProvider for tools to access
      const state: FormState = (window as any).__FORM_STATE__;
      
      if (!state) {
        throw new Error("Form state not initialized.");
      }

      let snapshot: any = {
        applicationId: state.applicationId,
        completionPercent: state.completionPercent,
        sections: []
      };

      const sectionsToProcess = input.section_id 
        ? [input.section_id] 
        : Object.keys(state.sections);

      for (const sectionId of sectionsToProcess) {
        const sectionState = (state.sections as any)[sectionId];
        if (!sectionState) continue;

        if (!sectionState.visible && !input.include_hidden) {
          continue;
        }

        const sectionFields = ALA_FORM_SCHEMA.filter(f => f.section === sectionId);
        const mappedFields = [];

        for (const field of sectionFields) {
          // Check conditional visibility
          let isVisible = true;
          if (field.conditionalOn) {
            const parentFieldState = sectionState.fields[field.conditionalOn.fieldId];
            if (parentFieldState) {
              isVisible = field.conditionalOn.condition(parentFieldState.value);
            } else {
              isVisible = false;
            }
          }

          if (isVisible || input.include_hidden) {
             const fieldState = sectionState.fields[field.id];
             mappedFields.push({
               id: field.id,
               label: field.label,
               type: field.type,
               required: field.required,
               visible: isVisible,
               value: fieldState?.value,
               valid: fieldState ? fieldState.valid : true,
               error: fieldState?.error
             });
          }
        }

        snapshot.sections.push({
          id: sectionId,
          visible: sectionState.visible,
          fields: mappedFields
        });
      }
      
      // Safety cap for very large forms — 8KB is generous for the ALA form (~2-3KB empty)
      const resultString = JSON.stringify(snapshot);
      if (resultString.length > 8000 && !input.section_id) {
         snapshot = {
           error: "Output exceeds size limits. Please query by specific section_id.",
           available_sections: Object.keys(state.sections)
         };
      }

      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'get_form_state', input, output: snapshot, status: 'success', duration });
      
      return JSON.stringify(snapshot);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'get_form_state', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { readOnlyHint: true, untrustedContentHint: true }
};
