import { logToolActivity, newInvocationId } from '../register-tools';
import { requestUserInteractionFallback } from '@/components/ui/GlobalInteractionProvider';
import { FormSectionId } from '@/lib/types';

export const requestHumanReviewTool = {
  name: 'request_human_review',
  description: 'Surfaces a specific section for the user to review before the agent proceeds. The agent pauses until the human confirms they have reviewed it.',
  inputSchema: {
    type: 'object',
    properties: {
      section_id: { type: 'string', description: 'The ID of the section to review.' }
    },
    required: ['section_id']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'request_human_review', input, status: 'running' });
    
    try {
      const dispatch = (window as any).__FORM_DISPATCH__;
      
      if (!dispatch) {
        throw new Error("Form dispatch not initialized.");
      }

      // Navigate UI to that section
      dispatch({ type: 'SET_CURRENT_SECTION', sectionId: input.section_id as FormSectionId });

      // Wait a moment for React to render the new section
      await new Promise(resolve => setTimeout(resolve, 150));

      // HITL Confirmation
      const approved = await requestUserInteractionFallback({
        title: 'Review Requested',
        body: `The agent is requesting you to review the "${input.section_id}" section. Please review the details on the screen.`,
        confirmLabel: 'I have reviewed it',
        cancelLabel: 'Cancel'
      });

      const result = { reviewed: approved };
      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'request_human_review', input, output: result, status: 'success', duration });
      
      return JSON.stringify(result);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'request_human_review', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { untrustedContentHint: false }
};
