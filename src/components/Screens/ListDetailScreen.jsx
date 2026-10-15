import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Check, Trash2, Archive, CheckCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ListDetailScreen({
  list,
  onBack,
  onToggleItem,
  onOpenAddItem,
  onArchiveList,
  onDeleteList,
  onMarkAllDone,
  onResetChecklist
}) {
  const [showMenu, setShowMenu] = useState(false);

  if (!list) {
    return (
      <div className="list-detail-container" style={{ textAlign: 'center', paddingTop: 60 }}>
        <p>Daftar tidak ditemukan.</p>
        <button type="button" className="btn-primary-green" onClick={onBack} style={{ marginTop: 16 }}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const completedCount = list.items.filter((i) => i.checked).length;
  const totalCount = list.items.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleItemClick = (itemId, currentChecked) => {
    onToggleItem(list.id, itemId);

    // If checking this item causes 100% completion, trigger celebratory confetti!
    if (!currentChecked && completedCount + 1 === totalCount && totalCount > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#189D58', '#10B981', '#34D399', '#FBBF24']
        });
      } catch {
        // ignore if confetti unavailable
      }
    }
  };

  return (
    <div className="list-detail-container">
      {/* Screen Header */}
      <div className="screen-header" style={{ padding: '12px 0 14px' }}>
        <button
          type="button"
          className="header-back-btn"
          onClick={onBack}
          aria-label="Kembali"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
        <h2 className="screen-title">{list.title}</h2>
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="header-action-btn"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Opsi lainnya"
          >
            <MoreHorizontal size={22} strokeWidth={2.4} />
          </button>

          {showMenu && (
            <div className="mobile-dropdown-menu">
              <button
                type="button"
                className="mobile-dropdown-item"
                onClick={() => {
                  setShowMenu(false);
                  onMarkAllDone(list.id);
                }}
              >
                <CheckCheck size={16} strokeWidth={2.2} />
                <span>Tandai Semua Selesai</span>
              </button>
              <button
                type="button"
                className="mobile-dropdown-item"
                onClick={() => {
                  setShowMenu(false);
                  onResetChecklist(list.id);
                }}
              >
                <RefreshCw size={16} strokeWidth={2.2} />
                <span>Reset Checklist</span>
              </button>
              <button
                type="button"
                className="mobile-dropdown-item"
                onClick={() => {
                  setShowMenu(false);
                  onArchiveList(list.id);
                }}
              >
                <Archive size={16} strokeWidth={2.2} />
                <span>Selesai & Arsipkan</span>
              </button>
              <div className="mobile-dropdown-divider" />
              <button
                type="button"
                className="mobile-dropdown-item danger"
                onClick={() => {
                  setShowMenu(false);
                  onDeleteList(list.id);
                }}
              >
                <Trash2 size={16} strokeWidth={2.2} />
                <span>Hapus Daftar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="detail-progress-summary">
        <div className="detail-progress-text">
          <span>
            {completedCount} dari {totalCount} barang selesai
          </span>
          <span>{percent}%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Items Checklist Stack */}
      <div className="checklist-items-stack">
        {list.items.map((item) => (
          <div
            key={item.id}
            className={`check-item-row ${item.checked ? 'is-checked' : ''}`}
            onClick={() => handleItemClick(item.id, item.checked)}
            role="button"
            tabIndex={0}
            aria-label={`Item ${item.name}, ${item.checked ? 'selesai' : 'belum selesai'}`}
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

      {/* Sticky Bottom "+ Tambah Barang" Button */}
      <div className="sticky-bottom-action">
        <button
          type="button"
          id="btn-add-item-trigger"
          className="btn-primary-green"
          onClick={() => onOpenAddItem(list.id)}
        >
          + Tambah Barang
        </button>
      </div>
    </div>
  );
}
