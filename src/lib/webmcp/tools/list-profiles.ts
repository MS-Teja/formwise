import { logToolActivity, newInvocationId } from '../register-tools';
import { MOCK_PROFILES } from '@/lib/profiles';

export const listProfilesTool = {
  name: 'list_profiles',
  description: 'Returns all available claimant profiles with their IDs and summary info. Call this before auto_fill_from_profile to discover which profiles exist.',
  inputSchema: {
    type: 'object',
    properties: {}
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'list_profiles', input, status: 'running' });

    try {
      const profiles = Object.entries(MOCK_PROFILES).map(([id, p]) => ({
        id,
        name: p.fullName,
        email: p.email,
        summary: `${p.fullName}, ${p.currentAddress}`
      }));

      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'list_profiles', input, output: profiles, status: 'success', duration });
      return JSON.stringify({ profiles });
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'list_profiles', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { readOnlyHint: true }
};
