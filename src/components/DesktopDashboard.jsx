import React, { useState } from 'react';
import {
  ShoppingCart, Home, LayoutGrid, Clock, User, Plus, Check, ChevronRight,
  Trash2, Archive, CheckCheck, RefreshCw, Repeat,
  LogOut, Lock, Mail, Search, Zap, Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { categoriesList } from '../data/initialData';

export default function DesktopDashboard({
  user,
  shoppingLists,
  historyList,
  stats,
  onToggleItem,
  onAddItem,
  onOpenCreateListModal,
  onArchiveList,
  onDeleteList,
  onMarkAllDone,
  onResetChecklist,
  onDuplicateHistory,
  onSaveProfile,
  onLogout,
  onSwitchToMobile
}) {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'daftar' | 'riwayat' | 'profil'
  const [selectedListId, setSelectedListId] = useState(shoppingLists[0]?.id || null);
  const [selectedHistoryId, setSelectedHistoryId] = useState(historyList[0]?.id || null);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Quick Add Item States
  const [quickItemName, setQuickItemName] = useState('');
  const [quickCategory, setQuickCategory] = useState('Makanan');
  const [quickUnit, setQuickUnit] = useState('kg');
  const [quickQty, setQuickQty] = useState(1);
  const [itemFilter, setItemFilter] = useState('all'); // 'all' | 'uncompleted' | 'completed'

  // Full Modal Add Item States
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [addItemUnit, setAddItemUnit] = useState('kg');
  const [addItemQty, setAddItemQty] = useState(1);
  const [addItemNote, setAddItemNote] = useState('');
  const [addItemName, setAddItemName] = useState('');

  // Profile edit states
  const [profName, setProfName] = useState(user?.name || 'Fakhri');
  const [profEmail, setProfEmail] = useState(user?.email || 'fakhri@email.com');
  const userInitial = String(user?.name || 'Fakhri').trim().charAt(0).toUpperCase();
  const [profPassword, setProfPassword] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  const currentList = shoppingLists.find((l) => l.id === selectedListId) || shoppingLists[0];
  const currentHistory = historyList.find((h) => h.id === selectedHistoryId) || historyList[0];

  const totalItemsCount = shoppingLists.reduce((acc, curr) => acc + curr.items.length, 0);
  const totalCheckedCount = shoppingLists.reduce(
    (acc, curr) => acc + curr.items.filter((i) => i.checked).length,
    0
  );

  const completedCount = currentList ? currentList.items.filter((i) => i.checked).length : 0;
  const totalInList = currentList ? currentList.items.length : 0;
  const percentInList = totalInList > 0 ? Math.round((completedCount / totalInList) * 100) : 0;

  // Filtered items in selected list
  const filteredItems = (currentList?.items || []).filter((item) => {
    if (itemFilter === 'completed') return item.checked;
    if (itemFilter === 'uncompleted') return !item.checked;
    return true;
  });

  const handleCheck = (itemId, isChecked) => {
    if (!currentList) return;
    onToggleItem(currentList.id, itemId);

    if (!isChecked && completedCount + 1 === totalInList && totalInList > 0) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#189D58', '#10B981', '#34D399', '#FBBF24']
        });
      } catch {}
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickItemName.trim() || !currentList) return;
    onAddItem(currentList.id, {
      name: quickItemName.trim(),
      quantity: Number(quickQty) || 1,
      unit: quickUnit,
      category: quickCategory,
      note: ''
    });
    setQuickItemName('');
    setQuickQty(1);
  };

  const handleModalAdd = (e) => {
    e.preventDefault();
    if (!addItemName.trim() || !currentList) return;
    onAddItem(currentList.id, {
      name: addItemName.trim(),
      quantity: Number(addItemQty) || 1,
      unit: addItemUnit,
      category: quickCategory,
      note: addItemNote.trim()
    });
    setAddItemName('');
    setAddItemQty(1);
    setAddItemNote('');
    setShowAddItemModal(false);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      name: profName.trim(),
      email: profEmail.trim()
    });
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 3000);
  };

  return (
    <div className="desktop-web-app">
      {/* 1. Modern Desktop Top Navbar */}
      <header className="desktop-web-navbar">
        <div className="navbar-inner">
          {/* Brand & Badge (Click to return to homepage) */}
          <div
            className="navbar-brand-group"
            onClick={() => setActiveTab('home')}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            title="Kembali ke Beranda"
          >
            <div className="navbar-logo-circle">
              <ShoppingCart size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="navbar-brand-text">ListBelanja</div>
            </div>
            {user?.isOfflineMode ? (
              <span className="badge-offline">
                <Zap size={11} strokeWidth={2.5} /> Mode Offline
              </span>
            ) : (
              <span className="badge-online">
                ● Tersinkronisasi
              </span>
            )}
          </div>

          {/* Nav Tabs (Profil tab moved to top-right user chip) */}
          <nav className="desktop-nav-links">
            <button
              type="button"
              className={`desktop-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={17} />
              <span>Beranda</span>
            </button>
            <button
              type="button"
              className={`desktop-tab-btn ${activeTab === 'daftar' ? 'active' : ''}`}
              onClick={() => setActiveTab('daftar')}
            >
              <LayoutGrid size={17} />
              <span>Daftar Belanja</span>
            </button>
            <button
              type="button"
              className={`desktop-tab-btn ${activeTab === 'riwayat' ? 'active' : ''}`}
              onClick={() => setActiveTab('riwayat')}
            >
              <Clock size={17} />
              <span>Riwayat Belanja</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="navbar-right-group">
            <div className="navbar-search-box">
              <Search size={14} color="#94A3B8" style={{ marginRight: 6 }} />
              <input
                type="text"
                placeholder="Cari daftar / barang..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn-primary-green"
              style={{ width: 'auto', height: 38, padding: '0 14px', fontSize: 13 }}
              onClick={onOpenCreateListModal}
            >
              <Plus size={16} strokeWidth={2.5} /> Buat Daftar
            </button>

            {onSwitchToMobile && (
              <button
                type="button"
                className="action-pill"
                style={{ background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', height: 36, padding: '0 10px', fontSize: 12 }}
                onClick={onSwitchToMobile}
                title="Tampilkan bingkai smartphone"
              >
                <Smartphone size={14} /> Preview HP
              </button>
            )}

            <div
              className={`navbar-user-chip ${activeTab === 'profil' ? 'active' : ''}`}
              onClick={() => setActiveTab('profil')}
              role="button"
              tabIndex={0}
              title="Buka Halaman Profil"
            >
              <div className="user-chip-avatar">
                {userInitial}
              </div>
              <span className="user-chip-name">{user?.name || 'Fakhri'}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px 4px' }}
                title="Keluar"
                aria-label="Keluar akun"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Desktop Content */}
      <main className="desktop-web-content">
        {/* TAB 1: BERANDA */}
        {activeTab === 'home' && (
          <>
            {/* Hero Banner */}
            <div className="web-hero-banner">
              <div className="web-hero-left">
                <h1>
                  Halo, {user?.name || 'Fakhri'} 👋
                  <span style={{ fontSize: 20 }}>🍃</span>
                </h1>
                <p>
                  Yuk, mulai kelola belanjaan harian, mingguan, dan kebutuhan kos Anda dengan praktis.
                </p>
              </div>
            </div>

            {/* 4 Stats Cards */}
            <div className="web-stats-grid">
              <div className="web-stat-card">
                <div className="web-stat-icon-wrap" style={{ background: '#EAF7EE', color: 'var(--primary)' }}>
                  <LayoutGrid size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="web-stat-number">{shoppingLists.length}</div>
                  <div className="web-stat-label">Daftar Belanja Aktif</div>
                </div>
              </div>

              <div className="web-stat-card">
                <div className="web-stat-icon-wrap" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                  <CheckCheck size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="web-stat-number">{totalCheckedCount}/{totalItemsCount}</div>
                  <div className="web-stat-label">Terbeli</div>
                </div>
              </div>

              <div className="web-stat-card">
                <div className="web-stat-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <Clock size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="web-stat-number">{historyList.length}</div>
                  <div className="web-stat-label">Selesai</div>
                </div>
              </div>

              <div className="web-stat-card">
                <div className="web-stat-icon-wrap" style={{ background: '#F1F5F9', color: '#475569' }}>
                  <ShoppingCart size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="web-stat-number">{stats?.itemsBought ?? 48}</div>
                  <div className="web-stat-label">Total Barang</div>
                </div>
              </div>
            </div>

            {/* 2-Column Home Layout: Lists Grid + Quick Checklist */}
            <div className="web-workspace-grid">
              {/* Left Column: Active Shopping Lists Cards */}
              <div className="web-card-panel">
                <div className="web-panel-header">
                  <div className="web-panel-title">
                    <ShoppingCart size={18} color="var(--primary)" />
                    <span>Daftar Saya</span>
                  </div>
                  <button
                    type="button"
                    className="btn-add-circle"
                    onClick={onOpenCreateListModal}
                    title="Tambah Daftar Belanja"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {shoppingLists.map((list) => {
                    const done = list.items.filter((i) => i.checked).length;
                    const tot = list.items.length;
                    const pct = tot > 0 ? Math.round((done / tot) * 100) : 0;
                    const isSelected = (currentList?.id === list.id);

                    return (
                      <div
                        key={list.id}
                        className="list-item-card"
                        style={{
                          borderColor: isSelected ? 'var(--primary)' : undefined,
                          background: isSelected ? '#FCFDFC' : '#FFFFFF',
                          boxShadow: isSelected ? '0 2px 8px var(--primary-glow)' : undefined
                        }}
                        onClick={() => {
                          setSelectedListId(list.id);
                        }}
                      >
                        <div className="list-item-left">
                          <div className="icon-square-light" style={{ width: 42, height: 42 }}>
                            <ShoppingCart size={18} strokeWidth={2.2} />
                          </div>
                          <div className="list-item-titles">
                            <h4>{list.title}</h4>
                            <p>{done} dari {tot} selesai ({pct}%)</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            type="button"
                            className="action-pill"
                            style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, padding: '4px 10px', fontSize: 11 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedListId(list.id);
                              setActiveTab('daftar');
                            }}
                          >
                            Buka Detail
                          </button>
                          <ChevronRight size={18} style={{ color: isSelected ? 'var(--primary)' : '#CBD5E1' }} />
                        </div>
                      </div>
                    );
                  })}

                  {/* Dashed "+ Buat Daftar Baru" Card */}
                  <div
                    className="list-item-card"
                    style={{
                      borderStyle: 'dashed',
                      borderColor: '#CBD5E1',
                      background: '#F8FAFC',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: '16px'
                    }}
                    onClick={onOpenCreateListModal}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>
                      <Plus size={18} strokeWidth={2.5} />
                      <span>+ Buat Catatan Daftar Baru</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Checklist for Current List */}
              <div className="web-card-panel">
                {currentList ? (
                  <>
                    <div className="web-panel-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)' }}>
                            {currentList.title}
                          </h3>
                          <span style={{ fontSize: 12, background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                            Aktif
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                          {completedCount} dari {totalInList} barang selesai ({percentInList}%)
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn-primary-green"
                        style={{ width: 'auto', height: 34, padding: '0 12px', fontSize: 12 }}
                        onClick={() => setActiveTab('daftar')}
                      >
                        Buka Daftar Belanja <ChevronRight size={14} />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar-track" style={{ height: 8 }}>
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${percentInList}%` }}
                      />
                    </div>

                    {/* Quick Add Bar */}
                    <form onSubmit={handleQuickAdd} className="web-quick-add-row">
                      <input
                        type="text"
                        className="text-input"
                        placeholder="Ketik barang baru (contoh: Susu UHT)..."
                        value={quickItemName}
                        onChange={(e) => setQuickItemName(e.target.value)}
                        style={{ flex: 1, fontSize: 13 }}
                      />
                      <input
                        type="number"
                        min="1"
                        style={{ width: 50, height: 34, padding: '0 6px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 12 }}
                        value={quickQty}
                        onChange={(e) => setQuickQty(e.target.value)}
                      />
                      <select
                        className="unit-select"
                        style={{ height: 34 }}
                        value={quickUnit}
                        onChange={(e) => setQuickUnit(e.target.value)}
                      >
                        {['kg', 'bungkus', 'botol', 'liter', 'buah', 'pack', 'gram'].map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="btn-primary-green"
                        style={{ width: 'auto', height: 34, padding: '0 12px', fontSize: 12 }}
                      >
                        + Tambah
                      </button>
                    </form>

                    {/* Checklist Stack */}
                    <div className="checklist-items-stack" style={{ marginTop: 4 }}>
                      {currentList.items.map((item) => (
                        <div
                          key={item.id}
                          className={`check-item-row ${item.checked ? 'is-checked' : ''}`}
                          onClick={() => handleCheck(item.id, item.checked)}
                        >
                          <div className="check-item-info">
                            <h5>{item.name}</h5>
                            <p>
                              {item.quantity} {item.unit}
                              {item.note && ` • ${item.note}`}
                            </p>
                          </div>
                          <div className={`checkbox-box ${item.checked ? 'checked' : ''}`}>
                            {item.checked && <Check size={14} strokeWidth={3.5} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p style={{ textAlign: 'center', color: '#94A3B8', padding: 40 }}>
                    Pilih daftar belanja terlebih dahulu.
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: DAFTAR BELANJA WORKSPACE */}
        {activeTab === 'daftar' && (
          <div className="web-workspace-grid">
            {/* Left: Lists Selector Sidebar */}
            <div className="web-card-panel">
              <div className="web-panel-header">
                <div className="web-panel-title">
                  <LayoutGrid size={18} color="var(--primary)" />
                  <span>Daftar Belanja</span>
                </div>
                <button
                  type="button"
                  className="btn-add-circle"
                  onClick={onOpenCreateListModal}
                  title="Tambah Daftar"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {shoppingLists.map((list) => {
                  const done = list.items.filter((i) => i.checked).length;
                  const tot = list.items.length;
                  const pct = tot > 0 ? Math.round((done / tot) * 100) : 0;
                  const isSelected = (currentList?.id === list.id);

                  return (
                    <div
                      key={list.id}
                      className="list-item-card"
                      style={{
                        borderColor: isSelected ? 'var(--primary)' : undefined,
                        background: isSelected ? '#FCFDFC' : '#FFFFFF',
                        boxShadow: isSelected ? '0 2px 8px var(--primary-glow)' : undefined
                      }}
                      onClick={() => setSelectedListId(list.id)}
                    >
                      <div className="list-item-left">
                        <div className="icon-square-light" style={{ width: 40, height: 40 }}>
                          <ShoppingCart size={18} strokeWidth={2.2} />
                        </div>
                        <div className="list-item-titles">
                          <h4>{list.title}</h4>
                          <p>{done}/{tot} selesai ({pct}%)</p>
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: isSelected ? 'var(--primary)' : '#CBD5E1' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Shopping Checklist Full Workspace */}
            <div className="web-card-panel">
              {currentList ? (
                <>
                  <div className="web-panel-header" style={{ alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>
                        {currentList.title}
                      </h2>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                        {completedCount} dari {totalInList} barang selesai ({percentInList}%)
                      </p>
                    </div>

                    {/* Toolbar Actions */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="action-pill"
                        style={{ background: '#F1F5F9', color: 'var(--text-main)', fontSize: 12 }}
                        onClick={() => onMarkAllDone(currentList.id)}
                      >
                        <CheckCheck size={14} /> Tandai Semua
                      </button>
                      <button
                        type="button"
                        className="action-pill"
                        style={{ background: '#F1F5F9', color: 'var(--text-main)', fontSize: 12 }}
                        onClick={() => onResetChecklist(currentList.id)}
                      >
                        <RefreshCw size={14} /> Reset
                      </button>
                      <button
                        type="button"
                        className="action-pill"
                        style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600, fontSize: 12 }}
                        onClick={() => onArchiveList(currentList.id)}
                      >
                        <Archive size={14} /> Arsipkan
                      </button>
                      <button
                        type="button"
                        className="action-pill"
                        style={{ background: '#FEE2E2', color: '#EF4444', fontSize: 12 }}
                        onClick={() => onDeleteList(currentList.id)}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar-track" style={{ height: 10 }}>
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${percentInList}%` }}
                    />
                  </div>

                  {/* Quick Add Bar */}
                  <form onSubmit={handleQuickAdd} className="web-quick-add-row" style={{ marginTop: 6 }}>
                    <input
                      type="text"
                      className="text-input"
                      placeholder="Ketik nama barang baru lalu tekan Enter..."
                      value={quickItemName}
                      onChange={(e) => setQuickItemName(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="number"
                      min="1"
                      style={{ width: 54, height: 36, padding: '0 6px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 13 }}
                      value={quickQty}
                      onChange={(e) => setQuickQty(e.target.value)}
                    />
                    <select
                      className="unit-select"
                      style={{ height: 36 }}
                      value={quickUnit}
                      onChange={(e) => setQuickUnit(e.target.value)}
                    >
                      {['kg', 'bungkus', 'botol', 'liter', 'buah', 'pack', 'gram', 'roll'].map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                    <select
                      className="unit-select"
                      style={{ height: 36 }}
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                    >
                      {categoriesList.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="btn-primary-green"
                      style={{ width: 'auto', padding: '0 16px', height: 36, fontSize: 13 }}
                    >
                      + Tambah
                    </button>
                    <button
                      type="button"
                      className="action-pill"
                      style={{ height: 36, padding: '0 12px', background: '#FFFFFF', border: '1px solid #CBD5E1', color: 'var(--text-main)', fontSize: 12 }}
                      onClick={() => setShowAddItemModal(true)}
                    >
                      Form Lengkap
                    </button>
                  </form>

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button
                      type="button"
                      className={`action-pill ${itemFilter === 'all' ? 'active' : ''}`}
                      style={{
                        background: itemFilter === 'all' ? 'var(--primary)' : '#F1F5F9',
                        color: itemFilter === 'all' ? '#FFFFFF' : '#475569',
                        fontSize: 12
                      }}
                      onClick={() => setItemFilter('all')}
                    >
                      Semua ({currentList.items.length})
                    </button>
                    <button
                      type="button"
                      className={`action-pill ${itemFilter === 'uncompleted' ? 'active' : ''}`}
                      style={{
                        background: itemFilter === 'uncompleted' ? 'var(--primary)' : '#F1F5F9',
                        color: itemFilter === 'uncompleted' ? '#FFFFFF' : '#475569',
                        fontSize: 12
                      }}
                      onClick={() => setItemFilter('uncompleted')}
                    >
                      Belum Dibeli ({currentList.items.filter((i) => !i.checked).length})
                    </button>
                    <button
                      type="button"
                      className={`action-pill ${itemFilter === 'completed' ? 'active' : ''}`}
                      style={{
                        background: itemFilter === 'completed' ? 'var(--primary)' : '#F1F5F9',
                        color: itemFilter === 'completed' ? '#FFFFFF' : '#475569',
                        fontSize: 12
                      }}
                      onClick={() => setItemFilter('completed')}
                    >
                      Selesai ({currentList.items.filter((i) => i.checked).length})
                    </button>
                  </div>

                  {/* Checklist Items Stack */}
                  <div className="checklist-items-stack" style={{ marginTop: 8 }}>
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={`check-item-row ${item.checked ? 'is-checked' : ''}`}
                        onClick={() => handleCheck(item.id, item.checked)}
                      >
                        <div className="check-item-info">
                          <h5>{item.name}</h5>
                          <p>
                            {item.quantity} {item.unit}
                            {item.category && ` • ${item.category}`}
                            {item.note && ` • ${item.note}`}
                          </p>
                        </div>
                        <div className={`checkbox-box ${item.checked ? 'checked' : ''}`}>
                          {item.checked && <Check size={14} strokeWidth={3.5} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                  <ShoppingCart size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                  <p>Pilih atau buat daftar belanja terlebih dahulu.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: RIWAYAT BELANJA */}
        {activeTab === 'riwayat' && (
          <div className="web-workspace-grid">
            {/* Left: History List */}
            <div className="web-card-panel">
              <div className="web-panel-header">
                <div className="web-panel-title">
                  <Clock size={18} color="var(--primary)" />
                  <span>Riwayat Belanja</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {historyList.map((hist) => {
                  const isSelected = (currentHistory?.id === hist.id);
                  return (
                    <div
                      key={hist.id}
                      className="list-item-card"
                      style={{
                        borderColor: isSelected ? 'var(--primary)' : undefined,
                        background: isSelected ? '#FCFDFC' : '#FFFFFF',
                        boxShadow: isSelected ? '0 2px 8px var(--primary-glow)' : undefined
                      }}
                      onClick={() => setSelectedHistoryId(hist.id)}
                    >
                      <div className="list-item-left">
                        <div className="icon-square-light" style={{ width: 40, height: 40 }}>
                          <ShoppingCart size={18} strokeWidth={2.2} />
                        </div>
                        <div className="list-item-titles">
                          <h4>{hist.title}</h4>
                          <p>{hist.date} • {hist.items?.length || hist.totalItems} barang</p>
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: isSelected ? 'var(--primary)' : '#CBD5E1' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: History Detail */}
            <div className="web-card-panel">
              {currentHistory ? (
                <>
                  <div className="web-panel-header">
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)' }}>
                        {currentHistory.title}
                      </h2>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                        Selesai pada: {currentHistory.date} • Total: {currentHistory.items?.length || 0} barang
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-primary-green"
                      style={{ width: 'auto', padding: '0 16px', height: 40, fontSize: 13 }}
                      onClick={() => onDuplicateHistory(currentHistory)}
                    >
                      <Repeat size={16} /> Beli Lagi (Salin ke Daftar Baru)
                    </button>
                  </div>

                  <div className="checklist-items-stack" style={{ marginTop: 12 }}>
                    {(currentHistory.items || []).map((item) => (
                      <div key={item.id} className="check-item-row" style={{ cursor: 'default' }}>
                        <div className="check-item-info">
                          <h5>{item.name}</h5>
                          <p>{item.quantity} {item.unit}</p>
                        </div>
                        <div className={`checkbox-box ${item.checked ? 'checked' : ''}`}>
                          {item.checked && <Check size={14} strokeWidth={3.5} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>Pilih riwayat belanja.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PROFIL PENGGUNA */}
        {activeTab === 'profil' && (
          <div className="web-card-panel" style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
            <div className="web-panel-header">
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Profil & Pengaturan Akun</h2>
            </div>

            {profileSuccessMsg && (
              <div style={{ background: '#EAF7EE', color: 'var(--primary)', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                Profil berhasil diperbarui!
              </div>
            )}

            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="profile-avatar-circle" style={{ width: 72, height: 72, fontSize: 28 }}>
                  {userInitial}
                </div>
                <div>
                  <h4 style={{ fontSize: 17, fontWeight: 700 }}>{user?.name || 'Fakhri'}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user?.email || 'fakhri@email.com'}</p>
                  {user?.isOfflineMode && (
                    <span className="badge-offline" style={{ marginTop: 6 }}>
                      <Zap size={11} /> Mode Offline Aktif
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nama</label>
                <div className="input-container">
                  <span className="input-icon"><User size={18} /></span>
                  <input
                    type="text"
                    className="text-input"
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-container">
                  <span className="input-icon"><Mail size={18} /></span>
                  <input
                    type="email"
                    className="text-input"
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password Baru (Opsional)</label>
                <div className="input-container">
                  <span className="input-icon"><Lock size={18} /></span>
                  <input
                    type="password"
                    className="text-input"
                    placeholder="Masukkan password baru..."
                    value={profPassword}
                    onChange={(e) => setProfPassword(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" className="btn-primary-green" style={{ width: 'auto', padding: '0 24px' }}>
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  className="action-pill"
                  style={{ background: '#FEE2E2', color: '#EF4444', height: 46, padding: '0 20px', fontSize: 14 }}
                  onClick={onLogout}
                >
                  <LogOut size={16} /> Keluar Akun
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Add Item Modal for Desktop */}
      {showAddItemModal && (
        <div className="modal-overlay" onClick={() => setShowAddItemModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="web-panel-header" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Tambah Barang ke {currentList?.title}</h3>
            </div>
            <form onSubmit={handleModalAdd} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Nama Barang</label>
                <div className="input-container">
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Contoh: Susu Segar"
                    value={addItemName}
                    onChange={(e) => setAddItemName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Jumlah</label>
                <div className="stepper-container">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => addItemQty > 1 && setAddItemQty(addItemQty - 1)}
                  >
                    -
                  </button>
                  <div className="stepper-value-group">
                    <span className="stepper-number">{addItemQty}</span>
                    <select
                      className="unit-select"
                      value={addItemUnit}
                      onChange={(e) => setAddItemUnit(e.target.value)}
                    >
                      {['kg', 'bungkus', 'botol', 'liter', 'buah', 'pack', 'gram', 'roll'].map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="stepper-btn plus"
                    onClick={() => setAddItemQty(addItemQty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kategori</label>
                <div className="input-container">
                  <select
                    className="select-dropdown"
                    value={quickCategory}
                    onChange={(e) => setQuickCategory(e.target.value)}
                  >
                    {categoriesList.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Catatan (Opsional)</label>
                <textarea
                  className="textarea-input"
                  placeholder="Catatan merek atau instruksi..."
                  value={addItemNote}
                  onChange={(e) => setAddItemNote(e.target.value)}
                  rows={2}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  className="action-pill"
                  style={{ flex: 1, height: 44, justifyContent: 'center', background: '#F1F5F9', color: 'var(--text-main)', fontSize: 14 }}
                  onClick={() => setShowAddItemModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary-green" style={{ flex: 1 }}>
                  Simpan Barang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
