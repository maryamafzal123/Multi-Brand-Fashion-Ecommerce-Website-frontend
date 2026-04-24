'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      toast.error('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/api/auth/register/', form);
      login(res.data.user, res.data.tokens.access, res.data.tokens.refresh);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err: unknown) {
      const error = err as { response?: { data?: Record<string, string[]> } };
      const msg = error.response?.data
        ? Object.values(error.response.data)[0][0]
        : 'Registration failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.2rem',
    background: '#faf8f5',
    border: '1px solid rgba(196,169,125,0.3)',
    color: '#111', fontSize: '0.9rem',
    outline: 'none', fontFamily: 'Jost, sans-serif',
  };

  const labelStyle = {
    fontSize: '0.7rem', letterSpacing: '0.18em',
    textTransform: 'uppercase' as const, color: '#111',
    display: 'block', marginBottom: '0.5rem',
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
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#b8960c', textAlign: 'center' }}>BY MIRSA</div>
          </Link>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#b8960c',
            marginTop: '0.8rem',
          }}>
            Create Account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              name="full_name"
              type="text"
              value={form.full_name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+92 300 0000000"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min 8 characters"
              style={inputStyle}
            />
            <p style={{
              fontSize: '0.7rem', color: '#999',
              marginTop: '0.4rem', letterSpacing: '0.05em',
            }}>
              Password must be at least 8 characters
            </p>
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input
              name="password2"
              type="password"
              value={form.password2}
              onChange={handleChange}
              required
              placeholder="Repeat password"
              style={inputStyle}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
       {/* Google Button */}
<button style={{ width: '100%', padding: '0.9rem', background: '#fff', border: '1px solid rgba(196,169,125,0.4)', color: '#111', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', fontFamily: 'Jost, sans-serif', marginTop: '1.5rem' }}>
  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
  Sign up with Google
</button>

{/* Divider */}
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
  <div style={{ flex: 1, height: '1px', background: 'rgba(196,169,125,0.3)' }} />
  <span style={{ fontSize: '0.72rem', color: '#b8960c', letterSpacing: '0.1em' }}>or sign in with email</span>
  <div style={{ flex: 1, height: '1px', background: 'rgba(196,169,125,0.3)' }} />
</div>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#7a6458' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{
            color: '#b8960c', textDecoration: 'none', fontWeight: 500,
          }}>
            Sign in
          </Link>
        </p>
<p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem', color: '#7a6458' }}>
  Just want to shop?{' '}
  <Link href="/cart" style={{ color: '#b8960c', textDecoration: 'none', fontWeight: 500 }}>
    Guest Checkout
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