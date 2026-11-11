"use client";

import { useSyncExternalStore } from 'react';

/**
 * False during server render and the first client render, true afterwards.
 * Use it before showing anything read from localStorage (like the cart),
 * so the server HTML and the first browser render match.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
