import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useProject, DEFAULT_HERO_SLIDES, fixImageUrl, HERO_IMAGE_PRESETS } from '../context/ProjectContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenSuperAdmin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenSuperAdmin }) => {
  const { config } = useProject();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const rawSlides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : DEFAULT_HERO_SLIDES;

  // Make sure slide index safely stays in bounds if slides change
  const safeCurrentIndex = currentSlide >= rawSlides.length ? 0 : currentSlide;
  const activeSlideData = rawSlides[safeCurrentIndex] || rawSlides[0];

  const slides = rawSlides;

  // Title Font Size Class
  const getTitleSizeClass = (size?: string) => {
    switch (size) {
      case 'small':
        return 'text-2xl sm:text-3xl md:text-4xl';
      case 'large':
        return 'text-4xl sm:text-6xl md:text-7xl';
      case 'xlarge':
        return 'text-5xl sm:text-7xl md:text-8xl';
      case 'medium':
      default:
        return 'text-3xl sm:text-5xl md:text-6xl';
    }
  };

  // Subtitle Font Size Class
  const getSubtitleSizeClass = (size?: string) => {
    switch (size) {
      case 'small':
        return 'text-xs sm:text-sm md:text-base';
      case 'large':
        return 'text-lg sm:text-xl md:text-2xl';
      case 'xlarge':
        return 'text-xl sm:text-2xl md:text-3xl';
      case 'medium':
      default:
        return 'text-base sm:text-xl';
    }
  };

  // Alignment Class
  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'flex flex-col items-center text-center mx-auto';
      case 'right':
        return 'flex flex-col items-end text-right ml-auto';
      case 'left':
      default:
        return 'flex flex-col items-start text-left';
    }
  };

  // Font Family Class
  const getFontStyleClass = (fontStyle?: string) => {
    switch (fontStyle) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      case 'serif':
      default:
        return 'font-serif-heading';
    }
  };

  // Distinct animation motion trajectories per slide index or custom slide configuration
  const getSlideAnimationVariants = (slideIdx: number, slide?: any) => {
    let modeKey = slide?.animationStyle && slide.animationStyle !== 'auto' ? slide.animationStyle : null;
    let mode = slideIdx % 4;

    if (modeKey === 'staggered') mode = 0;
    else if (modeKey === 'cascade') mode = 1;
    else if (modeKey === 'diagonal') mode = 2;
    else if (modeKey === 'spring') mode = 3;

    switch (mode) {
      case 0:
        // Slide 1: Badge drops from Top, Title slides from Far Left, Subtitle slides from Far Right
        return {
          badge: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } },
          title: { initial: { opacity: 0, x: -90, y: 0 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { duration: 0.65, delay: 0.1, type: 'spring', stiffness: 80 } },
          subtitle: { initial: { opacity: 0, x: 90, y: 0 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { duration: 0.7, delay: 0.25, type: 'spring', stiffness: 75 } },
          actions: { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.38 } },
          motionLabel: 'Horizontal Staggered Motion',
        };
      case 1:
        // Slide 2: Badge slides from Left, Title slides down from Top, Subtitle slides up from Bottom
        return {
          badge: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.45 } },
          title: { initial: { opacity: 0, y: -65, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.6, delay: 0.12, ease: 'easeOut' } },
          subtitle: { initial: { opacity: 0, y: 55 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65, delay: 0.28, ease: 'easeOut' } },
          actions: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, delay: 0.4 } },
          motionLabel: 'Top & Bottom Cascade Motion',
        };
      case 2:
        // Slide 3: Badge pops up with scale, Title slides in diagonally from Top-Left, Subtitle slides in diagonally from Bottom-Right
        return {
          badge: { initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: 0.5 } },
          title: { initial: { opacity: 0, x: -70, y: -35 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { duration: 0.65, delay: 0.15, ease: 'backOut' } },
          subtitle: { initial: { opacity: 0, x: 70, y: 35 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { duration: 0.7, delay: 0.3, ease: 'backOut' } },
          actions: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.55, delay: 0.42 } },
          motionLabel: 'Diagonal Cross-Slide Motion',
        };
      case 3:
      default:
        // Slide 4: Badge slides from Right, Title slides up from Bottom with spring, Subtitle slides in from Left
        return {
          badge: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 } },
          title: { initial: { opacity: 0, y: 70 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1, type: 'spring', damping: 15 } },
          subtitle: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.65, delay: 0.28 } },
          actions: { initial: { opacity: 0, y: -25 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 } },
          motionLabel: 'Spring Rise & Slide-In Motion',
        };
    }
  };

  const anim = getSlideAnimationVariants(safeCurrentIndex, activeSlideData);

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const photoOpacity = config.heroPhotoOpacity ?? 0.7;

  // Compute dynamic gradient overlay strength based on photo opacity
  // When photo opacity is high (e.g. 0.8 - 1.0), overlay becomes lighter so photo is crystal clear
  const topGradientOpacity = Math.max(0.1, 0.6 - (photoOpacity - 0.5) * 0.8);
  const sideGradientOpacity = Math.max(0.15, 0.7 - (photoOpacity - 0.5) * 0.8);

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[88vh] pt-32 sm:pt-36 pb-16 flex items-center bg-[#031021] text-white overflow-hidden border-b-4 border-[#D4AF37]"
    >
      {/* Background Hero Image Slider with Smooth Fade and High Photo Clarity */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{ opacity: index === safeCurrentIndex ? photoOpacity : 0 }}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === safeCurrentIndex ? 'scale-100' : 'scale-105 pointer-events-none'
            }`}
          >
            <img
              src={fixImageUrl(slide.image, index)}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter contrast-100 brightness-100"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                const fallback = HERO_IMAGE_PRESETS[index % HERO_IMAGE_PRESETS.length];
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
            />
          </div>
        ))}
        {/* Dynamic Gradient Overlays */}
        <div
          style={{ opacity: topGradientOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#031021] via-[#031021]/50 to-transparent transition-opacity duration-500 pointer-events-none"
        ></div>
        <div
          style={{ opacity: sideGradientOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-[#031021]/80 via-[#031021]/30 to-transparent transition-opacity duration-500 pointer-events-none"
        ></div>
      </div>

      {/* Kenya Flag Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#08783D] via-[#B51D28] to-[#0A4D8C] z-20"></div>

      {/* Left / Right Floating Navigation Arrows on Photo Slider */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#051A33]/80 hover:bg-[#D4AF37] hover:text-[#051A33] text-white border border-[#D4AF37]/50 transition-all shadow-2xl backdrop-blur-sm cursor-pointer hover:scale-110"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#051A33]/80 hover:bg-[#D4AF37] hover:text-[#051A33] text-white border border-[#D4AF37]/50 transition-all shadow-2xl backdrop-blur-sm cursor-pointer hover:scale-110"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full py-8">
        <div className={`max-w-4xl space-y-6 ${getAlignClass(config.heroTextAlign)}`}>
          
          {/* Main Title - Slides distinctly per slide */}
          <motion.h1
            key={`title-${safeCurrentIndex}`}
            initial={anim.title.initial}
            animate={anim.title.animate}
            transition={anim.title.transition}
            className={`${getFontStyleClass(config.heroFontStyle)} ${getTitleSizeClass(
              config.heroTitleFontSize
            )} font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-lg`}
          >
            {activeSlideData.title}
          </motion.h1>

          {/* Subtitle - Slides distinctly with staggered motion */}
          <motion.p
            key={`sub-${safeCurrentIndex}`}
            initial={anim.subtitle.initial}
            animate={anim.subtitle.animate}
            transition={anim.subtitle.transition}
            className={`${getSubtitleSizeClass(
              config.heroSubtitleFontSize
            )} text-[#F5F7FA] font-normal leading-relaxed max-w-3xl drop-shadow-md`}
          >
            {activeSlideData.subtitle}
          </motion.p>

          {/* Clean minimal slide indicators */}
          {slides.length > 1 && (
            <div className="pt-6 border-t border-white/15 flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-8 bg-[#D4AF37]'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

