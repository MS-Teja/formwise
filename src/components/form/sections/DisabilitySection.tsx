"use client";

import React from 'react';
import { useFormStore } from '@/lib/form-store';
import { FormField } from './IdentitySection';

export function DisabilitySection() {
  const { state } = useFormStore();
  const sectionState = state.sections['disability'];
  
  // Conditionally render mobility aids
  const impactMobility = sectionState?.fields['impactMobility']?.value;
  const showMobilityAids = impactMobility && ['some', 'lot', 'cannot'].includes(impactMobility);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">Disability & Daily Life</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Tell us about your condition and how it impacts your day-to-day activities.
      </p>
      
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField fieldId="conditionCategory" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="onsetDate" />
        </div>
        
        <div className="sm:col-span-6 mt-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Functional Impact</h3>
          <FormField fieldId="impactMobility" />
        </div>
        
        {showMobilityAids && (
          <div className="sm:col-span-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <FormField fieldId="mobilityAids" />
          </div>
        )}
      </div>
    </div>
  );
}
