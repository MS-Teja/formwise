"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo mock */}
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-xl">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">Formwise</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Province of Meridia</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline-block">
                Signed in as <span className="font-semibold">{session.user?.name}</span>
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Sign out
              </button>
            </div>
          ) : (
             <a href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
               Sign in
             </a>
          )}
        </div>
      </div>
    </header>
  );
}
