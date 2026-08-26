"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useFormStore } from '@/lib/form-store';
import { FormSectionId } from '@/lib/types';
import { ALA_FORM_SCHEMA } from '@/lib/form-schema';
import { FieldExplanation } from '../FieldExplanation';

interface FieldProps {
  fieldId: string;
}

export function FormField({ fieldId }: FieldProps) {
  const { state, dispatch } = useFormStore();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const fieldDef = ALA_FORM_SCHEMA.find(f => f.id === fieldId);
  
  // Listen for agent highlight events
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail.fieldId === fieldId) {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2000);
      }
    };
    window.addEventListener('webmcp:field-highlight' as any, handler as any);
    return () => window.removeEventListener('webmcp:field-highlight' as any, handler as any);
  }, [fieldId]);
  
  if (!fieldDef) return null;
  
  const sectionState = state.sections[fieldDef.section];
  const fieldState = sectionState.fields[fieldId] || { value: '', valid: true, touched: false };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    dispatch({ type: 'SET_FIELD', sectionId: fieldDef.section, fieldId, value: val });
  };
  
  const handleRadioChange = (val: string) => {
    dispatch({ type: 'SET_FIELD', sectionId: fieldDef.section, fieldId, value: val });
  };
  
  const hasError = !fieldState.valid && fieldState.touched;
  const highlightClass = isHighlighted 
    ? 'ring-2 ring-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20 transition-all duration-500' 
    : 'transition-all duration-500';

  return (
    <div className={`mb-5 rounded-lg p-3 -mx-3 ${highlightClass}`}>
      <div className="flex justify-between items-start mb-1.5">
        <label htmlFor={fieldId} className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          {fieldDef.label} {fieldDef.required && <span className="text-rose-400">*</span>}
        </label>
        <FieldExplanation fieldId={fieldId} />
      </div>
      
      {isHighlighted && (
        <div className="flex items-center gap-1.5 mb-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
          Filled by AI agent
        </div>
      )}
      
      {fieldDef.type === 'select' && fieldDef.options ? (
        <select
          id={fieldId}
          name={fieldId}
          value={fieldState.value || ''}
          onChange={handleChange}
          required={fieldDef.required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${fieldId}-error` : undefined}
          className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800/80 dark:text-white ${hasError ? 'border-rose-400 ring-1 ring-rose-400' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
        >
          <option value="" disabled>Select an option</option>
          {fieldDef.options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : fieldDef.type === 'radio' && fieldDef.options ? (
        <div className="mt-2 space-y-2.5">
          {fieldDef.options.map(opt => (
            <label key={opt.value} className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${fieldState.value === opt.value ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 dark:border-indigo-400' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
              <input
                id={`${fieldId}-${opt.value}`}
                name={fieldId}
                type="radio"
                value={opt.value}
                checked={fieldState.value === opt.value}
                onChange={() => handleRadioChange(opt.value)}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      ) : fieldDef.type === 'checkbox' ? (
         <div className="flex items-center mt-2">
           <input
             id={fieldId}
             name={fieldId}
             type="checkbox"
             checked={fieldState.value === true}
             onChange={handleChange}
             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
           />
         </div>
      ) : fieldDef.type === 'file' ? (
        <div>
          <input type="file" id={fieldId} name={fieldId} className="hidden" />
          <p className="text-sm text-gray-500">File upload handled in Evidence section.</p>
        </div>
      ) : (
        <input
          type={fieldDef.type}
          id={fieldId}
          name={fieldId}
          value={fieldState.value || ''}
          onChange={handleChange}
          required={fieldDef.required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${fieldId}-error` : undefined}
          className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800/80 dark:text-white ${hasError ? 'border-rose-400 ring-1 ring-rose-400' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
        />
      )}
      
      {hasError && (
        <p className="mt-1.5 text-sm text-rose-500 flex items-center gap-1" id={`${fieldId}-error`} role="alert">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
          {fieldState.error}
        </p>
      )}
    </div>
  );
}

export function IdentitySection() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Applicant Identity</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Please provide your basic contact and identity information.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <FormField fieldId="fullName" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="dob" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="contactPref" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="email" />
        </div>
        <div className="sm:col-span-3">
          <FormField fieldId="phone" />
        </div>
      </div>
    </div>
  );
}
