"use client";

import React, { useState } from 'react';
import { useFormStore } from '@/lib/form-store';
import { FormSectionId } from '@/lib/types';
import { IdentitySection } from './sections/IdentitySection';
import { ResidenceSection } from './sections/ResidenceSection';
import { DisabilitySection } from './sections/DisabilitySection';
import { IncomeSection } from './sections/IncomeSection';
import { EvidenceSection } from './sections/EvidenceSection';
import { ReviewSection } from './sections/ReviewSection';

const SECTIONS = [
  { id: FormSectionId.IDENTITY, title: 'Applicant Identity', icon: '👤' },
  { id: FormSectionId.RESIDENCE, title: 'Residence History', icon: '🏠' },
  { id: FormSectionId.DISABILITY, title: 'Disability & Daily Life', icon: '♿' },
  { id: FormSectionId.INCOME, title: 'Income & Household', icon: '💰' },
  { id: FormSectionId.EVIDENCE, title: 'Evidence Upload', icon: '📎' },
  { id: FormSectionId.REVIEW, title: 'Review & Submit', icon: '✅' },
];

export function FormShell() {
  const { state, dispatch } = useFormStore();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleNavClick = (sectionId: FormSectionId) => {
    dispatch({ type: 'SET_CURRENT_SECTION', sectionId });
  };

  const handleNext = () => {
    const currentIndex = SECTIONS.findIndex(s => s.id === state.currentSection);
    if (currentIndex < SECTIONS.length - 1) {
      dispatch({ type: 'SET_CURRENT_SECTION', sectionId: SECTIONS[currentIndex + 1].id });
    }
  };

  const handlePrev = () => {
    const currentIndex = SECTIONS.findIndex(s => s.id === state.currentSection);
    if (currentIndex > 0) {
      dispatch({ type: 'SET_CURRENT_SECTION', sectionId: SECTIONS[currentIndex - 1].id });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Application submitted successfully! 🎉");
  };

  const getSectionStatus = (sectionId: FormSectionId): 'empty' | 'partial' | 'complete' | 'error' => {
    const sectionState = state.sections[sectionId];
    if (!sectionState) return 'empty';
    const fields = Object.values(sectionState.fields);
    if (fields.length === 0) return 'empty';
    const hasErrors = fields.some(f => !f.valid && f.touched);
    if (hasErrors) return 'error';
    const allFilled = fields.every(f => f.value !== undefined && f.value !== null && f.value !== '');
    if (allFilled && fields.length > 0) return 'complete';
    return 'partial';
  };

  const renderCurrentSection = () => {
    switch (state.currentSection) {
      case FormSectionId.IDENTITY: return <IdentitySection />;
      case FormSectionId.RESIDENCE: return <ResidenceSection />;
      case FormSectionId.DISABILITY: return <DisabilitySection />;
      case FormSectionId.INCOME: return <IncomeSection />;
      case FormSectionId.EVIDENCE: return <EvidenceSection />;
      case FormSectionId.REVIEW: return <ReviewSection />;
      default: return null;
    }
  };

  const currentIndex = SECTIONS.findIndex(s => s.id === state.currentSection);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        
        {/* Sidebar Navigation */}
        <aside className="py-6 lg:py-0 lg:col-span-3">
          <nav className="space-y-1">
            {SECTIONS.map((section, index) => {
              const isCurrent = state.currentSection === section.id;
              const status = getSectionStatus(section.id);
              
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isCurrent
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-800'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <span className="text-base">{section.icon}</span>
                  <span className="truncate flex-1 text-left">{section.title}</span>
                  {status === 'complete' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs">✓</span>
                  )}
                  {status === 'error' && (
                    <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs">!</span>
                  )}
                  {status === 'partial' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Progress */}
          <div className="mt-8 px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{state.completionPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${state.completionPercent}%` }}
              ></div>
            </div>
          </div>
          
          {/* Application ID */}
          <div className="mt-6 px-4">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 px-3 py-2">
              <span className="text-xs text-gray-400 block">Application ID</span>
              <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{mounted ? state.applicationId : '...'}</span>
            </div>
          </div>
        </aside>

        {/* Form Content Area */}
        <div className="lg:col-span-9 mt-6 lg:mt-0">
          <form 
             onSubmit={handleSubmit}
             className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            {/* Section indicator */}
            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Step {currentIndex + 1} of {SECTIONS.length}
              </span>
              <div className="flex gap-1.5">
                {SECTIONS.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-indigo-500' : i < currentIndex ? 'w-1.5 bg-indigo-300 dark:bg-indigo-700' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`} />
                ))}
              </div>
            </div>
            
            <div className="py-6 px-6 sm:px-8 min-h-[520px]">
              {renderCurrentSection()}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-5 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Previous
              </button>
              
              {state.currentSection !== FormSectionId.REVIEW && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all active:scale-95"
                >
                  Next Section
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
