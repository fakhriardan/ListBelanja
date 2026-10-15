import React, { useState } from 'react';
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff, Camera } from 'lucide-react';

export default function EditProfileScreen({
  user,
  onBack,
  onSaveProfile
}) {
  const [name, setName] = useState(user?.name || 'Fakhri');
  const [email, setEmail] = useState(user?.email || 'fakhri@email.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const initial = (name?.[0] || email?.[0] || user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim(),
      email: email.trim()
    });
  };

  return (
    <div className="edit-profile-wrapper">
      {/* Screen Header */}
      <div className="screen-header">
        <button
          type="button"
          className="header-back-btn"
          onClick={onBack}
          aria-label="Kembali ke profil"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
        <h2 className="screen-title">Edit Profil</h2>
        <div style={{ width: 36 }} />
      </div>

      <div className="profile-container" style={{ paddingBottom: 90 }}>
        {/* Avatar with initial letter and Camera badge */}
        <div className="profile-avatar-circle">
          {initial}
          <button
            type="button"
            className="edit-photo-badge"
            title="Ubah Foto Profil"
            aria-label="Ubah foto profil"
            onClick={() => alert('Fitur ganti foto profil siap digunakan!')}
          >
            <Camera size={14} />
          </button>
        </div>

        <form className="add-item-form" style={{ width: '100%', padding: '0 4px' }} onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="form-group">
            <label className="form-label" htmlFor="edit-name-input">Nama</label>
            <div className="input-container">
              <span className="input-icon">
                <User size={18} strokeWidth={1.8} />
              </span>
              <input
                id="edit-name-input"
                type="text"
                className="text-input"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="edit-email-input">Email</label>
            <div className="input-container">
              <span className="input-icon">
                <Mail size={18} strokeWidth={1.8} />
              </span>
              <input
                id="edit-email-input"
                type="email"
                className="text-input"
                placeholder="Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="edit-password-input">Password</label>
            <div className="input-container">
              <span className="input-icon">
                <Lock size={18} strokeWidth={1.8} />
              </span>
              <input
                id="edit-password-input"
                type={showPassword ? 'text' : 'password'}
                className="text-input"
                placeholder="Masukkan password baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Save Button */}
          <button
            type="submit"
            id="btn-save-profile"
            className="btn-primary-green"
            style={{ marginTop: 12 }}
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
