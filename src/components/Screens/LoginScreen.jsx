import React, { useState } from 'react';
import { ShoppingCart, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';

export function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginScreen({ onLogin, onLoginGoogle, onOfflineMode, onForgotPassword }) {
  const [email, setEmail] = useState('fakhri@email.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email });
  };

  return (
    <div className="auth-screen">
      {/* Brand Icon & Name with comfortable spacing */}
      <div className="auth-logo-circle">
        <ShoppingCart size={38} strokeWidth={2.4} />
      </div>

      <h1 className="auth-brand-name">ListBelanja</h1>

      <div className="auth-welcome-text">Selamat Datang 👋</div>
      <p className="auth-subtitle">
        Masuk untuk mulai mengatur belanja.
      </p>

      {/* Email / Password Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email-input">Email</label>
          <div className="input-container">
            <span className="input-icon">
              <Mail size={18} strokeWidth={1.8} />
            </span>
            <input
              id="email-input"
              type="email"
              className="text-input"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password-input">Password</label>
          <div className="input-container">
            <span className="input-icon">
              <Lock size={18} strokeWidth={1.8} />
            </span>
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              className="text-input"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="input-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" id="btn-login-submit" className="btn-primary-green" style={{ marginTop: '4px' }}>
          Masuk
        </button>

        <a
          href="#forgot-password"
          className="forgot-password-link"
          onClick={(e) => {
            e.preventDefault();
            if (onForgotPassword) onForgotPassword();
          }}
        >
          Lupa password?
        </a>
      </form>

      {/* Divider */}
      <div className="auth-divider" style={{ margin: '16px 0 12px' }}>
        <span>atau</span>
      </div>

      {/* Google Sign-In Button (Now placed below Lupa Password) */}
      <button
        type="button"
        id="btn-google-login"
        className="btn-google"
        onClick={onLoginGoogle}
      >
        <GoogleLogo />
        <span>Lanjutkan dengan Google</span>
      </button>

      {/* Divider */}
      <div className="auth-divider" style={{ margin: '14px 0 10px' }}>
        <span>atau tanpa akun</span>
      </div>

      {/* Mode Offline Button with compact icon */}
      <div className="offline-action-box">
        <button
          type="button"
          id="btn-offline-mode"
          className="btn-offline"
          onClick={onOfflineMode}
        >
          <Zap size={13} strokeWidth={2.6} />
          <span>Gunakan Mode Offline</span>
        </button>
        <p className="offline-hint-text">
          Gunakan langsung tanpa registrasi. Data tersimpan di browser Anda.
        </p>
      </div>
    </div>
  );
}
