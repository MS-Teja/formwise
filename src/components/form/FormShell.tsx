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
  { id: FormSectionId.IDENTITY, title: 'Applicant Identity' },
  { id: FormSectionId.RESIDENCE, title: 'Residence History' },
  { id: FormSectionId.DISABILITY, title: 'Disability & Daily Life' },
  { id: FormSectionId.INCOME, title: 'Income & Household' },
  { id: FormSectionId.EVIDENCE, title: 'Evidence Upload' },
  { id: FormSectionId.REVIEW, title: 'Review & Submit' },
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
    alert("Application submitted successfully. Redirecting to dashboard...");
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        
        {/* Editorial Sidebar Navigation */}
        <aside className="py-6 lg:py-0 lg:col-span-3 border-r border-gray-200 dark:border-gray-800 pr-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">Application</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Living Allowance (ALA)</p>
          </div>

          <nav className="space-y-4">
            {SECTIONS.map((section, index) => {
              const isCurrent = state.currentSection === section.id;
              const status = getSectionStatus(section.id);
              const num = String(index + 1).padStart(2, '0');
              
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`group w-full flex items-start gap-4 text-left transition-all duration-300 ${
                    isCurrent
                      ? 'text-gray-900 dark:text-white opacity-100'
                      : 'text-gray-500 dark:text-gray-400 opacity-60 hover:opacity-100'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <span className="text-xs font-mono font-medium pt-1">{num}</span>
                  <div className="flex-1">
                    <span className={`block text-sm font-semibold tracking-wide ${isCurrent ? 'mb-1' : ''}`}>{section.title}</span>
                    {isCurrent && (
                      <div className="h-[2px] w-full bg-gray-900 dark:bg-white origin-left transition-transform duration-300"></div>
                    )}
                  </div>
                  
                  {/* Minimalist Status Indicators */}
                  <div className="pt-1.5">
                    {status === 'complete' && <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-white rounded-full"></div>}
                    {status === 'error' && <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>}
                    {status === 'partial' && <div className="w-1.5 h-1.5 border border-gray-900 dark:border-white rounded-full"></div>}
                  </div>
                </button>
              );
            })}
          </nav>
          
          {/* Progress (Minimalist line) */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Progress</span>
              <span className="text-xs font-mono text-gray-900 dark:text-white">{state.completionPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-[1px]">
              <div 
                className="bg-gray-900 dark:bg-white h-[2px] -mt-[0.5px] transition-all duration-700 ease-out" 
                style={{ width: `${state.completionPercent}%` }}
              ></div>
            </div>
          </div>
          
          {/* Application ID */}
          <div className="mt-8">
            <span className="text-xs font-mono text-gray-400 dark:text-gray-500 block uppercase tracking-widest mb-1">Ref No.</span>
            <span className="text-sm font-mono text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded inline-block">
              {mounted ? state.applicationId : '...'}
            </span>
          </div>
        </aside>

        {/* Form Content Area */}
        <div className="lg:col-span-9 mt-12 lg:mt-0">
          <form 
             onSubmit={handleSubmit}
             className="min-h-[700px] flex flex-col relative"
          >
            {/* Step Header */}
            <div className="mb-12 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span className="text-sm font-mono text-gray-400 dark:text-gray-500 hidden sm:inline-block">
                {String(currentIndex + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
              </span>
              <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-gray-900 dark:text-white">
                {SECTIONS[currentIndex].title}
              </h3>
            </div>
            
            <div className="flex-1">
              {renderCurrentSection()}
            </div>
            
            {/* Minimalist Navigation Buttons */}
            <div className="mt-auto pt-16 flex justify-between items-center pb-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="group inline-flex items-center gap-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white disabled:opacity-0 transition-all duration-300"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Previous Step
              </button>
              
              {state.currentSection !== FormSectionId.REVIEW && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="group inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3.5 px-8 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-white/10 transition-all duration-300 active:scale-95"
                >
                  Continue
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
