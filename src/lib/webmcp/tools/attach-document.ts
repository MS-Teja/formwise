import { logToolActivity, newInvocationId } from '../register-tools';
import { requestUserInteractionFallback } from '@/components/ui/GlobalInteractionProvider';
import { FormState, FormSectionId } from '@/lib/types';
import { getFieldsForSection } from '@/lib/form-schema';

export const attachDocumentTool = {
  name: 'attach_document',
  description: 'Attaches an uploaded evidence file (simulated by filename) to a specific field. Requires human confirmation before attaching.',
  inputSchema: {
    type: 'object',
    properties: {
      field_id: { type: 'string', description: 'The ID of the file field (e.g., medicalEvidence).' },
      file_name: { type: 'string', description: 'The name of the file to attach.' },
      mime_type: { type: 'string', description: 'Optional mime type.' }
    },
    required: ['field_id', 'file_name']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'attach_document', input, status: 'running' });
    
    try {
      const state: FormState = (window as any).__FORM_STATE__;
      const dispatch = (window as any).__FORM_DISPATCH__;
      
      if (!state || !dispatch) {
        throw new Error("Form state not initialized.");
      }

      // We need to find the section this field belongs to
      let targetSectionId: FormSectionId | null = null;
      for (const sectionId of Object.values(FormSectionId)) {
         const fields = getFieldsForSection(sectionId);
         if (fields.some(f => f.id === input.field_id)) {
            targetSectionId = sectionId;
            break;
         }
      }

      if (!targetSectionId) {
         throw new Error(`Field ID ${input.field_id} not found in any section.`);
      }

      // HITL Confirmation
      const approved = await requestUserInteractionFallback({
        title: 'Attach Document?',
        body: `The agent is requesting to attach "${input.file_name}" to the field "${input.field_id}". Do you approve?`,
        confirmLabel: 'Approve Attach',
        cancelLabel: 'Cancel'
      });

      if (!approved) {
         const result = { status: 'cancelled_by_user', attached: false };
         const duration = Math.round(performance.now() - start);
         logToolActivity({ id: invId, toolName: 'attach_document', input, output: result, status: 'success', duration });
         return JSON.stringify(result);
      }

      // Execute attachment
      dispatch({ 
        type: 'ATTACH_FILE', 
        sectionId: targetSectionId, 
        fieldId: input.field_id, 
        fileData: { name: input.file_name, type: input.mime_type || 'application/octet-stream', size: 1024 * 1024 } 
      });

      const result = { attached: true, document_id: `doc_${Math.random().toString(36).substr(2, 9)}` };
      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'attach_document', input, output: result, status: 'success', duration });
      
      return JSON.stringify(result);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'attach_document', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { untrustedContentHint: false }
};
