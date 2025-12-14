/**
 * Main App Component
 * 
 * ARCHITECTURE DECISIONS:
 * 1. Container/Presentational pattern: App orchestrates layout
 * 2. Component composition: Navbar + Cards grid
 * 3. Responsive grid system using CSS Grid
 * 4. Centralized styling with Tailwind utilities
 * 
 * RESPONSIVE GRID STRATEGY:
 * - Mobile (default): 1 column - list view for readability
 * - Tablet (md): 2 columns - balance between space and content
 * - Desktop (lg): 3 columns - optimal use of screen real estate
 * 
 * WHY CSS GRID OVER FLEXBOX:
 * - Better for 2D layouts (rows and columns)
 * - Auto-fit/auto-fill for responsive behavior
 * - Gap property for consistent spacing
 * - Easier alignment of varying card heights
 */

import Navbar from './components/Navbar';
import Card from './components/Card';
import { cardsData, productsData } from './mockData';
import { useState } from 'react';
import ProductsTable from './components/ProductsTable';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    /**
     * DECISION: Min-height screen with gray background
     * WHY: Ensures content fills viewport, provides contrast for cards
     */
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar - Sticky positioning handled internally */}
      <Navbar activeTab={activeTab} onTabChange={handleTabChange}/>

      {/* Main Content Container */}
      {/* DECISION: Max-width with horizontal centering
       * WHY: Improves readability on ultra-wide screens
       * Consistent padding across breakpoints */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {activeTab === 'home' && (
        <>
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
            Discover cutting-edge solutions designed to transform your digital experience and drive innovation.
          </p>
        </div>

        {/* Cards Grid */}
        {/* DECISION: CSS Grid with responsive columns
         * - Base: 1 column (list view) for mobile
         * - md: 2 columns at 768px breakpoint
         * - lg: 3 columns at 1024px breakpoint
         * 
         * DECISION: Gap utilities for consistent spacing
         * WHY: Cleaner than margin/padding on individual items
         * Scales nicely with viewport size
         * 
         * DECISION: auto-rows-fr for equal height rows
         * WHY: Prevents layout shifts, maintains visual harmony */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cardsData.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
        </>
        )}

        {/* Products Tab - Table */}
        {activeTab === 'products' && (
          <ProductsTable products={productsData} />
        )}
        

        {/* Footer/Spacing */}
        {/* DECISION: Bottom padding for breathing room
         * WHY: Prevents content from touching viewport edge on scroll */}
        <div className="mt-12 md:mt-16 pb-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 DevShowcase. Built with React & Tailwind CSS.</p>
            <p className="mt-2">Demonstrating mobile-first responsive design best practices.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
