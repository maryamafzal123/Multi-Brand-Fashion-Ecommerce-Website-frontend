'use client';

import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <WhatsAppButton />

      <div style={{
  minHeight: '100vh',
  background: '#faf8f5',
}}>
  {/* Header */}
  <div style={{ paddingTop: '72px', background: '#fff', borderBottom: '0.5px solid #e8e4de' }}>
          <div style={{ padding: '4rem 6vw 4rem' }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 3vw, 3rem)',
              fontWeight: 300, color: '#111',
              letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Contact Us
            </h1>
            {/* <div style={{ width: '200px', height: '0.7px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '0.8rem 0 0' }} /> */}
          </div>
        </div>

        {/* Content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '6rem 6vw', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 300, color: '#111',
            letterSpacing: '0.04em', lineHeight: 1.4,
            marginBottom: '2rem', maxWidth: '600px',
          }}>
            To get in touch with us, please contact our official WhatsApp number
          </p>

          {/* <div style={{ width: '60px', height: '0.5px', background: '#b8960c', margin: '0 auto 2rem' }} /> */}

          <p style={{
            fontSize: '0.9rem', color: '#666',
            lineHeight: 1.9, marginBottom: '3rem',
            maxWidth: '500px', letterSpacing: '0.03em',
          }}>
            For order updates or any concerns regarding the quality of your received order,
            please contact us on our official WhatsApp number: <strong>+92 333 2742727</strong>.
            Our standard response time is up to 48 hours. We appreciate your patience
            and will assist you as promptly as possible.
          </p>

          <a
            href="https://wa.me/923332742727"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-black"
          >
            💬 Contact Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', borderTop: '0.5px solid rgba(184,150,12,0.2)', padding: '2rem 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>Pakistan&#39;s Most Trusted Multi-Brand Fashion Store</div>
      </footer>
    </>
  );
}