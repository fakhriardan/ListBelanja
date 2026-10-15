import React from 'react';
import { Home, LayoutGrid, Clock, User } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'daftar', label: 'Daftar', icon: LayoutGrid },
    { id: 'riwayat', label: 'Riwayat', icon: Clock },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="bottom-nav-bar" aria-label="Navigasi Bawah">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            type="button"
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
            aria-label={`Menu ${tab.label}`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
