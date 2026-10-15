export const initialUserData = {
  name: "Fakhri",
  email: "fakhri@email.com",
  phone: "0812-3456-7890",
  avatar: null,
  isLoggedIn: false, // Menampilkan halaman login pada kunjungan pertama
  isOfflineMode: false,
  listsCreated: 12,
  itemsBought: 48
};

export const categoriesList = [
  { id: 'makanan', name: 'Makanan', icon: 'Utensils' },
  { id: 'minuman', name: 'Minuman', icon: 'Coffee' },
  { id: 'kebutuhan-rumah', name: 'Kebutuhan Rumah', icon: 'Home' },
  { id: 'kebersihan', name: 'Kebersihan', icon: 'Sparkles' },
  { id: 'sayur-buah', name: 'Sayur & Buah', icon: 'Apple' },
  { id: 'bumbu', name: 'Bumbu Dapur', icon: 'Flame' },
  { id: 'lainnya', name: 'Lainnya', icon: 'Package' }
];

export const initialShoppingLists = [
  {
    id: "list-1",
    title: "Belanja Mingguan",
    subtitle: "Kebutuhan Dapur & Makanan",
    color: "#189D58",
    createdAt: "2026-10-14",
    items: [
      { id: "item-1", name: "Telur", quantity: 1, unit: "kg", category: "Makanan", checked: true, note: "Pilih telur ayam negeri yang segar" },
      { id: "item-2", name: "Roti", quantity: 2, unit: "bungkus", category: "Makanan", checked: true, note: "Roti gandum utuh" },
      { id: "item-3", name: "Susu", quantity: 2, unit: "botol", category: "Minuman", checked: true, note: "Susu UHT low-fat 1L" },
      { id: "item-4", name: "Minyak", quantity: 1, unit: "liter", category: "Kebutuhan Rumah", checked: false, note: "Minyak goreng kemasan 1L" },
      { id: "item-5", name: "Beras", quantity: 5, unit: "kg", category: "Makanan", checked: false, note: "Beras pandan wangi / ramos" },
      { id: "item-6", name: "Gula", quantity: 1, unit: "kg", category: "Kebutuhan Rumah", checked: false, note: "Gula pasir murni putih" }
    ]
  },
  {
    id: "list-2",
    title: "Kebutuhan Kos",
    subtitle: "Pribadi & Kebersihan",
    color: "#10B981",
    createdAt: "2026-10-12",
    items: [
      { id: "item-201", name: "Sabun Mandi", quantity: 2, unit: "buah", category: "Kebersihan", checked: true, note: "Sabun cair refill" },
      { id: "item-202", name: "Shampoo", quantity: 1, unit: "botol", category: "Kebersihan", checked: true, note: "Anti ketombe 180ml" },
      { id: "item-203", name: "Deterjen", quantity: 1, unit: "bungkus", category: "Kebutuhan Rumah", checked: false, note: "Deterjen konsentrat 800g" },
      { id: "item-204", name: "Tisu Toilet", quantity: 4, unit: "roll", category: "Kebutuhan Rumah", checked: false, note: "Tisu gulung 4-ply" }
    ]
  }
];

export const initialHistory = [
  {
    id: "hist-1",
    title: "Belanja Mingguan",
    date: "5 Okt 2026",
    totalItems: 6,
    completedAt: "2026-10-05T14:30:00",
    items: [
      { id: "h1-1", name: "Telur", quantity: 1, unit: "kg", category: "Makanan", checked: true },
      { id: "h1-2", name: "Roti", quantity: 2, unit: "bungkus", category: "Makanan", checked: true },
      { id: "h1-3", name: "Susu", quantity: 2, unit: "botol", category: "Minuman", checked: true },
      { id: "h1-4", name: "Minyak", quantity: 1, unit: "liter", category: "Kebutuhan Rumah", checked: false },
      { id: "h1-5", name: "Beras", quantity: 5, unit: "kg", category: "Makanan", checked: false },
      { id: "h1-6", name: "Gula", quantity: 1, unit: "kg", category: "Kebutuhan Rumah", checked: false }
    ]
  },
  {
    id: "hist-2",
    title: "Belanja Bulanan",
    date: "28 Sep 2026",
    totalItems: 8,
    completedAt: "2026-09-28T11:15:00",
    items: [
      { id: "h2-1", name: "Daging Sapi", quantity: 1, unit: "kg", category: "Makanan", checked: true },
      { id: "h2-2", name: "Bawang Merah", quantity: 500, unit: "gram", category: "Bumbu Dapur", checked: true },
      { id: "h2-3", name: "Bawang Putih", quantity: 250, unit: "gram", category: "Bumbu Dapur", checked: true },
      { id: "h2-4", name: "Kecap Manis", quantity: 1, unit: "botol", category: "Bumbu Dapur", checked: true },
      { id: "h2-5", name: "Sabun Cuci Piring", quantity: 1, unit: "bungkus", category: "Kebersihan", checked: true },
      { id: "h2-6", name: "Kopi Bubuk", quantity: 1, unit: "pack", category: "Minuman", checked: true },
      { id: "h2-7", name: "Garam Dapur", quantity: 1, unit: "bungkus", category: "Bumbu Dapur", checked: true },
      { id: "h2-8", name: "Mentega", quantity: 1, unit: "kotak", category: "Makanan", checked: true }
    ]
  },
  {
    id: "hist-3",
    title: "Kebutuhan Kos",
    date: "15 Sep 2026",
    totalItems: 4,
    completedAt: "2026-09-15T16:45:00",
    items: [
      { id: "h3-1", name: "Air Galon", quantity: 1, unit: "galon", category: "Minuman", checked: true },
      { id: "h3-2", name: "Mie Instan", quantity: 10, unit: "bungkus", category: "Makanan", checked: true },
      { id: "h3-3", name: "Pasta Gigi", quantity: 1, unit: "tube", category: "Kebersihan", checked: true },
      { id: "h3-4", name: "Sikat Gigi", quantity: 1, unit: "buah", category: "Kebersihan", checked: true }
    ]
  }
];
