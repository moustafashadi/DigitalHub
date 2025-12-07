/**
 * Entry Point
 * 
 * DECISION: React.StrictMode enabled
 * WHY: Helps identify potential problems in development
 * - Identifies unsafe lifecycles
 * - Warns about legacy string ref API usage
 * - Detects unexpected side effects
 * 
 * DECISION: Import CSS before App
 * WHY: Ensures Tailwind styles are loaded first
 * 
 * DECISION: Using React 18's createRoot API
 * WHY: React 18 deprecated ReactDOM.render in favor of createRoot
 * Provides better concurrent features and automatic batching
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Index.js is loading...');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React root created and render called');
