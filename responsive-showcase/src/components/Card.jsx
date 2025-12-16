/**
 * Card Component
 * 
 * ARCHITECTURE DECISIONS:
 * 1. Reusable component with props interface for flexibility
 * 2. Integrated ImageCarousel for visual appeal
 * 3. Category-based icon mapping for semantic meaning
 * 4. Hover effects for interactivity feedback
 * 5. Responsive layout: list view on mobile, card on desktop
 * 
 * DESIGN PATTERNS:
 * - Composition: Card uses ImageCarousel as a child component
 * - Props drilling: Data passed from parent for loose coupling
 * - Icon mapping: Strategy pattern for icon selection
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Horizontal layout (image | content)
 * - Tablet/Desktop: Vertical stacking within grid
 */
import { 
  FiCode, 
  FiLayout, 
  FiCloud, 
  FiBarChart2, 
  FiCpu, 
  FiShield,
  FiGitBranch,
  FiBox
} from 'react-icons/fi';
import ImageCarousel from './ImageCarousel';

const Card = ({ data }) => {
  /**
   * DECISION: Icon mapping based on category
   * WHY: Provides visual categorization, improves scannability
   * Easy to extend with new categories
   */
  const categoryIcons = {
    development: FiCode,
    design: FiLayout,
    cloud: FiCloud,
    analytics: FiBarChart2,
    ai: FiCpu,
    security: FiShield,
    blockchain: FiBox,
  };

  /**
   * DECISION: Category color mapping
   * WHY: Visual differentiation, brand consistency
   * Uses Tailwind's color palette for consistency
   */
  const categoryColors = {
    development: 'bg-blue-100 text-blue-600',
    design: 'bg-purple-100 text-purple-600',
    cloud: 'bg-sky-100 text-sky-600',
    analytics: 'bg-green-100 text-green-600',
    ai: 'bg-indigo-100 text-indigo-600',
    security: 'bg-red-100 text-red-600',
    blockchain: 'bg-amber-100 text-amber-600',
  };

  const CategoryIcon = categoryIcons[data.category] || FiGitBranch;
  const categoryColorClass = categoryColors[data.category] || 'bg-gray-100 text-gray-600';

  return (
    /**
     * DECISION: Mobile-first responsive layout
     * - Base: Flex row (list view) for mobile readability
     * - md: Flex column for card appearance on larger screens
     * 
     * DECISION: Hover effects and transitions
     * WHY: Provides feedback, indicates interactivity, modern feel
     */
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-row md:flex-col">
      
      {/* Image Carousel Section */}
      {/* DECISION: Fixed dimensions to maintain aspect ratio
       * Mobile: w-1/3 for list view balance
       * Desktop: Full width for card view */}
      <div className="w-1/3 md:w-full h-48 md:h-56 flex-shrink-0">
        <ImageCarousel images={data.images} alt={data.title} />
      </div>

      {/* Content Section */}
      {/* DECISION: Flex-1 to fill remaining space
       * Padding scales with screen size */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        
        {/* Header: Title and Category Icon */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {data.title}
            </h3>
            
            {/* Category Icon Badge */}
            {/* DECISION: Pill-shaped badge with icon
             * WHY: Compact, visually appealing, semantic */}
            <div className={`${categoryColorClass} p-2 rounded-full flex-shrink-0 ml-2`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Description */}
          {/* DECISION: Line-clamp for consistent card heights
           * WHY: Maintains grid alignment, prevents layout shifts */}
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3">
            {data.description}
          </p>
        </div>

        {/* Action Button */}
        {/* DECISION: Full-width on mobile, inline on desktop
         * Primary color with hover state for CTR optimization
         * Arrow icon indicates forward action (UX pattern) */}
        <button className="w-full md:w-auto mt-auto px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group/button">
          <span>Learn More</span>
          <svg
            className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
