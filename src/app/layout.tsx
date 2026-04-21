import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StoreHydration from '@/components/StoreHydration';

const jost = Jost({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: "Brand Bazar — Premium Women's Unstitched",
  description:
    "Premium women's unstitched fabric — Lawn, Embroidered, Printed, Linen & Chiffon. Delivered across Pakistan.",

  openGraph: {
    title: "Brand Bazar — Premium Women's Unstitched",
    description:
      "Premium women's unstitched fabric — Lawn, Embroidered, Printed, Linen & Chiffon.",
    url: "https://brandbazarbymirsa.com",
    siteName: "Brand Bazar",
    images: [
      {
        url: "/og-image.jpeg", // IMPORTANT
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Brand Bazar",
    description: "Premium women's unstitched collection",
    images: ["/og-image.png"],
  },
};