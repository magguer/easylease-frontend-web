'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  // Handle ESC key and arrow keys for fullscreen navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (fullscreenIndex === null) return;

      if (event.key === 'Escape') {
        setFullscreenIndex(null);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const newIndex = fullscreenIndex > 0 ? fullscreenIndex - 1 : images.length - 1;
        setFullscreenIndex(newIndex);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        const newIndex = fullscreenIndex < images.length - 1 ? fullscreenIndex + 1 : 0;
        setFullscreenIndex(newIndex);
      }
    };

    if (fullscreenIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-gray-400 text-center">
          <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
          </svg>
          <p>Sin imágenes disponibles</p>
        </div>
      </div>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute' as const,
      inset: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: 'absolute' as const,
      inset: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute' as const,
      inset: 0
    })
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      {/* Desktop Layout: Thumbnails on left */}
      <div className="hidden md:flex gap-4">
        {/* Thumbnails Sidebar */}
        <div className="flex flex-col gap-2 w-20 flex-shrink-0">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image}
                alt={`${title} - Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Main Image */}
        {/* Main Image */}
                {/* Main Image */}
        <div className="flex-1 relative min-h-[400px] md:min-h-[500px]">
          <div className="w-full h-full rounded-lg bg-gray-100 relative overflow-hidden flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full h-full absolute inset-0 cursor-pointer"
                onClick={() => setFullscreenIndex(currentIndex)}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - Imagen principal`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-10"
                aria-label="Imagen anterior"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-10"
                aria-label="Imagen siguiente"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </motion.button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Layout: Thumbnails below */}
      <div className="md:hidden w-full">
        {/* Main Image Container with Navigation */}
        <div className="relative mb-4 w-full">
          {/* Main Image */}
          <div className="aspect-[16/10] min-h-[280px] sm:min-h-[320px] rounded-lg bg-gray-100 relative overflow-hidden w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full h-full absolute inset-0 cursor-pointer"
                onClick={() => setFullscreenIndex(currentIndex)}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - Imagen principal`}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Outside the image container */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 z-20"
                aria-label="Imagen anterior"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 z-20"
                aria-label="Imagen siguiente"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </motion.button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}
        </div>

        {/* Thumbnails Row */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image}
                alt={`${title} - Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setFullscreenIndex(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen p-2 sm:p-4">
            {/* Close Button */}
            <button
              onClick={() => setFullscreenIndex(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Fullscreen Image */}
            <div className="w-full h-full relative overflow-hidden rounded-lg">
              <AnimatePresence initial={false}>
                <motion.div
                  key={fullscreenIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full absolute inset-0"
                >
                  <Image
                    src={images[fullscreenIndex]}
                    alt={`${title} - Imagen ${fullscreenIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = fullscreenIndex! > 0 ? fullscreenIndex! - 1 : images.length - 1;
                    setFullscreenIndex(newIndex);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 sm:p-3 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = fullscreenIndex! < images.length - 1 ? fullscreenIndex! + 1 : 0;
                    setFullscreenIndex(newIndex);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 sm:p-3 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </>
            )}

            {/* Fullscreen Thumbnails - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenIndex(index);
                  }}
                  className={`relative w-12 h-12 rounded border-2 transition-all ${
                    index === fullscreenIndex
                      ? 'border-white ring-2 ring-white/50'
                      : 'border-white/50 hover:border-white'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} - Miniatura ${index + 1}`}
                    fill
                    className="object-cover rounded"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>

            {/* Mobile Thumbnails - Bottom row for mobile */}
            <div className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 max-w-[90vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenIndex(index);
                  }}
                  className={`relative flex-shrink-0 w-8 h-8 rounded border-2 transition-all ${
                    index === fullscreenIndex
                      ? 'border-white ring-1 ring-white/50'
                      : 'border-white/50 hover:border-white'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} - Miniatura ${index + 1}`}
                    fill
                    className="object-cover rounded"
                    sizes="32px"
                  />
                </button>
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
              {fullscreenIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}