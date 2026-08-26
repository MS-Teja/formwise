import { logToolActivity, newInvocationId } from '../register-tools';

// We duplicate the static dictionary here so the tool can use it without React dependencies
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

export const explainFieldTool = {
  name: 'explain_field',
  description: 'Returns a plain-language, screen-reader-friendly explanation of what a specific form field wants and why it is asked.',
  inputSchema: {
    type: 'object',
    properties: {
      field_id: { type: 'string', description: 'The ID of the field to explain (e.g., fullName).' }
    },
    required: ['field_id']
  },
  execute: async (input: any) => {
    const start = performance.now();
    const invId = newInvocationId();
    logToolActivity({ id: invId, toolName: 'explain_field', input, status: 'running' });
    
    try {
      const explanation = EXPLANATIONS[input.field_id];
      if (!explanation) {
        throw new Error(`No explanation found for field ID: ${input.field_id}`);
      }
      
      const duration = Math.round(performance.now() - start);
      logToolActivity({ id: invId, toolName: 'explain_field', input, output: explanation, status: 'success', duration });
      
      return JSON.stringify(explanation);
    } catch (e: any) {
      logToolActivity({ id: invId, toolName: 'explain_field', input, output: e.message, status: 'error' });
      return JSON.stringify({ error: e.message });
    }
  },
  annotations: { readOnlyHint: true }
};
