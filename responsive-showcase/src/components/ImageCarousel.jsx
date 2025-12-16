import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';



/**
 * error handling flow:
 * 1. when an image fails to load, onError fires
 * 2. this triggers the handleImageError function, which adds the index to the failedImages set
 * 3. the component re-renders and getImageSource returns the DEFAULT_IMAGE for that index
 */

const ImageCarousel = ({ images, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [failedImages, setFailedImages] = useState(new Set());
    const [isFocused, setIsFocused] = useState(false);

    const DEFAULT_IMAGE = 'https://static.thenounproject.com/png/504708-200.png';

    /**
     * DECISION: Auto-play with pause on hover
     * WHY: Improves UX by allowing users to view images without manual control,
     * but gives them control when they need it
     * Cleanup prevents memory leaks when component unmounts
     */
    useEffect(() => {
        if (!isHovered && !isFocused && images.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 4000); // 4 second intervals

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [currentIndex, isHovered, images.length, isFocused]);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                goToPrevious(e);
                break;
            case 'ArrowRight':
                e.preventDefault();
                goToNext(e);
                break;
            case 'home':
                e.preventDefault();
                setCurrentIndex(0);
                break;
            case 'end':
                e.preventDefault();
                setCurrentIndex(images.length - 1);
                break;
            default:
                break;
        }
    }

    /**
     * Navigation handlers with boundary checks
     * DECISION: Circular navigation (wraps around)
     * WHY: Better UX, no dead ends
     */
    const goToPrevious = (e) => {
        e.stopPropagation(); // Prevent card click event
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = (e) => {
        e.stopPropagation(); // Prevent card click event
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToSlide = (index, e) => {
        e.stopPropagation(); // Prevent card click event
        setCurrentIndex(index);
    };

    const handleImageError = (index) => {
        setFailedImages(prev => new Set([...prev, index]));
    }

    const getImageSource = (image, index) => { //single source of truth for determining which image to show
        return failedImages.has(index) ? DEFAULT_IMAGE : image;
    }

    return (
        //a screen reader is a tool that helps visually impaired users to navigate and interact with web content
        //aria labels provide context for screen readers
        //aria-live notifies screen readers of dynamic content changes
        <div
            className="relative w-full h-full group overflow-hidden rounded-l-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label={`Image Carousel for ${alt}`}
            aria-live="polite"
            aria-atomic="true"
        >
            {/* Images Container */}
            {/* DECISION: CSS transforms instead of display:none
       * WHY: Better performance, smooth transitions, maintains layout */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            aria-hidden={index !== currentIndex}
                    >
                        <img
                            src={getImageSource(image, index)}
                            alt={`${alt} - Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy" // Performance optimization
                            onError={() => handleImageError(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {/* DECISION: Show on hover for clean UI, always visible on mobile
       * WHY: Discoverability on desktop, immediate access on mobile */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-200 z-10"
                        aria-label="Previous image"
                        tabIndex={-1}
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-200 z-10"
                        aria-label="Next image"
                        tabIndex={-1}
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Indicator Dots */}
            {/* DECISION: Visual feedback for current slide
       * WHY: Industry standard, improves navigation clarity */}
            {images.length > 1 && (
                <div
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
                    role="tablist"
                    aria-label='Slide navigation'
                >
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => goToSlide(index, e)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                                ? 'bg-white w-6'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            role="tab"
                            aria-selected={index === currentIndex}
                            tabIndex={-1}
                        />
                    ))}
                </div>
            )}

            <div className='sr-only' aria-live='polite' aria-atomic='true'>
                Slide {currentIndex + 1} of {images.length}
            </div>

            {/* Loading Overlay (optional enhancement) */}
            {/* Could add skeleton loader here for better perceived performance */}
        </div>
    );
};

export default ImageCarousel;
