"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-transparent border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">Formwise.</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:inline-block">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
             <a href="/login" className="text-sm font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors">
               Sign in
             </a>
          )}
        </div>
      </div>
    </header>
  );
}
