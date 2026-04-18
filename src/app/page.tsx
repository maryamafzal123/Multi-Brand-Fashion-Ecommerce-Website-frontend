'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';
import api from '@/lib/axios';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState('all');

useEffect(() => {
  Promise.all([
    api.get('/api/products/'),
    api.get('/api/products/categories/'),
  ]).then(([productsRes, categoriesRes]) => {
    setProducts(productsRes.data.results || productsRes.data);
    setCategories(categoriesRes.data.results || categoriesRes.data);
  }).catch(() => {
    setProducts([]);
    setCategories([]);
  }).finally(() => setLoading(false));
}, []);

const filtered = filter === 'all'
  ? products
  : products.filter(p => p.category?.slug === filter);
  const marqueeItems = [
    'Nishat', '✦', 'Alkaram', '✦', 'Breeze', '✦',
    'Orient', '✦', 'Sapphire', '✦', 'Khaadi', '✦',
    'Free Delivery Over Rs.3000', '✦', 'COD Available', '✦',
    'Nationwide Delivery', '✦', '100% Authentic', '✦',
  ];

  return (
    <>
      <Navbar />
      <CartSidebar />
      <WhatsAppButton />
       {/* ── MARQUEE ── */}
      <div style={{ background: '#faf8f5', overflow: 'hidden', padding: '0.8rem 0', marginTop: '76px', borderTop: '0.5px solid rgba(184,150,12,0.2)', borderBottom: '0.5px solid rgba(184,150,12,0.2)' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              fontSize: '0.6rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#b8960c',
              padding: '0 2.5rem', flexShrink: 0,
            }}>{item}</span>
          ))}
        </div>
      </div>
      {/* ── HERO ── */}
      <section style={{
        paddingTop: '0',
        minHeight: 'auto',
        background: '#ffffff',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        overflow: 'hidden',
      }}>
        {/* Decorative gold gradient circles */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,150,12,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,150,12,0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />


        <div style={{
            padding: '3.5rem 8vw 5rem',
            width: '100%', maxWidth: '900px',
            animation: 'fadeUp 1s ease both',
            margin: '0 auto',
            textAlign: 'center',
          }}>
          {/* FIX 1 — Top label pushed down from navbar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
            marginBottom: '2rem',
            marginTop: '0',
          }}>
            <div style={{ width: '30px', height: '0.5px', background: '#b8960c' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#b8960c' }}>
              New Collection 2026
            </span>
            <div style={{ width: '30px', height: '0.5px', background: '#b8960c' }} />
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
            fontWeight: 300, color: '#111',
            letterSpacing: '0.04em', lineHeight: 1.08,
            marginBottom: '0.5rem',
          }}>
            Pakistan&apos;s Finest
          </h1>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#b8960c',
            letterSpacing: '0.04em', lineHeight: 1.08,
            marginBottom: '2rem',
          }}>
            Brand Collections
          </h1>

          {/* Gold rule */}
<div style={{ width: '200px', height: '1px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '1.5rem auto 2rem' }} />
          <p style={{
            fontSize: '0.88rem', color: '#777',
            letterSpacing: '0.08em', lineHeight: 1.9,
            marginBottom: '3rem', maxWidth: '440px',
            textAlign: 'center', margin: '0 auto 3rem',
          }}>
            Nishat · Alkaram · Breeze · Orient · Sapphire · Khaadi<br />
            Shop premium unstitched from Pakistan&apos;s top brands — curated, authentic, delivered to your door.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/products" className="btn-gold">Shop Now</Link>
            <Link href="/#about" className="btn-outline-gold">Our Story</Link>
          </div>

          {/* FIX 2 — Stats removed */}

        </div>
      </section>


      {/* ── NEW IN — Category Grid ── */}
      <section style={{ padding: '3rem 6vw', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5vw', alignItems: 'start' }}>
          <div>
            <div className="sec-tag">New Arrivals</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 300, color: '#111',
              letterSpacing: '0.04em', lineHeight: 1.2,
              marginBottom: '1.2rem',
            }}>
              Shop the<br />Latest Brands
            </h2>
            <div style={{ width: '40px', height: '0.5px', background: '#b8960c', marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.9, marginBottom: '2rem', letterSpacing: '0.03em' }}>
              Shop authentic unstitched collections from Pakistan&apos;s most loved brands — Nishat, Alkaram, Sapphire, Khaadi and more. All in one place.
            </p>
            <Link href="/products" style={{
              fontSize: '0.68rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#111',
              textDecoration: 'none',
              borderBottom: '0.5px solid #b8960c',
              paddingBottom: '3px',
            }}>View All Brands →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[
              { name: 'Lawn', sub: 'Summer Collection', bg: '#faf6f0' },
              { name: 'Embroidered', sub: 'Premium Range', bg: '#f5f0f8' },
              { name: 'Printed', sub: 'Everyday Wear', bg: '#f0f5f0' },
            ].map(cat => (
              <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: cat.bg, aspectRatio: '0.75',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.8rem', overflow: 'hidden',
                  border: '0.5px solid #f0ede8',
                  transition: 'all 0.3s', cursor: 'pointer',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#b8960c'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#f0ede8'; }}
                >
                  <div style={{ textAlign: 'center', opacity: 0.25 }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '3rem', fontWeight: 300, color: '#b8960c',
                    }}>
                      {cat.name.charAt(0)}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#111', marginBottom: '2px' }}>{cat.name}</div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#aaa' }}>{cat.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: '5rem 6vw 7rem', background: '#faf8f5' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="sec-tag">✦ &nbsp; Our Collection &nbsp; ✦</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 300, color: '#111',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>Shop by Brand</h2>
          {/* <div style={{ width: '60px', height: '0.5px', background: '#b8960c', margin: '1rem auto' }} /> */}
        </div>

        {/* Filters */}
         <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem', justifyContent: 'center' }}>
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn${filter === 'all' ? ' active' : ''}`}>
            All
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setFilter(cat.slug)}
              className={`filter-btn${filter === cat.slug ? ' active' : ''}`}>
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', fontSize: '0.68rem', letterSpacing: '0.25em', color: '#b8960c', textTransform: 'uppercase' }}>
            Loading collection...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: '#ccc', fontStyle: 'italic' }}>
              No products found
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link href="/products" className="btn-black">Shop All Brands</Link>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '7rem 6vw', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw', alignItems: 'center' }}>

          {/* FIX 3 — Left box: black background, gold BB */}
          <div style={{
            background: '#faf8f5',
            border: '0.5px solid rgba(184,150,12,0.3)',
            aspectRatio: '0.9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ textAlign: 'center', opacity: 0.25 }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '14rem', fontWeight: 300, color: '#b8960c',
                lineHeight: 1, letterSpacing: '-0.05em',
              }}>BB</div>
            </div>
            <div style={{
              position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem',
              borderTop: '0.5px solid rgba(184,150,12,0.25)', paddingTop: '1.2rem',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1rem', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.4)',
              }}>
                &quot;Every woman deserves the best brands.&quot;
              </p>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#b8960c', marginBottom: '1rem' }}>
              ✦ &nbsp; Our Story
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300, color: '#111',
              letterSpacing: '0.04em', lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}>
              Your Favourite Brands,<br />
              <span style={{ color: '#b8960c', fontStyle: 'italic' }}>One Destination</span>
            </h2>
            <div style={{ width: '50px', height: '0.5px', background: '#b8960c', marginBottom: '1.8rem' }} />
            <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.9, marginBottom: '2.5rem', letterSpacing: '0.03em' }}>
              Brand Bazar by Mirsa is Pakistan&apos;s curated fashion destination — bringing you authentic unstitched collections from the country&apos;s most loved brands. From Nishat&apos;s signature prints to Sapphire&apos;s premium clothes, from Alkaram&apos;s everyday elegance to Khaadi&apos;s iconic designs — we bring it all to your doorstep. No more running from store to store. Shop your favourite brands in one place, with guaranteed authenticity and nationwide delivery.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { title: '100% Authentic', desc: 'Direct from authorised dealers — every piece is genuine' },
                { title: 'All Top Brands', desc: 'Nishat, Breeze, Alkaram, Gul Ahmed, Sapphire, Khaadi & more' },
                { title: 'Nationwide Delivery', desc: 'Fast & reliable delivery across all of Pakistan — COD available' },
                { title: 'Easy Returns', desc: '7-day hassle-free returns — shop with complete confidence' },
              ].map(item => (
                <div key={item.title} style={{
                  display: 'flex', gap: '1rem',
                  borderBottom: '0.5px solid rgba(0,0,0,0.06)',
                  padding: '1rem 0',
                }}>
                  <span style={{ color: '#b8960c', fontSize: '0.7rem', marginTop: '0.2rem', flexShrink: 0 }}>✦</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', marginBottom: '0.25rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer style={{ background: '#111', borderTop: '0.5px solid rgba(184,150,12,0.2)', padding: '3.5rem 6vw 2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '0.95rem', fontWeight: 300,
        letterSpacing: '0.5em', lineHeight: 1,
      }}>
        <span style={{ color: '#fff' }}>BRAND</span>
        {' '}
        <span style={{ color: '#b8960c' }}>BAZAR</span>
      </div>
      <div style={{ width: '70px', height: '1px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '5px auto' }} />
      <div style={{ fontSize: '0.42rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#b8960c' }}>
        BY MIRSA
      </div>
    </div>
  );
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {[
  { label: 'Collection', href: '/products' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Orders', href: '/orders' },
].map(l => (
  <a key={l.label} href={l.href} style={{
  fontSize: '0.62rem', letterSpacing: '0.18em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
  cursor: 'pointer', transition: 'color 0.2s',
  textDecoration: 'none',
}}
  onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
>{l.label}</a>
))}
        </div>

        <div style={{
          borderTop: '0.5px solid #222', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
          fontSize: '0.62rem', letterSpacing: '0.1em', color: '#444',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026 Brand Bazar by Mirsa. All rights reserved.</div>
<div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>

{[
  { label: 'Instagram', href: 'https://www.instagram.com/brand.bazar_pk?igsh=a3JuMTltYjBocTRm', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )},
  { label: 'Facebook', href: 'https://facebook.com/brandbazarbymirsa', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )},
  { label: 'WhatsApp', href: 'https://wa.me/923336262574', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )},
  { label: 'TikTok', href: 'https://www.tiktok.com/@brandbazarbymirsa?_r=1&_t=ZS-95akcdXW7Pk', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )},
].map(s => (
  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
    style={{
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      cursor: 'pointer', transition: 'color 0.2s',
      color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
      fontSize: '0.62rem', letterSpacing: '0.1em',
    }}
    onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
  >
    {s.icon}
    {s.label}
  </a>
))}</div>

          <div style={{ color: 'rgba(255,255,255,0.5)' }}>Pakistan&apos;s Most Trusted Multi-Brand Fashion Store</div>        </div>
      </footer>
    </>
  );
}
