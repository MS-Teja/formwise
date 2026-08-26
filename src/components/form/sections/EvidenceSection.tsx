"use client";

import React, { useRef, useState } from 'react';
import { useFormStore } from '@/lib/form-store';
import { FieldExplanation } from '../FieldExplanation';
import { ALA_FORM_SCHEMA } from '@/lib/form-schema';

export function EvidenceSection() {
  const { state, dispatch } = useFormStore();
  const sectionState = state.sections['evidence'];

  const handleFileUpload = (fieldId: string, file: File) => {
    // In a real app, this would upload to S3/Blob storage
    // Here we just store metadata in memory for the demo
    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    };
    
    dispatch({ 
      type: 'ATTACH_FILE', 
      sectionId: 'evidence' as any, 
      fieldId, 
      fileData 
    });
  };

  const handleRemove = (fieldId: string) => {
    dispatch({ 
      type: 'SET_FIELD', 
      sectionId: 'evidence' as any, 
      fieldId, 
      value: '' 
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">Evidence Upload</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Please attach the required documentation to support your claim.
      </p>
      
      <div className="mt-6 space-y-6">
        <FileUploadZone fieldId="medicalEvidence" onUpload={handleFileUpload} onRemove={handleRemove} value={sectionState?.fields['medicalEvidence']?.value} />
        <FileUploadZone fieldId="idDocument" onUpload={handleFileUpload} onRemove={handleRemove} value={sectionState?.fields['idDocument']?.value} />
        <FileUploadZone fieldId="proofOfResidence" onUpload={handleFileUpload} onRemove={handleRemove} value={sectionState?.fields['proofOfResidence']?.value} />
      </div>
    </div>
  );
}

interface FileUploadProps {
  fieldId: string;
  value: any;
  onUpload: (fieldId: string, file: File) => void;
  onRemove: (fieldId: string) => void;
}

function FileUploadZone({ fieldId, value, onUpload, onRemove }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fieldDef = ALA_FORM_SCHEMA.find(f => f.id === fieldId);
  
  if (!fieldDef) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(fieldId, e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(fieldId, e.target.files[0]);
    }
  };

  // Declarative WebMCP annotations for the file input
  const mcpProps: any = {
    toolparamdescription: fieldDef.toolParamDescription
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {fieldDef.label} {fieldDef.required && <span className="text-red-500">*</span>}
        </label>
        <FieldExplanation fieldId={fieldId} />
      </div>
      
      {value ? (
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{value.name || (typeof value === 'string' ? value : 'Attached File')}</p>
              {value.size && <p className="text-xs text-gray-500">{(value.size / 1024).toFixed(2)} KB</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(fieldId)}
            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 font-medium"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
            isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
              <label
                htmlFor={fieldId}
                className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id={fieldId}
                  name={fieldId}
                  type="file"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handleChange}
                  {...mcpProps}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">PDF, PNG, JPG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
