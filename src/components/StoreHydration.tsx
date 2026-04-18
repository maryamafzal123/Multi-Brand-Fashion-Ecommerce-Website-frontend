'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function StoreHydration() {
  useEffect(() => {
    // Wait for browser to load, then read localStorage
    useCartStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
  }, []);

  // This component renders nothing — it just fixes hydration
  return null;
}