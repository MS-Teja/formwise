"use client";

import React from 'react';
import { useFormStore } from '@/lib/form-store';
import { FormField } from './IdentitySection';
import { FormSectionId } from '@/lib/types';
import { ALA_FORM_SCHEMA } from '@/lib/form-schema';

const SECTION_META: Record<string, { title: string; icon: string }> = {
  [FormSectionId.IDENTITY]: { title: 'Applicant Identity', icon: '👤' },
  [FormSectionId.RESIDENCE]: { title: 'Residence History', icon: '🏠' },
  [FormSectionId.DISABILITY]: { title: 'Disability & Daily Life', icon: '♿' },
  [FormSectionId.INCOME]: { title: 'Income & Household', icon: '💰' },
  [FormSectionId.EVIDENCE]: { title: 'Evidence Attached', icon: '📎' },
};

export function ReviewSection() {
  const { state } = useFormStore();

  const renderSectionSummary = (sectionId: FormSectionId) => {
    const meta = SECTION_META[sectionId];
    if (!meta) return null;
    
    const sectionState = state.sections[sectionId];
    if (!sectionState || !sectionState.visible) return null;

    const fields = ALA_FORM_SCHEMA.filter(f => f.section === sectionId);
    
    // Check if any fields have values
    const filledFields = fields.filter(f => {
      const val = sectionState.fields[f.id]?.value;
      return val !== undefined && val !== null && val !== '';
    });

    const totalRequired = fields.filter(f => {
      if (f.conditionalOn) {
        const parentVal = sectionState.fields[f.conditionalOn.fieldId]?.value;
        return f.required && f.conditionalOn.condition(parentVal);
      }
      return f.required;
    }).length;

    const filledRequired = fields.filter(f => {
      if (f.conditionalOn) {
        const parentVal = sectionState.fields[f.conditionalOn.fieldId]?.value;
        if (!f.conditionalOn.condition(parentVal)) return false;
      }
      if (!f.required) return false;
      const val = sectionState.fields[f.id]?.value;
      return val !== undefined && val !== null && val !== '';
    }).length;

    const isComplete = filledRequired === totalRequired;
    const isEmpty = filledFields.length === 0;

    return (
      <div key={sectionId} className={`rounded-xl border p-5 transition-colors ${isComplete ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/10' : isEmpty ? 'border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30' : 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span>{meta.icon}</span>
            {meta.title}
          </h3>
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${isComplete ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200' : isEmpty ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-200'}`}>
            {isComplete ? '✓ Complete' : isEmpty ? 'Empty' : `${filledRequired}/${totalRequired}`}
          </span>
        </div>
        
        {isEmpty ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">No data provided yet.</p>
        ) : (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {fields.map(field => {
              let isVisible = true;
              if (field.conditionalOn) {
                const parentVal = sectionState.fields[field.conditionalOn.fieldId]?.value;
                isVisible = field.conditionalOn.condition(parentVal);
              }
              if (!isVisible) return null;

              const val = sectionState.fields[field.id]?.value;
              let displayVal: any = val;
              
              if (field.type === 'file' && val) {
                displayVal = (
                  <span className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    {val.name || 'Attached'}
                  </span>
                );
              } else if (field.type === 'checkbox' && typeof val === 'boolean') {
                displayVal = val ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Yes</span>
                ) : (
                  <span className="text-rose-500">✗ No</span>
                );
              } else if (field.type === 'select' || field.type === 'radio') {
                const opt = field.options?.find(o => o.value === val);
                displayVal = opt ? opt.label : val;
              } else if (Array.isArray(val)) {
                displayVal = val.join(', ');
              }

              const hasValue = val !== undefined && val !== null && val !== '';

              return (
                <div key={field.id} className="sm:col-span-1">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{field.label}</dt>
                  <dd className="mt-0.5 text-sm text-gray-900 dark:text-white break-words">
                    {hasValue ? displayVal : <span className="text-gray-300 dark:text-gray-600 italic">—</span>}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review & Submit</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Review your application summary. Sections highlighted green are complete.
        </p>
      </div>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {renderSectionSummary(FormSectionId.IDENTITY)}
        {renderSectionSummary(FormSectionId.RESIDENCE)}
        {renderSectionSummary(FormSectionId.DISABILITY)}
        {renderSectionSummary(FormSectionId.INCOME)}
        {renderSectionSummary(FormSectionId.EVIDENCE)}
      </div>
      
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20 p-5">
        <h3 className="text-base font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          Declarations
        </h3>
        <div className="space-y-3">
          <FormField fieldId="consentInformation" />
          <FormField fieldId="declarationTruth" />
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Submit Application
        </button>
      </div>
    </div>
  );
}
