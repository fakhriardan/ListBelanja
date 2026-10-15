import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, ChevronRight, Search } from 'lucide-react';

export default function HistoryScreen({ historyList, onSelectHistory, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = historyList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="history-screen-wrapper">
      {/* Screen Header */}
      <div className="screen-header">
        <button
          type="button"
          className="header-back-btn"
          onClick={onBack}
          aria-label="Kembali ke beranda"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
        <h2 className="screen-title">Riwayat Belanja</h2>
        <div style={{ width: 36 }} />
      </div>

      <div className="history-container">
        {/* Optional Search */}
        {historyList.length > 3 && (
          <div className="input-container" style={{ height: 42, marginBottom: 4 }}>
            <span className="input-icon">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="text-input"
              placeholder="Cari riwayat belanja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {filteredHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <ShoppingCart size={48} strokeWidth={1.5} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p>Belum ada riwayat belanja.</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="list-item-card"
              onClick={() => onSelectHistory(item.id)}
              role="button"
              tabIndex={0}
              aria-label={`Riwayat ${item.title}`}
            >
              <div className="list-item-left">
                <div className="icon-square-light" style={{ width: 42, height: 42 }}>
                  <ShoppingCart size={20} strokeWidth={2.2} />
                </div>
                <div className="list-item-titles">
                  <h4>{item.title}</h4>
                  <p>
                    {item.date} • {item.totalItems || item.items?.length || 0} barang
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
