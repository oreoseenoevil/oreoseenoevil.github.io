import { FC, useEffect } from 'react';
import { initCatCompanion } from './catCompanionEngine';

/**
 * Wandering companion cat easter egg — a tiny top-down silhouette that
 * wanders the viewport, chases the cursor (NEAR 210 / FAR 340 hysteresis,
 * STOP 34), goes aloof, and sits / grooms / dozes when idle.
 * Renders no JSX of its own: the engine mounts a fixed, pointer-events-none
 * element on document.body once on mount and fully cleans up on unmount.
 * Disabled on touch-only devices and under prefers-reduced-motion.
 */
export const CatCompanion: FC = () => {
  useEffect(() => initCatCompanion(), []);

  return null;
};
