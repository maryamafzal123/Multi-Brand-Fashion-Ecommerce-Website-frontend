'use client';

import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface Props { product: Product; index?: number; }

const isVideo = (url: string) => /\.(mp4|mov|avi|webm|mkv)$/i.test(url);

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCartStore();
const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();
  if (!product.in_stock) {
    toast.error('This item is out of stock!');
    return;
  }
const added = addItem(product);
if (added) {
  toast.success(`${product.name} added to bag`);
} else {
  const stock = product.stock ?? 0;
  if (stock <= 0) {
    toast.error('This item is out of stock!');
  } else {
    toast.error(`Max quantity reached! Only ${stock} available.`);
  }
}
};

  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff',
        cursor: 'pointer',
        animation: `fadeUp 0.6s ease both`,
        animationDelay: `${index * 0.06}s`,
        border: '0.5px solid #f0ede8',
        transition: 'all 0.3s',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '#d4b44a';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '#f0ede8';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Image / Video */}
        <div style={{
          aspectRatio: '0.8', position: 'relative', overflow: 'hidden',
          background: '#faf8f5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {product.primary_image ? (
            isVideo(product.primary_image) ? (
              <video
                src={product.primary_image}
                muted
                loop
                playsInline
                autoPlay
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Image
                src={product.primary_image}
                alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.05)')}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
              />
            )
          ) : (
            <span style={{ fontSize: '4rem', opacity: 0.25 }}>👗</span>
          )}

          {/* Badges */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {product.discount_percent > 0 && (
              <span style={{
                background: '#111', color: '#b8960c',
                fontSize: '0.58rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', padding: '3px 8px',
              }}>-{product.discount_percent}%</span>
            )}
            {!product.in_stock && (
              <span style={{
                background: '#888', color: '#fff',
                fontSize: '0.58rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', padding: '3px 8px',
              }}>Sold Out</span>
            )}
            {product.is_featured && product.in_stock && product.discount_percent === 0 && (
              <span style={{
                background: '#b8960c', color: '#fff',
                fontSize: '0.58rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', padding: '3px 8px',
              }}>New</span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="card-overlay" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(17,17,17,0.88)',
            padding: '1rem', textAlign: 'center',
            transform: 'translateY(100%)',
            transition: 'transform 0.3s',
          }}>
            <button onClick={handleAddToCart} disabled={!product.in_stock} style={{
              background: 'none', border: '0.5px solid #b8960c',
              color: '#b8960c', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '0.6rem 1.5rem', cursor: product.in_stock ? 'pointer' : 'not-allowed',
              width: '100%', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget.style.background = '#b8960c'); (e.currentTarget.style.color = '#fff'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = 'none'); (e.currentTarget.style.color = '#b8960c'); }}
            >
              {product.in_stock ? 'Add to Bag' : 'Sold Out'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
          {product.category && (
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8960c', marginBottom: '0.35rem' }}>
              {product.category.name}
            </div>
          )}
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(0.72rem, 2vw, 0.88rem)', fontWeight: 400, color: '#111',
            marginBottom: '0.5rem', letterSpacing: '0.02em',
          }}>
            {product.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#111', fontWeight: 500 }}>
              Rs. {Number(product.price).toLocaleString()}
            </span>
            {product.old_price && (
              <span style={{ fontSize: '0.78rem', color: '#bbb', textDecoration: 'line-through' }}>
                Rs. {Number(product.old_price).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        div:hover .card-overlay { transform: translateY(0) !important; }
      `}</style>
    </Link>
  );
}