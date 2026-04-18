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
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '1rem', margin: '2rem 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(196,169,125,0.3)' }} />
          <span style={{ fontSize: '0.72rem', color: '#b8960c', letterSpacing: '0.1em' }}>or</span>
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