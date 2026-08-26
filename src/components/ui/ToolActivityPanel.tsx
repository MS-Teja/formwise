"use client";

import React, { useEffect, useState, useRef } from 'react';

interface ToolActivity {
  id: string;
  timestamp: Date;
  toolName: string;
  input: any;
  output?: any;
  status: 'running' | 'success' | 'error';
  duration?: number;
}

export function ToolActivityPanel() {
  const [activities, setActivities] = useState<ToolActivity[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToolActivity = (e: CustomEvent<ToolActivity>) => {
      setActivities(prev => {
        const existingIdx = prev.findIndex(a => a.id === e.detail.id);
        if (existingIdx >= 0) {
          const newActivities = [...prev];
          newActivities[existingIdx] = e.detail;
          return newActivities;
        }
        return [...prev, e.detail].slice(-50); // Keep last 50, append to end
      });
    };

    window.addEventListener('webmcp:activity' as any, handleToolActivity as any);
    return () => {
      window.removeEventListener('webmcp:activity' as any, handleToolActivity as any);
    };
  }, []);

  // Auto-scroll to bottom when new activities arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activities]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all z-40 ring-1 ring-white/10"
      >
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <span className="text-sm font-medium">Agent Activity</span>
        {activities.length > 0 && (
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">{activities.length}</span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[420px] max-w-[calc(100vw-32px)] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
        <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          WebMCP Activity
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div 
        ref={scrollRef}
        className="h-[400px] max-h-[60vh] overflow-y-auto p-4 space-y-3 custom-scrollbar"
      >
        {activities.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p className="text-sm">Waiting for agent activity...</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`rounded-xl border transition-colors ${
                activity.status === 'error' ? 'border-rose-900/50 bg-rose-900/10' : 
                activity.status === 'running' ? 'border-amber-900/50 bg-amber-900/10' : 
                'border-gray-700/50 bg-gray-800/30 hover:border-gray-600/50 hover:bg-gray-800/60'
              }`}
            >
              <div 
                className="p-3 cursor-pointer select-none"
                onClick={() => toggleExpand(activity.id)}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-2">
                    {activity.status === 'running' ? (
                      <svg className="w-4 h-4 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : activity.status === 'error' ? (
                      <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                    <span className="text-sm font-mono font-medium text-gray-200">{activity.toolName}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{formatTime(activity.timestamp)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${
                    activity.status === 'running' ? 'text-amber-400/80' : 
                    activity.status === 'error' ? 'text-rose-400/80' : 
                    'text-emerald-400/80'
                  }`}>
                    {activity.status === 'running' ? 'Running...' : activity.status === 'error' ? 'Failed' : 'Success'}
                  </span>
                  {activity.duration !== undefined && (
                    <span className="text-xs text-gray-500 font-mono">{activity.duration}ms</span>
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {expandedId === activity.id && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-700/50 mt-1 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Input Arguments</span>
                    <div className="bg-gray-900 rounded-lg p-2 overflow-x-auto">
                      <pre className="text-xs text-indigo-300 font-mono m-0">
                        {JSON.stringify(activity.input, null, 2)}
                      </pre>
                    </div>
                  </div>
                  
                  {activity.output && (
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Output / Result</span>
                      <div className="bg-gray-900 rounded-lg p-2 overflow-x-auto">
                        <pre className={`text-xs font-mono m-0 ${activity.status === 'error' ? 'text-rose-300' : 'text-emerald-300'}`}>
                          {typeof activity.output === 'string' 
                            ? activity.output 
                            : JSON.stringify(activity.output, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 1);
        }
      `}} />
    </div>
  );
}
