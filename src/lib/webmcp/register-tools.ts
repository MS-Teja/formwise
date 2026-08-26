import { getFormStateTool } from './tools/get-form-state';
import { explainFieldTool } from './tools/explain-field';
import { validateSectionTool } from './tools/validate-section';
import { autoFillFromProfileTool } from './tools/auto-fill-from-profile';
import { setFieldTool } from './tools/set-field';
import { listProfilesTool } from './tools/list-profiles';
import { attachDocumentTool } from './tools/attach-document';
import { requestHumanReviewTool } from './tools/request-human-review';
import { submitApplicationTool } from './tools/submit-application';

/**
 * Registers all imperative WebMCP tools for the Formwise application.
 * Must be called in a browser context where document.modelContext exists.
 */
export async function registerAllTools(signal: AbortSignal) {
  if (!("modelContext" in document)) {
    throw new Error("WebMCP not supported in this browser.");
  }
  
  const mcp = (document as any).modelContext;
  
  const tools = [
    getFormStateTool,
    explainFieldTool,
    validateSectionTool,
    listProfilesTool,
    autoFillFromProfileTool,
    setFieldTool,
    attachDocumentTool,
    requestHumanReviewTool,
    submitApplicationTool
  ];

  for (const tool of tools) {
    await mcp.registerTool(tool, { signal });
  }
}

// Utility to dispatch an activity event that the ToolActivityPanel listens to
export function logToolActivity(activity: {
  id?: string;
  toolName: string;
  input: any;
  output?: any;
  status: 'running' | 'success' | 'error';
  duration?: number;
}) {
  const event = new CustomEvent('webmcp:activity', {
    detail: {
      id: activity.id ?? Math.random().toString(36).substring(7),
      timestamp: new Date(),
      ...activity
    }
  });
  window.dispatchEvent(event);
}

/** Generate a stable invocation ID for a tool call. Use same ID for "running" and "success/error" events. */
export function newInvocationId(): string {
  return Math.random().toString(36).substring(7);
}
