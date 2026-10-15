import React from 'react';
import { ChevronLeft, ShoppingCart, Check, Repeat } from 'lucide-react';

export default function HistoryDetailScreen({
  historyItem,
  onBack,
  onDuplicateToActive
}) {
  if (!historyItem) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p>Data riwayat tidak ditemukan.</p>
        <button type="button" className="btn-primary-green" onClick={onBack} style={{ marginTop: 16 }}>
          Kembali ke Riwayat
        </button>
      </div>
    );
  }

  const items = historyItem.items || [];

  return (
    <div className="history-detail-wrapper">
      {/* Screen Header */}
      <div className="screen-header">
        <button
          type="button"
          className="header-back-btn"
          onClick={onBack}
          aria-label="Kembali ke riwayat"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
        <h2 className="screen-title">Detail Riwayat</h2>
        <div style={{ width: 36 }} />
      </div>

      <div className="history-container" style={{ paddingBottom: 90 }}>
        {/* Header Summary Card */}
        <div className="history-header-card">
          <div className="icon-square-light" style={{ width: 48, height: 48 }}>
            <ShoppingCart size={24} strokeWidth={2.2} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
              {historyItem.title}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {historyItem.date} • {items.length} barang
            </p>
          </div>
        </div>

        {/* Section: Daftar Barang */}
        <div className="section-header-row" style={{ marginTop: 12 }}>
          <h3 className="section-title">Daftar Barang</h3>
        </div>

        {/* Item Rows */}
        <div className="checklist-items-stack">
          {items.map((item) => (
            <div
              key={item.id}
              className={`check-item-row ${item.checked ? 'is-checked' : ''}`}
              style={{ cursor: 'default' }}
            >
              <div className="check-item-info">
                <h5>{item.name}</h5>
                <p>
                  {item.quantity} {item.unit || ''}
                </p>
              </div>
              <div className={`checkbox-box ${item.checked ? 'checked' : ''}`}>
                {item.checked && <Check size={14} strokeWidth={3.5} />}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: Beli Lagi */}
        <button
          type="button"
          className="btn-primary-green"
          style={{
            marginTop: 20,
            background: '#FFFFFF',
            color: 'var(--primary)',
            border: '1.5px solid var(--primary)',
            boxShadow: 'none'
          }}
          onClick={() => onDuplicateToActive(historyItem)}
        >
          <Repeat size={18} /> Beli Lagi (Salin ke Daftar Aktif)
        </button>
      </div>
    </div>
  );
}
