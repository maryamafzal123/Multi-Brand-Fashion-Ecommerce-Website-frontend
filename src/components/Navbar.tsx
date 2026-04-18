'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { getTotalItems, toggleCart } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  const handleLogout = () => { logout(); router.push('/'); };

  const TextLogo = ({ large = false }: { large?: boolean }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: large ? '1.1rem' : '0.95rem', fontWeight: 300, letterSpacing: '0.5em', lineHeight: 1 }}>
        <span style={{ color: '#fff' }}>BRAND</span>{' '}<span style={{ color: '#b8960c' }}>BAZAR</span>
      </div>
      <div style={{ width: '70px', height: '0.5px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '5px auto' }} />
      <div style={{ fontSize: '0.42rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#b8960c' }}>BY MIRSA</div>
    </div>
  );

  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/brand.bazar_pk?igsh=a3JuMTltYjBocTRm', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
    { label: 'Facebook', href: 'https://facebook.com/brandbazarbymirsa', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { label: 'WhatsApp', href: 'https://wa.me/923336262574', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { label: 'TikTok', href: 'https://www.tiktok.com/@brandbazarbymirsa?_r=1&_t=ZS-95akcdXW7Pk', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  ];

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, background: '#0a0a0a', borderBottom: '0.5px solid rgba(184,150,12,0.2)' }}>
      <style>{`
        .nb-desktop { display: flex; }
        .nb-mobile-login { display: none; }
        @media (max-width: 767px) {
          .nb-desktop { display: none !important; }
          .nb-mobile-login { display: flex !important; }
          .nb-logo { position: absolute; left: 50%; transform: translateX(-50%); }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4vw', height: '68px', position: 'relative' }}>

        {/* LEFT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', flexShrink: 0 }}>
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#b8960c' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#b8960c' }} />
            <span style={{ display: 'block', width: '14px', height: '1px', background: '#b8960c' }} />
          </button>
          <div className="nb-desktop" style={{ gap: '2rem' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Shop Brands', href: '/products' }, { label: 'About', href: '/#about' }, { label: 'Contact', href: '/contact' }].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        {/* CENTER LOGO */}
        <Link href="/" className="nb-logo" style={{ textDecoration: 'none', textAlign: 'center', flexShrink: 0 }}>
          {!logoError ? (
            <Image src="/logo.png" alt="Brand Bazar by Mirsa" width={140} height={50} style={{ objectFit: 'contain', maxHeight: '50px' }} onError={() => setLogoError(true)} priority />
          ) : <TextLogo />}
        </Link>

        {/* RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1, justifyContent: 'flex-end' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>

          {/* Desktop auth */}
          <div className="nb-desktop" style={{ alignItems: 'center', gap: '1rem' }}>
            {mounted && isAuthenticated ? (
              <>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>{user?.full_name.split(' ')[0]}</span>
                <Link href="/orders" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Orders</Link>
                <button onClick={handleLogout} style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8960c', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
              </>
            ) : (
              <Link href="/auth/login"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></Link>
            )}
          </div>

          {/* Mobile login icon */}
          <div className="nb-mobile-login" style={{ alignItems: 'center' }}>
            <Link href="/auth/login" style={{ display: 'flex' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></Link>
          </div>

          <button onClick={toggleCart} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {mounted && getTotalItems() > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-7px', background: '#b8960c', color: '#fff', fontSize: '0.52rem', fontWeight: 600, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{getTotalItems()}</span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 98 }} />}

      {/* Slide-out menu */}
      <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 'min(300px, 85vw)', background: '#0a0a0a', zIndex: 99, borderRight: '0.5px solid rgba(184,150,12,0.2)', transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.35s ease', padding: '2rem', overflowY: 'auto' }}>
        <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b8960c', fontSize: '1.2rem', marginBottom: '2.5rem' }}>✕</button>
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '0.5px solid rgba(184,150,12,0.2)' }}>
          {!logoError ? <Image src="/logo.png" alt="Brand Bazar by Mirsa" width={130} height={46} style={{ objectFit: 'contain' }} onError={() => setLogoError(true)} /> : <TextLogo large />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[{ label: 'Home', href: '/' }, { label: "Women's Collection", href: '/products' }, { label: 'Top Brands', href: '/products' }, { label: 'About Us', href: '/#about' }, { label: 'Contact', href: '/contact' }].map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', padding: '1rem 0', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >{l.label}</Link>
          ))}
          {mounted && isAuthenticated ? (
            <>
              <Link href="/orders" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', padding: '1rem 0', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>Orders</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8960c', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 0', textAlign: 'left', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>Logout</button>
            </>
          ) : (
            <Link href="/auth/login" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8960c', textDecoration: 'none', padding: '1rem 0', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>Login / Register</Link>
          )}
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
          <div style={{ borderTop: '0.5px solid rgba(184,150,12,0.2)', paddingTop: '1.2rem' }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Follow Us</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >{s.icon}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
