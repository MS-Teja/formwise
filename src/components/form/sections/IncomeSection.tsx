"use client";

import React from 'react';
import { FormField } from './IdentitySection';

export function IncomeSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">Income & Household</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Please provide information about your household size and income, as this is a means-tested benefit.
      </p>
      
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField fieldId="householdSize" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="incomeBand" />
        </div>
        
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Currently Receiving Other Benefits?
          </label>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
             {/* Using a simplified checkbox group for existingBenefits. 
                 Since our schema defines it as a checkbox returning an array, 
                 we'll just use a text input for simplicity in this implementation, 
                 or a custom multi-select in a real app. Let's use a text input 
                 for comma-separated values to match the tool definition. */}
             <FormField fieldId="existingBenefits" />
             <p className="text-xs text-gray-500 mt-1">Enter a comma-separated list: housing, food, medical.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
