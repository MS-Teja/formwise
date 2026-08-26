"use client";

import { useEffect, useState } from "react";
import { FormProvider } from "@/lib/form-store";
import { FormShell } from "@/components/form/FormShell";
import { ToolActivityPanel } from "@/components/ui/ToolActivityPanel";
import { GlobalInteractionProvider } from "@/components/ui/GlobalInteractionProvider";
import { registerAllTools } from "@/lib/webmcp/register-tools";
import { Header } from "@/components/ui/Header";

export default function Home() {
  const [mcpStatus, setMcpStatus] = useState<'checking' | 'registered' | 'unavailable'>('checking');

  useEffect(() => {
    // Guard: API exists + origin-isolated document required by the spec
    if (!("modelContext" in document)) {
      console.error("WebMCP not available — enable chrome://flags/#enable-webmcp-testing");
      setMcpStatus('unavailable');
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        await registerAllTools(controller.signal);
        setMcpStatus('registered');
      } catch (err: any) {
        // AbortError is expected on React StrictMode remount — ignore it
        if (err?.name === 'AbortError') return;
        console.error("Failed to register tools", err);
        setMcpStatus('unavailable');
      }
    })();

    return () => controller.abort(); // unregister on unmount
  }, []);

  return (
    <FormProvider>
      <GlobalInteractionProvider>
        <main className="min-h-screen bg-gray-50 dark:bg-black">
          <Header />
          
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                 <div className="max-w-2xl">
                   <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                     Accessibility Living Allowance (ALA)
                   </h2>
                   <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                     Formwise makes government benefits accessible. Our form exposes its own semantics, 
                     allowing AI agents and screen readers to fill it deterministically.
                   </p>
                 </div>
                 <div className="mt-6 md:mt-0 flex flex-col items-end">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border shadow-sm">
                      {mcpStatus === 'checking' && <><span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span><span className="text-yellow-800 dark:text-yellow-200">Checking WebMCP</span></>}
                      {mcpStatus === 'registered' && <><span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span><span className="text-green-800 dark:text-green-200">WebMCP Active</span></>}
                      {mcpStatus === 'unavailable' && <><span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span><span className="text-red-800 dark:text-red-200">WebMCP Unavailable</span></>}
                    </div>
                    {mcpStatus === 'unavailable' && (
                      <p className="text-xs text-gray-500 mt-2 max-w-xs text-right">
                        Please use Chrome with <code>chrome://flags/#enable-webmcp-testing</code> enabled, or the ChatGPT app.
                      </p>
                    )}
                 </div>
               </div>
             </div>
          </div>

          <FormShell />
          
          <ToolActivityPanel />
        </main>
      </GlobalInteractionProvider>
    </FormProvider>
  );
}