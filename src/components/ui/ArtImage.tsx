'use client';

/**
 * ArtImage — Reusable artwork image component with referrer policy fix
 *
 * Wikimedia Commons and some museum APIs block hotlinking via CSS background-image.
 * This component uses an <img> tag with referrerPolicy="no-referrer" to bypass this.
 * Falls back to a gradient placeholder if the image fails to load.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Full resolution
 * - Landscape (568-1023px): Same behavior
 * - Portrait (320-567px): Lazy loading prioritized
 */

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface ArtImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Extra classes for the wrapper div */
  wrapperClassName?: string;
  /** Show a colored gradient fallback instead of generic gray */
  fallbackColor?: string;
  onClick?: () => void;
}

export function ArtImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackColor,
  onClick,
}: ArtImageProps) {
  const [failed, setFailed] = useState(false);

  const handleError = useCallback(() => {
    setFailed(true);
  }, []);

  return (
    <div
      className={cn('relative overflow-hidden', wrapperClassName)}
      onClick={onClick}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          loading="lazy"
          onError={handleError}
          className={cn('h-full w-full object-cover', className)}
        />
      ) : (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center',
            fallbackColor
              ? ''
              : 'bg-gradient-to-br from-art-charcoal/15 to-art-charcoal/35 dark:from-white/5 dark:to-white/15'
          )}
          style={fallbackColor ? { background: `linear-gradient(135deg, ${fallbackColor}30, ${fallbackColor}60)` } : undefined}
        >
          <svg
            className="h-8 w-8 text-white/20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6z" />
            <circle cx="8.5" cy="8.5" r="2.5" />
            <path d="m6 21 6-6 4 4 2.5-2.5L22 20" />
          </svg>
        </div>
      )}
    </div>
  );
}
