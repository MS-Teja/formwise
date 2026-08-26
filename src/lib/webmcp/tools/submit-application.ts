import { logToolActivity, newInvocationId } from '../register-tools';
import { requestUserInteractionFallback } from '@/components/ui/GlobalInteractionProvider';
import { FormState, FormSectionId } from '@/lib/types';
import { validateForm } from '@/lib/validation';

export const submitApplicationTool = {
  name: 'submit_application',
  description: 'Submit the completed ALA application to the Meridian benefits agency. Irreversible. Requires human confirmation via a review dialog.',
  inputSchema: {
    type: 'object',
    properties: {
      application_id: { type: 'string' }
    },
    required: ['application_id']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'submit_application', input, status: 'running' });
    
    try {
      const state: FormState = (window as any).__FORM_STATE__;
      const dispatch = (window as any).__FORM_DISPATCH__;
      
      if (!state || !dispatch) {
        throw new Error("Form state not initialized.");
      }

      // Navigate to review section
      dispatch({ type: 'SET_CURRENT_SECTION', sectionId: FormSectionId.REVIEW });

      // Validate entire form
      const { valid } = validateForm(state);
      
      let bodyText = `Are you ready to submit application ${input.application_id}? This action is irreversible.`;
      if (!valid) {
         bodyText = `WARNING: The application has validation errors. Are you sure you want to submit application ${input.application_id}? This action is irreversible.`;
      }

      // HITL Confirmation
      const approved = await requestUserInteractionFallback({
        title: 'Submit your ALA application?',
        body: bodyText,
        confirmLabel: 'Submit Application',
        cancelLabel: 'Go Back'
      });

      if (!approved) {
         const result = { status: 'cancelled_by_user' };
         const duration = Math.round(performance.now() - start);
         logToolActivity({ id: invId, toolName: 'submit_application', input, output: result, status: 'success', duration });
         return JSON.stringify(result);
      }

      // Mock submission to "backend"
      const referenceNumber = `ALA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // We could dispatch a SUCCESS state here to update the UI
      
      const result = { status: 'submitted', reference_number: referenceNumber };
      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'submit_application', input, output: result, status: 'success', duration });
      
      return JSON.stringify(result);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'submit_application', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { untrustedContentHint: false } // False because this is an irreversible mutation
};
