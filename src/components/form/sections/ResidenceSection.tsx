"use client";

import React from 'react';
import { useFormStore } from '@/lib/form-store';
import { FormField } from './IdentitySection';

export function ResidenceSection() {
  const { state } = useFormStore();
  const sectionState = state.sections['residence'];
  
  // Conditionally render previous addresses based on form state
  const moveInDate = sectionState?.fields['moveInDate']?.value;
  let showPrevious = false;
  
  if (moveInDate) {
    const moveIn = new Date(moveInDate);
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    showPrevious = moveIn > twelveMonthsAgo;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">Residence History</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        We require a 12-month address history to process your application.
      </p>
      
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <FormField fieldId="currentAddress" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="moveInDate" />
        </div>
        
        {showPrevious && (
          <div className="sm:col-span-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md">
            <h3 className="text-md font-medium text-yellow-800 dark:text-yellow-300 mb-2">Previous Address Required</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-4">
              Because you moved in within the last 12 months, please list your previous address(es).
            </p>
            <FormField fieldId="previousAddresses" />
          </div>
        )}
      </div>
    </div>
  );
}
