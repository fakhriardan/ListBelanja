import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Utensils, Coffee, Home, Sparkles, Apple, Flame, Package } from 'lucide-react';
import { categoriesList } from '../../data/initialData';

export default function AddItemScreen({ onBack, onSaveItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('kg');
  const [category, setCategory] = useState('Makanan');
  const [note, setNote] = useState('');

  const units = ['kg', 'bungkus', 'botol', 'liter', 'buah', 'pack', 'gram', 'roll', 'dus'];

  const getCategoryIcon = (catName) => {
    switch (catName) {
      case 'Makanan': return <Utensils size={18} />;
      case 'Minuman': return <Coffee size={18} />;
      case 'Kebutuhan Rumah': return <Home size={18} />;
      case 'Kebersihan': return <Sparkles size={18} />;
      case 'Sayur & Buah': return <Apple size={18} />;
      case 'Bumbu Dapur': return <Flame size={18} />;
      default: return <Package size={18} />;
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveItem({
      name: name.trim(),
      quantity: Number(quantity) || 1,
      unit,
      category,
      note: note.trim()
    });
  };

  return (
    <div className="add-item-container">
      {/* Screen Header */}
      <div className="screen-header">
        <button
          type="button"
          className="header-back-btn"
          onClick={onBack}
          aria-label="Kembali ke daftar"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
        <h2 className="screen-title">Tambah Barang</h2>
        <div style={{ width: 36 }} />
      </div>

      <form className="add-item-form" onSubmit={handleSubmit}>
        {/* Nama Barang */}
        <div className="form-group">
          <label className="form-label" htmlFor="item-name-input">
            Nama Barang
          </label>
          <div className="input-container">
            <span className="input-icon">
              <ShoppingBag size={18} strokeWidth={1.8} />
            </span>
            <input
              id="item-name-input"
              type="text"
              className="text-input"
              placeholder="Contoh: Susu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
        </div>

        {/* Jumlah & Satuan */}
        <div className="form-group">
          <label className="form-label">Jumlah</label>
          <div className="stepper-container">
            <button
              type="button"
              className="stepper-btn"
              onClick={handleDecrease}
              aria-label="Kurangi jumlah"
            >
              -
            </button>

            <div className="stepper-value-group">
              <span className="stepper-number">{quantity}</span>
              <select
                className="unit-select"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                aria-label="Pilih satuan"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="stepper-btn plus"
              onClick={handleIncrease}
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
        </div>

        {/* Kategori */}
        <div className="form-group">
          <label className="form-label" htmlFor="item-category-select">
            Kategori
          </label>
          <div className="input-container">
            <span className="input-icon" style={{ color: 'var(--primary)' }}>
              {getCategoryIcon(category)}
            </span>
            <select
              id="item-category-select"
              className="select-dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoriesList.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Catatan */}
        <div className="form-group">
          <label className="form-label" htmlFor="item-notes-textarea">
            Catatan
          </label>
          <textarea
            id="item-notes-textarea"
            className="textarea-input"
            placeholder="Masukkan catatan tambahan..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="btn-save-item"
          className="btn-primary-green"
          style={{ marginTop: 12 }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
