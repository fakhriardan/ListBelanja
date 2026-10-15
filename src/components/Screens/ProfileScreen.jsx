import React from 'react';
import { ChevronLeft, UserCheck, ChevronRight, LogOut } from 'lucide-react';

export default function ProfileScreen({
  user,
  stats,
  onBack,
  onNavigateEditProfile,
  onLogout
}) {
  const initial = (user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase();

  return (
    <div className="profile-screen-wrapper">
      {/* Screen Header */}
      <div className="screen-header">
        <button
          type="button"
          className="header-back-btn"
          onClick={onBack}
          aria-label="Kembali"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
        <h2 className="screen-title">Profil</h2>
        <div style={{ width: 36 }} />
      </div>

      <div className="profile-container">
        {/* Avatar with initial letter */}
        <div className="profile-avatar-circle">
          {initial}
        </div>

        {/* Name & Email */}
        <div className="profile-info-block">
          <h3 className="profile-name">{user?.name || 'Fakhri'}</h3>
          <p className="profile-email">{user?.email || 'fakhri@email.com'}</p>
        </div>

        {/* Stats Row */}
        <div className="profile-stats-row">
          <div className="profile-stat-box">
            <div className="profile-stat-number">{stats?.listsCreated ?? 12}</div>
            <div className="profile-stat-label">Daftar Dibuat</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-number">{stats?.itemsBought ?? 48}</div>
            <div className="profile-stat-label">Barang Dibeli</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="profile-menu-stack">
          <button
            type="button"
            className="profile-menu-item"
            onClick={onNavigateEditProfile}
          >
            <div className="profile-menu-left">
              <UserCheck size={18} strokeWidth={2} style={{ color: 'var(--text-secondary)' }} />
              <span>Edit Profil</span>
            </div>
            <ChevronRight size={18} className="chevron-icon" />
          </button>

          <button
            type="button"
            className="profile-menu-item logout"
            onClick={onLogout}
          >
            <div className="profile-menu-left">
              <LogOut size={18} strokeWidth={2} style={{ color: 'var(--text-secondary)' }} />
              <span>Keluar</span>
            </div>
            <ChevronRight size={18} className="chevron-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
