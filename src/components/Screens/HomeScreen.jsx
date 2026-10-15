import React from 'react';
import { ShoppingCart, Plus, ChevronRight } from 'lucide-react';

export default function HomeScreen({
  user,
  shoppingLists,
  onSelectList,
  onOpenCreateListModal
}) {
  // Take the first active list for the top featured card
  const activeList = shoppingLists[0] || null;
  const activeCompleted = activeList
    ? activeList.items.filter((i) => i.checked).length
    : 0;
  const activeTotal = activeList ? activeList.items.length : 0;
  const activePercent = activeTotal > 0 ? Math.round((activeCompleted / activeTotal) * 100) : 0;

  return (
    <div className="home-container">
      {/* Top Brand */}
      <div className="home-top-header">ListBelanja</div>

      {/* Greeting Banner */}
      <div className="greeting-banner">
        <div className="greeting-text">
          <h2>Halo, {user?.name || 'Fakhri'} 👋</h2>
          <p>Yuk, mulai belanja hari ini!</p>
        </div>
        <div className="greeting-leaf-icon" aria-hidden="true">
          🍃
        </div>
      </div>

      {/* Featured Active Shopping Card */}
      {activeList && (
        <div
          className="progress-card"
          onClick={() => onSelectList(activeList.id)}
          role="button"
          tabIndex={0}
          aria-label={`Buka daftar belanja ${activeList.title}`}
        >
          <div className="progress-card-header">
            <div className="icon-square-light">
              <ShoppingCart size={22} strokeWidth={2.2} />
            </div>
            <div className="progress-card-info">
              <h3>Daftar Belanja</h3>
              <p>
                {activeCompleted} dari {activeTotal} selesai
              </p>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${activePercent}%` }}
              />
            </div>
            <span className="progress-percent-label">{activePercent}%</span>
          </div>
        </div>
      )}

      {/* Section "Daftar Saya" */}
      <div className="section-header-row">
        <h3 className="section-title">Daftar Saya</h3>
        <button
          type="button"
          id="btn-add-list-plus"
          className="btn-add-circle"
          onClick={onOpenCreateListModal}
          aria-label="Tambah daftar belanja baru"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Shopping Lists Stack */}
      <div className="lists-stack">
        {shoppingLists.map((list) => {
          const completedCount = list.items.filter((i) => i.checked).length;
          const totalCount = list.items.length;
          return (
            <div
              key={list.id}
              className="list-item-card"
              onClick={() => onSelectList(list.id)}
              role="button"
              tabIndex={0}
              aria-label={`Daftar ${list.title}`}
            >
              <div className="list-item-left">
                <div className="icon-square-light" style={{ width: 38, height: 38 }}>
                  <ShoppingCart size={18} strokeWidth={2.2} />
                </div>
                <div className="list-item-titles">
                  <h4>{list.title}</h4>
                  <p>
                    {completedCount}/{totalCount} selesai
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
