import { logToolActivity, newInvocationId } from '../register-tools';
import { FormState, FormSectionId } from '@/lib/types';
import { ALA_FORM_SCHEMA } from '@/lib/form-schema';

export const setFieldTool = {
  name: 'set_field',
  description: 'Sets the value of a single form field by its field_id. Use this to fill fields that cannot be auto-filled from a profile (e.g. disability details). Section IDs: identity, residence, disability, income, evidence, review.',
  inputSchema: {
    type: 'object',
    properties: {
      field_id: { type: 'string', description: 'The field ID to set (e.g. conditionCategory, onsetDate, impactMobility).' },
      value: { description: 'The value to set. For checkboxes, use true/false. For selects/radios, use the option value string.' }
    },
    required: ['field_id', 'value']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'set_field', input, status: 'running' });

    try {
      const dispatch = (window as any).__FORM_DISPATCH__;
      if (!dispatch) throw new Error("Form state not initialized.");

      // Find which section this field belongs to
      const fieldDef = ALA_FORM_SCHEMA.find(f => f.id === input.field_id);
      if (!fieldDef) {
        const allFields = ALA_FORM_SCHEMA.map(f => f.id);
        throw new Error(`Unknown field_id: "${input.field_id}". Valid field IDs are: ${allFields.join(', ')}`);
      }

      dispatch({
        type: 'SET_FIELD',
        sectionId: fieldDef.section,
        fieldId: input.field_id,
        value: input.value
      });

      // Emit a highlight event so the UI can flash the field
      window.dispatchEvent(new CustomEvent('webmcp:field-highlight', {
        detail: { fieldId: input.field_id, sectionId: fieldDef.section }
      }));

      const result = {
        set: true,
        field_id: input.field_id,
        section_id: fieldDef.section,
        label: fieldDef.label,
        value: input.value
      };

      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'set_field', input, output: result, status: 'success', duration });
      return JSON.stringify(result);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'set_field', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { untrustedContentHint: false }
};
