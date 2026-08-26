"use client";

import React from 'react';
import { useFormStore } from '@/lib/form-store';
import { FormField } from './IdentitySection';
import { FormSectionId } from '@/lib/types';
import { ALA_FORM_SCHEMA } from '@/lib/form-schema';

const SECTION_META: Record<string, { title: string }> = {
  [FormSectionId.IDENTITY]: { title: 'Applicant Identity' },
  [FormSectionId.RESIDENCE]: { title: 'Residence History' },
  [FormSectionId.DISABILITY]: { title: 'Disability & Daily Life' },
  [FormSectionId.INCOME]: { title: 'Income & Household' },
  [FormSectionId.EVIDENCE]: { title: 'Evidence Attached' },
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
      <div key={sectionId} className={`mb-8 pb-8 border-b border-gray-200 dark:border-gray-800 last:border-0 last:mb-0 last:pb-0`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {meta.title}
          </h3>
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-widest ${isComplete ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : isEmpty ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' : 'border border-gray-900 text-gray-900 dark:border-white dark:text-white'}`}>
            {isComplete ? 'Complete' : isEmpty ? 'Empty' : `${filledRequired}/${totalRequired} Filled`}
          </span>
        </div>
        
        {isEmpty ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">No data provided yet.</p>
        ) : (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
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
                  <span className="inline-flex items-center gap-1.5 text-gray-900 dark:text-white font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    {val.name || 'Attached Document'}
                  </span>
                );
              } else if (field.type === 'checkbox' && typeof val === 'boolean') {
                displayVal = val ? (
                  <span className="text-gray-900 dark:text-white font-medium">✓ Yes</span>
                ) : (
                  <span className="text-gray-400">✗ No</span>
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
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{field.label}</dt>
                  <dd className="text-base text-gray-900 dark:text-white break-words font-medium">
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
    <div className="space-y-12">
      <div className="max-h-[600px] overflow-y-auto pr-6 custom-scrollbar -mr-6">
        {renderSectionSummary(FormSectionId.IDENTITY)}
        {renderSectionSummary(FormSectionId.RESIDENCE)}
        {renderSectionSummary(FormSectionId.DISABILITY)}
        {renderSectionSummary(FormSectionId.INCOME)}
        {renderSectionSummary(FormSectionId.EVIDENCE)}
      </div>
      
      <div className="rounded-2xl border-2 border-gray-900 dark:border-white p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Final Declarations
        </h3>
        <div className="space-y-4">
          <FormField fieldId="consentInformation" />
          <FormField fieldId="declarationTruth" />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
