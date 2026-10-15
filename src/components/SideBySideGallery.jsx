import React from 'react';
import BottomNav from './BottomNav';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ListDetailScreen from './Screens/ListDetailScreen';
import AddItemScreen from './Screens/AddItemScreen';
import HistoryScreen from './Screens/HistoryScreen';
import HistoryDetailScreen from './Screens/HistoryDetailScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfileScreen from './Screens/EditProfileScreen';

export default function SideBySideGallery({
  user,
  shoppingLists,
  historyList,
  stats,
  onToggleItem
}) {
  const weeklyList = shoppingLists[0];
  const historyItem = historyList[0];

  // Modified copy for Screen 5 (showing 4 of 6 completed, with Minyak checked)
  const screen5List = weeklyList
    ? {
        ...weeklyList,
        items: weeklyList.items.map((item) =>
          item.name === 'Minyak' ? { ...item, checked: true } : item
        )
      }
    : null;

  const screensConfig = [
    {
      id: 'login',
      title: '1. Layar Masuk (Login)',
      activeTab: null,
      content: <LoginScreen onLogin={() => {}} onForgotPassword={() => {}} />
    },
    {
      id: 'home',
      title: '2. Beranda (Home)',
      activeTab: 'home',
      content: (
        <HomeScreen
          user={user}
          shoppingLists={shoppingLists}
          onSelectList={() => {}}
          onOpenCreateListModal={() => {}}
        />
      )
    },
    {
      id: 'list-detail-1',
      title: '3. Daftar Belanja (Checklist 50%)',
      activeTab: 'daftar',
      content: (
        <ListDetailScreen
          list={weeklyList}
          onBack={() => {}}
          onToggleItem={onToggleItem}
          onOpenAddItem={() => {}}
          onArchiveList={() => {}}
          onDeleteList={() => {}}
          onMarkAllDone={() => {}}
          onResetChecklist={() => {}}
        />
      )
    },
    {
      id: 'add-item',
      title: '4. Tambah Barang',
      activeTab: 'daftar',
      content: (
        <AddItemScreen
          onBack={() => {}}
          onSaveItem={() => {}}
        />
      )
    },
    {
      id: 'list-detail-2',
      title: '5. Checklist Terupdate (67%)',
      activeTab: 'daftar',
      content: (
        <ListDetailScreen
          list={screen5List || weeklyList}
          onBack={() => {}}
          onToggleItem={onToggleItem}
          onOpenAddItem={() => {}}
          onArchiveList={() => {}}
          onDeleteList={() => {}}
          onMarkAllDone={() => {}}
          onResetChecklist={() => {}}
        />
      )
    },
    {
      id: 'history',
      title: '6. Riwayat Belanja',
      activeTab: 'riwayat',
      content: (
        <HistoryScreen
          historyList={historyList}
          onSelectHistory={() => {}}
          onBack={() => {}}
        />
      )
    },
    {
      id: 'history-detail',
      title: '7. Detail Riwayat',
      activeTab: 'riwayat',
      content: (
        <HistoryDetailScreen
          historyItem={historyItem}
          onBack={() => {}}
          onDuplicateToActive={() => {}}
        />
      )
    },
    {
      id: 'profile',
      title: '8. Profil Pengguna',
      activeTab: 'profil',
      content: (
        <ProfileScreen
          user={user}
          stats={stats}
          onBack={() => {}}
          onNavigateEditProfile={() => {}}
          onLogout={() => {}}
        />
      )
    },
    {
      id: 'edit-profile',
      title: '9. Edit Profil',
      activeTab: 'profil',
      content: (
        <EditProfileScreen
          user={user}
          onBack={() => {}}
          onSaveProfile={() => {}}
        />
      )
    }
  ];

  return (
    <div style={{ width: '100%', padding: '20px 24px 60px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24, color: '#FFFFFF' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800 }}>Katalog 9 Layar Sesuai Desain Asli</h2>
        <p style={{ fontSize: 14, color: '#94A3B8', marginTop: 4 }}>
          Tampilan presisi dari semua mockup desain gambar yang Anda kirimkan. Geser ke kanan untuk melihat semua layar.
        </p>
      </div>

      <div className="side-by-side-grid">
        {screensConfig.map((sc) => (
          <div key={sc.id} className="side-by-side-card">
            <span className="screen-card-label">{sc.title}</span>
            <div
              className="phone-mockup"
              style={{
                width: 340,
                height: 720,
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                transform: 'scale(1)'
              }}
            >
              <div className="phone-screen">
                <div className="screen-scroll-container">
                  {sc.content}
                </div>
                {sc.activeTab && (
                  <BottomNav
                    activeTab={sc.activeTab}
                    onSelectTab={() => {}}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
