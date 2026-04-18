'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login/', { email, password });
      login(res.data.user, res.data.tokens.access, res.data.tokens.refresh);
      toast.success('Welcome back!');
      router.push('/');
    } catch {
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#faf8f5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link href="/" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>
  <div style={{
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem', fontWeight: 400,
    letterSpacing: '0.2em', textTransform: 'uppercase',
  }}>
    <span style={{ color: '#111' }}>BRAND </span>
    <span style={{ color: '#b8960c' }}>BAZAR</span>
  </div>
            <div style={{ width: '90px', height: '0.5px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '1.5px auto', display: 'block' }} />
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#b8960c', textAlign: 'center' }}>BY MIRSA</div>
</Link>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#b8960c',
            marginTop: '0.8rem',
          }}>
            Welcome Back
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{
              fontSize: '0.7rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#111',
              display: 'block', marginBottom: '0.5rem',
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                width: '100%', padding: '0.9rem 1.2rem',
                background: '#faf8f5',
                border: '1px solid rgba(196,169,125,0.3)',
                color: '#111', fontSize: '0.9rem',
                outline: 'none', fontFamily: 'Jost, sans-serif',
              }}
            />
          </div>

          <div>
            <label style={{
              fontSize: '0.7rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#111',
              display: 'block', marginBottom: '0.5rem',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '0.9rem 1.2rem',
                background: '#faf8f5',
                border: '1px solid rgba(196,169,125,0.3)',
                color: '#111', fontSize: '0.9rem',
                outline: 'none', fontFamily: 'Jost, sans-serif',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '1rem',
              background: loading ? '#b8960c' : '#111',
              color: '#faf8f5',
              fontSize: '0.78rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem', transition: 'background 0.3s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '1rem', margin: '2rem 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(196,169,125,0.3)' }} />
          <span style={{ fontSize: '0.72rem', color: '#b8960c', letterSpacing: '0.1em' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(196,169,125,0.3)' }} />
        </div>

        {/* Register link */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#7a6458' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" style={{
            color: '#b8960c', textDecoration: 'none', fontWeight: 500,
          }}>
            Create one
          </Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/" style={{
            fontSize: '0.72rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#b8960c',
            textDecoration: 'none',
          }}>
            {'← Back to Store'}
          </Link>
        </p>
      </div>
    </div>
  );
}