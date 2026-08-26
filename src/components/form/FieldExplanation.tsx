"use client";

import React, { useState } from 'react';

interface Props {
  fieldId: string;
}

// In a real app, this would be fetched from the API or a larger static dictionary
// This mirrors what the `explain_field` tool returns
const EXPLANATIONS: Record<string, { description: string, why_asked: string, examples: string[] }> = {
  'fullName': {
    description: "Your full legal name.",
    why_asked: "We need this to verify your identity and match records with other government agencies.",
    examples: ["Jane Doe", "John Smith-Jones"]
  },
  'dob': {
    description: "Your date of birth.",
    why_asked: "To confirm you meet the age requirements for this benefit.",
    examples: ["1980-05-15"]
  },
  'contactPref': {
    description: "How you want us to communicate with you.",
    why_asked: "So we can send you updates and requests for information in the way that is most accessible to you.",
    examples: []
  },
  'email': {
    description: "Your email address.",
    why_asked: "For sending digital notifications and login links.",
    examples: ["applicant@example.com"]
  },
  'phone': {
    description: "Your telephone number.",
    why_asked: "In case a caseworker needs to call you for clarification.",
    examples: ["555-0198"]
  },
  'currentAddress': {
    description: "Where you live right now.",
    why_asked: "To determine jurisdiction and send physical mail if required.",
    examples: ["123 Maple St, Springfield"]
  },
  'moveInDate': {
    description: "When you started living at your current address.",
    why_asked: "We require 12 months of address history. If you moved recently, we will ask for your previous address.",
    examples: ["2022-01-01"]
  },
  'previousAddresses': {
    description: "Where you lived before your current address.",
    why_asked: "To complete the required 12-month residency history.",
    examples: ["456 Oak Ave, Springfield"]
  },
  'conditionCategory': {
    description: "The main category of your condition.",
    why_asked: "To route your application to the correct specialist assessor.",
    examples: []
  },
  'onsetDate': {
    description: "When the condition started affecting your daily life.",
    why_asked: "To determine when you became eligible for support.",
    examples: ["2020-03-01"]
  },
  'impactMobility': {
    description: "How hard it is for you to move around.",
    why_asked: "This is a key criteria for the mobility component of the allowance.",
    examples: []
  },
  'mobilityAids': {
    description: "Any equipment you use to help you move.",
    why_asked: "To understand your daily needs and whether you need an equipment grant.",
    examples: ["Manual wheelchair", "Walking stick"]
  },
  'householdSize': {
    description: "How many people live with you and share expenses.",
    why_asked: "Income thresholds are based on household size.",
    examples: ["1", "3"]
  },
  'incomeBand': {
    description: "The total yearly income of everyone in your household.",
    why_asked: "This is a means-tested benefit.",
    examples: []
  },
  'existingBenefits': {
    description: "Other assistance you currently receive.",
    why_asked: "To ensure you aren't paid twice for the same support needs.",
    examples: []
  },
  'medicalEvidence': {
    description: "A document from a doctor or specialist about your condition.",
    why_asked: "We need medical proof of the diagnosis and its impact.",
    examples: ["Letter from your GP", "Hospital discharge summary"]
  },
  'idDocument': {
    description: "An official identity document.",
    why_asked: "To prove who you are.",
    examples: ["Passport", "Driver's license"]
  },
  'proofOfResidence': {
    description: "A document showing your current address.",
    why_asked: "To prove you live where you say you do.",
    examples: ["Utility bill", "Lease agreement"]
  },
  'consentInformation': {
    description: "Your permission for us to check your details.",
    why_asked: "We cannot process your application without your consent to verify information.",
    examples: []
  },
  'declarationTruth': {
    description: "Your promise that you are telling the truth.",
    why_asked: "It is a legal requirement to provide accurate information.",
    examples: []
  }
};

export function FieldExplanation({ fieldId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const explanation = EXPLANATIONS[fieldId];
  if (!explanation) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
        aria-expanded={isOpen}
        aria-controls={`explain-${fieldId}`}
      >
        Why is this asked?
      </button>
      
      {isOpen && (
        <div 
          id={`explain-${fieldId}`}
          className="absolute right-0 top-6 z-10 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm"
          role="region"
          aria-live="polite"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Explanation</h4>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close explanation"
            >
              ×
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>What:</strong> {explanation.description}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Why:</strong> {explanation.why_asked}</p>
          {explanation.examples.length > 0 && (
            <p className="text-gray-700 dark:text-gray-300 text-xs">
              <strong>Examples:</strong> {explanation.examples.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
