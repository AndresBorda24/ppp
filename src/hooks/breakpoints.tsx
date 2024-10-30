import { useState, useEffect } from "react";

const BreakPoints = {
  'sm': "(min-width: 640px)",
  'md': "(min-width: 768px)",
  'lg': "(min-width: 1024px)",
  'xl': "(min-width: 1280px)",
  '2xl': "(min-width: 1536px)"
} as const;

type BreakPointsType = keyof typeof BreakPoints;

export function useBreakpoint(breakpoint: BreakPointsType) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(BreakPoints[breakpoint]);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };

  }, []);

  return matches;
}
