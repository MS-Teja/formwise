"use client";

import React, { useState, useEffect } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

interface InteractionRequest {
  id: string;
  title: string;
  body: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  resolve: (value: boolean) => void;
}

// Global reference to the current interaction request
let currentRequest: InteractionRequest | null = null;
let setDialogState: ((req: InteractionRequest | null) => void) | null = null;

export function GlobalInteractionProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<InteractionRequest | null>(null);

  useEffect(() => {
    setDialogState = setRequest;
    return () => {
      setDialogState = null;
    };
  }, []);

  const handleConfirm = () => {
    if (request) {
      request.resolve(true);
      setRequest(null);
      currentRequest = null;
    }
  };

  const handleCancel = () => {
    if (request) {
      request.resolve(false);
      setRequest(null);
      currentRequest = null;
    }
  };

  return (
    <>
      {children}
      {request && (
        <ConfirmDialog
          isOpen={!!request}
          title={request.title}
          body={request.body}
          confirmLabel={request.confirmLabel}
          cancelLabel={request.cancelLabel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

/**
 * Wraps the native `requestUserInteraction` if available, otherwise falls back to the custom React modal.
 */
export async function requestUserInteractionFallback(options: {
  title: string;
  body: string | React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
}): Promise<boolean> {
  // Check if native API exists
  if (typeof (window as any).requestUserInteraction === 'function') {
    try {
       // Assuming the native API takes similar options and returns a Promise<boolean>
       return await (window as any).requestUserInteraction(options);
    } catch (e) {
       console.warn("Native requestUserInteraction failed, falling back to modal.", e);
    }
  }

  // Fallback to custom React modal
  if (!setDialogState) {
    console.error("GlobalInteractionProvider not mounted!");
    return false;
  }

  if (currentRequest) {
    console.warn("An interaction request is already pending.");
    currentRequest.resolve(false); // Cancel previous request
  }

  return new Promise((resolve) => {
    currentRequest = {
      id: Math.random().toString(),
      ...options,
      resolve,
    };
    setDialogState!(currentRequest);
  });
}
