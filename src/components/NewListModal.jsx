import React, { useState } from 'react';
import { X, Plus, ShoppingCart } from 'lucide-react';

export default function NewListModal({ isOpen, onClose, onCreateList }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateList({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Daftar Belanja Pribadi'
    });

    setTitle('');
    setSubtitle('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div className="icon-square-light" style={{ width: 44, height: 44 }}>
            <ShoppingCart size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)' }}>
              Buat Daftar Baru
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Tambahkan kategori atau catatan belanja baru
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="new-list-title">Nama Daftar</label>
            <div className="input-container">
              <input
                id="new-list-title"
                type="text"
                className="text-input"
                placeholder="Contoh: Belanja Bulanan, Kebutuhan Dapur"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-list-subtitle">Kategori / Keterangan (Opsional)</label>
            <div className="input-container">
              <input
                id="new-list-subtitle"
                type="text"
                className="text-input"
                placeholder="Contoh: Kebutuhan Mingguan, Supermarket"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-confirm-create-list"
            className="btn-primary-green"
            style={{ marginTop: 8 }}
          >
            <Plus size={18} strokeWidth={2.5} /> Buat Daftar
          </button>
        </form>
      </div>
    </div>
  );
}
