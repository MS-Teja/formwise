"use client";

import React, { useEffect } from 'react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  body,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4 pointer-events-auto">
      {/* Floating Action Bar (Non-blocking) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/95 dark:bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-800 dark:border-gray-200 px-6 py-4 animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Text Content */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white dark:text-gray-900 tracking-wide">
              {title}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5 line-clamp-1">
              {body}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="flex-1 sm:flex-none justify-center rounded-full bg-transparent px-4 py-2 text-xs font-semibold text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors focus:outline-none"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="flex-1 sm:flex-none justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-2 text-xs font-bold text-white shadow-sm transition-all focus:outline-none"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
