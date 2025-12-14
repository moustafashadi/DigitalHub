import React, { useEffect, useRef, useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { navigationTabs, userMenuItems } from "../mockData";

const Navbar = ({ activeTab, onTabChange}) => {
  // State management for UI interactions
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const userMenuButtonRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const searchInputRef = useRef(null);

  /**
   * DECISION: Icon mapping object
   * WHY: Maintains consistency between data and UI components,
   * makes it easy to add/change icons without modifying multiple places
   */
  const iconMap = {
    user: FiUser,
    settings: FiSettings,
    logout: FiLogOut,
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (isUserMenuOpen) {
          setIsUserMenuOpen(false);
          userMenuButtonRef.current?.focus();
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          mobileMenuButtonRef.current?.focus();
        }
        if (isSearchExpanded) {
          setIsSearchExpanded(false);
          searchInputRef.current?.blur();
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isUserMenuOpen, isMobileMenuOpen, isSearchExpanded]);

  useEffect(() => {
    if (isUserMenuOpen && userMenuRef.current) {
      const firstItem = userMenuRef.current.querySelector("button");
      firstItem?.focus();
    }
  }, [isUserMenuOpen]);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleUserMenuKeyDown = (e, index) => {
    const menuItems = userMenuRef.current?.querySelectorAll("button");
    if (!menuItems) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = (index + 1) % menuItems.length;
        menuItems[nextIndex]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
        menuItems[prevIndex]?.focus();
        break;
      case "Home":
        e.preventDefault();
        menuItems[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        menuItems[menuItems.length - 1]?.focus();
        break;
      case "Tab":
        // Allow default Tab behavior but close menu
        setIsUserMenuOpen(false);
        break;
      default:
        break;
    }
  };

  /**
   * DECISION: Toggle handlers instead of direct state setters
   * WHY: Provides flexibility to add side effects (analytics, etc.) later
   * Follows single responsibility principle
   */
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);

  const handleTabClick = (tabLabel) => {
    const normalizedTab = tabLabel.toLowerCase();
    onTabChange(normalizedTab)
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          {/* DECISION: Flex-shrink-0 prevents logo from shrinking on small screens */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleTabClick("home")}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent"
              aria-label="DevShowCase home"
            >
              DevShowcase
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          {/* DECISION: Hidden on mobile (md:flex), saves space for mobile-first design */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.label.toLowerCase()
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                role="menuitem"
                aria-current={activeTab === tab.label.toLowerCase() ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar and User Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            {/* DECISION: Conditional rendering based on screen size and state
             * Mobile: Icon that expands to full-width search
             * Desktop: Always visible search input */}
            <div className="relative">
              {/* Mobile Search Icon */}
              <button
                onClick={toggleSearch}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                aria-label={isSearchExpanded ? "Close search" : "Search"}
                aria-expanded={isSearchExpanded}
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Desktop Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="desktop-search"
                    type="search"
                    aria-label="Search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* User Menu */}
            {/* DECISION: Relative positioning for dropdown portal
             * Using backdrop onClick to close dropdown (UX best practice) */}
            <div className="relative">
              <button
                ref={userMenuButtonRef}
                onClick={toggleUserMenu}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <FiUser className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {/* DECISION: Absolute positioning with proper z-index
               * Smooth animations with origin-top-right for natural feel */}
              {isUserMenuOpen && (
                <>
                  {/* Invisible backdrop to close dropdown when clicking outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    ref={userMenuRef}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 origin-top-right animate-fadeIn"
                  >
                    {userMenuItems.map((item) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <button
                          key={item.id}
                          role="menuitem"
                          onKeyDown={(e) =>
                            handleUserMenuKeyDown(
                              e,
                              userMenuItems.indexOf(item)
                            )
                          }
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            {/* DECISION: Only visible on mobile, uses hamburger/X icon pattern */}
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Expanded) */}
        {/* DECISION: Separate mobile search that slides down
         * Maintains clean UI when not in use */}
        {isSearchExpanded && (
          <div className="md:hidden pb-3 animate-slideDown">
            <div className="relative">
              <label htmlFor="mobile-search" className="sr-only">
                Search
              </label>
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="search"
                id="mobile-search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-label="Search"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu - Overlay */}
      {/* DECISION: Absolute positioning to overlay content
       * Backdrop to close menu when clicking outside
       * WHY: Prevents layout shift, better UX on mobile */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden animate-slideDown"
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="py-2 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.label)}
                  className={`w-full text-left px-4 py-3 text-base font-medium transition-colors ${
                    activeTab === tab.label.toLowerCase()
                      ? "bg-primary-50 text-primary-600 border-l-4 border-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  }`}
                  role="menuitem"
                  aria-current={activeTab === tab.label.toLowerCase() ? "page" : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
