"use client";

import React, { useEffect, useRef } from 'react';

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
  const dialogRef = useRef<HTMLDivElement>(null);

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
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-900/40 dark:bg-gray-950/80 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div 
            ref={dialogRef}
            className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="px-6 pt-8 pb-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2" id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-4">
                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                className="inline-flex w-full sm:w-auto justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className="inline-flex w-full sm:w-auto justify-center rounded-full border border-transparent bg-gray-900 dark:bg-white px-6 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:scale-105 transition-all focus:outline-none"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
