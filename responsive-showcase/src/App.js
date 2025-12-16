/**
 * Main App Component
 *
 * ARCHITECTURE DECISIONS:
 * 1. React Router for client-side routing
 * 2. Component composition: Navbar + Routes
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

import Navbar from "./components/Navbar";
import { cardsData, productsData } from "./mockData";
import ProductsTable from "./components/ProductsTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "./components/Card";
import ImageCarousel from "./components/ImageCarousel";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* Home Page - Cards Grid */}
          <Route
            path="/"
            element={
              <>
                <div className="mb-8 md:mb-12 py-8 md:px-0">
                  <h1 className="text-3xl md:text-4xl px-6 lg:text-5xl font-bold text-gray-900 mb-4">
                    Explore Our{" "}
                    <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                      Services
                    </span>
                  </h1>
                  <p className="text-gray-600 text-lg px-6 md:text-xl max-w-3xl">
                    Discover cutting-edge solutions designed to transform your
                    digital experience and drive innovation.
                  </p>
                </div>

                <div className="grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {cardsData.map((card) => (
                    <Card key={card.id} data={card} />
                  ))}
                </div>
              </>
            }
          />

          {/* Products Page - Table */}
          <Route
            path="/products"
            element={<ProductsTable products={productsData} />}
          />
        </Routes>
      </div>

      <div className="mt-12 md:mt-16 pb-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 DevShowcase. Built with React & Tailwind CSS.</p>
          <p className="mt-2">
            Demonstrating mobile-first responsive design best practices.
          </p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
