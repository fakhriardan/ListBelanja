import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import LoginScreen from './components/Screens/LoginScreen';
import HomeScreen from './components/Screens/HomeScreen';
import ListDetailScreen from './components/Screens/ListDetailScreen';
import AddItemScreen from './components/Screens/AddItemScreen';
import HistoryScreen from './components/Screens/HistoryScreen';
import HistoryDetailScreen from './components/Screens/HistoryDetailScreen';
import ProfileScreen from './components/Screens/ProfileScreen';
import EditProfileScreen from './components/Screens/EditProfileScreen';
import DesktopDashboard from './components/DesktopDashboard';
import SideBySideGallery from './components/SideBySideGallery';
import NewListModal from './components/NewListModal';
import { initialUserData, initialShoppingLists, initialHistory } from './data/initialData';
import { Smartphone, Monitor, GalleryHorizontal, RefreshCcw, CheckCircle } from 'lucide-react';

export default function App() {
  // Persistence in localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('listbelanja_user');
    return saved ? JSON.parse(saved) : initialUserData;
  });

  const [shoppingLists, setShoppingLists] = useState(() => {
    const saved = localStorage.getItem('listbelanja_lists');
    return saved ? JSON.parse(saved) : initialShoppingLists;
  });

  const [historyList, setHistoryList] = useState(() => {
    const saved = localStorage.getItem('listbelanja_history');
    return saved ? JSON.parse(saved) : initialHistory;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('listbelanja_stats');
    return saved
      ? JSON.parse(saved)
      : { listsCreated: 12, itemsBought: 48 };
  });

  // Display Mode: 'desktop' on widescreen, 'mobile-frame' on small screen or when toggled
  const [displayMode, setDisplayMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'mobile-frame';
    }
    return 'desktop'; // Default on desktop is the standard web layout!
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'daftar' | 'riwayat' | 'profil'
  const [activeView, setActiveView] = useState(() => (user.isLoggedIn ? 'home' : 'login'));
  const [selectedListId, setSelectedListId] = useState(() => shoppingLists[0]?.id || 'list-1');
  const [selectedHistoryId, setSelectedHistoryId] = useState(() => historyList[0]?.id || 'hist-1');

  // Modals & Feedback
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('listbelanja_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('listbelanja_lists', JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  useEffect(() => {
    localStorage.setItem('listbelanja_history', JSON.stringify(historyList));
  }, [historyList]);

  useEffect(() => {
    localStorage.setItem('listbelanja_stats', JSON.stringify(stats));
  }, [stats]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Reset to original mockup data
  const handleResetData = () => {
    if (window.confirm('Reset data ke tampilan awal mockup?')) {
      setUser(initialUserData);
      setShoppingLists(initialShoppingLists);
      setHistoryList(initialHistory);
      setStats({ listsCreated: 12, itemsBought: 48 });
      setSelectedListId('list-1');
      setActiveTab('home');
      setActiveView('login');
      showToast('Data berhasil di-reset ke awal!');
    }
  };

  // Handlers for Tab Switching
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      setActiveView('home');
    } else if (tabId === 'daftar') {
      setActiveView('list-detail');
      if (!selectedListId && shoppingLists.length > 0) {
        setSelectedListId(shoppingLists[0].id);
      }
    } else if (tabId === 'riwayat') {
      setActiveView('history');
    } else if (tabId === 'profil') {
      setActiveView('profile');
    }
  };

  // Auth Handlers
  const handleLogin = ({ email }) => {
    setUser((prev) => ({
      ...prev,
      email: email || prev.email,
      name: prev.name === 'Pengguna Offline' ? 'Fakhri' : prev.name,
      isLoggedIn: true,
      isOfflineMode: false
    }));
    setActiveView('home');
    setActiveTab('home');
    showToast('Selamat datang kembali, ' + (user.name || 'Fakhri') + '!');
  };

  const handleLoginGoogle = () => {
    setUser({
      name: 'Fakhri',
      email: 'fakhri.google@gmail.com',
      avatar: null,
      isLoggedIn: true,
      isOfflineMode: false,
      listsCreated: stats.listsCreated,
      itemsBought: stats.itemsBought
    });
    setActiveView('home');
    setActiveTab('home');
    showToast('Berhasil masuk dengan Akun Google!');
  };

  const handleOfflineMode = () => {
    setUser((prev) => ({
      ...prev,
      name: 'Pengguna Offline',
      email: 'offline@lokal.perangkat',
      isLoggedIn: true,
      isOfflineMode: true
    }));
    setActiveView('home');
    setActiveTab('home');
    showToast('Mode Offline Aktif! Semua catatan disimpan lokal di perangkat.');
  };

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    setActiveView('login');
    showToast('Anda telah keluar.');
  };

  // Item Checkbox Toggle
  const handleToggleItem = (listId, itemId) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          items: list.items.map((item) => {
            if (item.id !== itemId) return item;
            const newChecked = !item.checked;
            setStats((prev) => ({
              ...prev,
              itemsBought: newChecked ? prev.itemsBought + 1 : Math.max(0, prev.itemsBought - 1)
            }));
            return { ...item, checked: newChecked };
          })
        };
      })
    );
  };

  // Add Item to List
  const handleSaveItem = (itemData) => {
    const targetListId = selectedListId || shoppingLists[0]?.id;
    if (!targetListId) return;

    const newItem = {
      id: `item-${Date.now()}`,
      name: itemData.name,
      quantity: itemData.quantity,
      unit: itemData.unit,
      category: itemData.category,
      note: itemData.note,
      checked: false
    };

    setShoppingLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== targetListId) return list;
        return {
          ...list,
          items: [...list.items, newItem]
        };
      })
    );

    setActiveView('list-detail');
    showToast(`"${newItem.name}" ditambahkan ke daftar!`);
  };

  // Create New List
  const handleCreateList = ({ title, subtitle }) => {
    const newList = {
      id: `list-${Date.now()}`,
      title,
      subtitle: subtitle || 'Daftar Belanja',
      color: '#189D58',
      createdAt: new Date().toISOString(),
      items: []
    };

    setShoppingLists((prev) => [newList, ...prev]);
    setSelectedListId(newList.id);
    setActiveTab('daftar');
    setActiveView('list-detail');
    setStats((prev) => ({ ...prev, listsCreated: prev.listsCreated + 1 }));
    showToast(`Daftar "${title}" berhasil dibuat!`);
  };

  // Archive List to History
  const handleArchiveList = (listId) => {
    const listToArchive = shoppingLists.find((l) => l.id === listId);
    if (!listToArchive) return;

    const todayStr = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());

    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      title: listToArchive.title,
      date: todayStr,
      totalItems: listToArchive.items.length,
      items: [...listToArchive.items],
      completedAt: new Date().toISOString()
    };

    setHistoryList((prev) => [newHistoryEntry, ...prev]);
    setShoppingLists((prev) => prev.filter((l) => l.id !== listId));
    setActiveTab('riwayat');
    setActiveView('history');
    showToast(`"${listToArchive.title}" dipindahkan ke Riwayat Belanja.`);
  };

  // Delete List
  const handleDeleteList = (listId) => {
    if (window.confirm('Yakin ingin menghapus daftar belanja ini?')) {
      const remaining = shoppingLists.filter((l) => l.id !== listId);
      setShoppingLists(remaining);
      if (remaining.length > 0) {
        setSelectedListId(remaining[0].id);
        setActiveView('list-detail');
      } else {
        setActiveTab('home');
        setActiveView('home');
      }
      showToast('Daftar telah dihapus.');
    }
  };

  // Mark all items done
  const handleMarkAllDone = (listId) => {
    setShoppingLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          items: list.items.map((i) => ({ ...i, checked: true }))
        };
      })
    );
    showToast('Semua barang ditandai selesai!');
  };

  // Reset checklist
  const handleResetChecklist = (listId) => {
    setShoppingLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          items: list.items.map((i) => ({ ...i, checked: false }))
        };
      })
    );
    showToast('Checklist telah di-reset!');
  };

  // Duplicate history list to active lists
  const handleDuplicateHistory = (hist) => {
    const duplicatedList = {
      id: `list-${Date.now()}`,
      title: `${hist.title} (Baru)`,
      subtitle: 'Disalin dari Riwayat',
      color: '#189D58',
      createdAt: new Date().toISOString(),
      items: (hist.items || []).map((it, idx) => ({
        id: `dup-${Date.now()}-${idx}`,
        name: it.name,
        quantity: it.quantity,
        unit: it.unit || 'pcs',
        category: it.category || 'Makanan',
        checked: false
      }))
    };

    setShoppingLists((prev) => [duplicatedList, ...prev]);
    setSelectedListId(duplicatedList.id);
    setActiveTab('daftar');
    setActiveView('list-detail');
    setStats((prev) => ({ ...prev, listsCreated: prev.listsCreated + 1 }));
    showToast(`Daftar "${duplicatedList.title}" siap digunakan kembali!`);
  };

  // Save profile edits
  const handleSaveProfile = ({ name, email }) => {
    setUser((prev) => ({
      ...prev,
      name,
      email
    }));
    setActiveView('profile');
    showToast('Profil berhasil disimpan!');
  };

  // Current active list & history
  const currentSelectedList =
    shoppingLists.find((l) => l.id === selectedListId) || shoppingLists[0];
  const currentSelectedHistory =
    historyList.find((h) => h.id === selectedHistoryId) || historyList[0];

  // Render mobile screen content
  const renderMobileScreenContent = () => {
    if (!user.isLoggedIn || activeView === 'login') {
      return (
        <LoginScreen
          onLogin={handleLogin}
          onLoginGoogle={handleLoginGoogle}
          onOfflineMode={handleOfflineMode}
          onForgotPassword={() => showToast('Link reset password dikirim ke email!')}
        />
      );
    }

    switch (activeView) {
      case 'home':
        return (
          <HomeScreen
            user={user}
            shoppingLists={shoppingLists}
            onSelectList={(id) => {
              setSelectedListId(id);
              setActiveTab('daftar');
              setActiveView('list-detail');
            }}
            onOpenCreateListModal={() => setIsCreateListModalOpen(true)}
          />
        );

      case 'list-detail':
        return (
          <ListDetailScreen
            list={currentSelectedList}
            onBack={() => {
              setActiveTab('home');
              setActiveView('home');
            }}
            onToggleItem={handleToggleItem}
            onOpenAddItem={() => setActiveView('add-item')}
            onArchiveList={handleArchiveList}
            onDeleteList={handleDeleteList}
            onMarkAllDone={handleMarkAllDone}
            onResetChecklist={handleResetChecklist}
          />
        );

      case 'add-item':
        return (
          <AddItemScreen
            onBack={() => setActiveView('list-detail')}
            onSaveItem={handleSaveItem}
          />
        );

      case 'history':
        return (
          <HistoryScreen
            historyList={historyList}
            onSelectHistory={(id) => {
              setSelectedHistoryId(id);
              setActiveView('history-detail');
            }}
            onBack={() => {
              setActiveTab('home');
              setActiveView('home');
            }}
          />
        );

      case 'history-detail':
        return (
          <HistoryDetailScreen
            historyItem={currentSelectedHistory}
            onBack={() => setActiveView('history')}
            onDuplicateToActive={handleDuplicateHistory}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            user={user}
            stats={stats}
            onBack={() => {
              setActiveTab('home');
              setActiveView('home');
            }}
            onNavigateEditProfile={() => setActiveView('edit-profile')}
            onLogout={handleLogout}
          />
        );

      case 'edit-profile':
        return (
          <EditProfileScreen
            user={user}
            onBack={() => setActiveView('profile')}
            onSaveProfile={handleSaveProfile}
          />
        );

      default:
        return (
          <HomeScreen
            user={user}
            shoppingLists={shoppingLists}
            onSelectList={(id) => {
              setSelectedListId(id);
              setActiveTab('daftar');
              setActiveView('list-detail');
            }}
            onOpenCreateListModal={() => setIsCreateListModalOpen(true)}
          />
        );
    }
  };

  const showBottomNav = user.isLoggedIn && activeView !== 'login';

  return (
    <div className="app-root-layout">
      {/* Top Viewport Switcher Toolbar */}
      <header className="viewport-controller" aria-label="Pengontrol Tampilan">
        <div className="controller-brand">
          <div className="logo-icon">🛒</div>
          <span>ListBelanja</span>
        </div>

        {/* Mode Switcher */}
        <div className="mode-switcher">
          <button
            type="button"
            className={`mode-btn ${displayMode === 'desktop' ? 'active' : ''}`}
            onClick={() => setDisplayMode('desktop')}
            title="Tampilan Desktop Web Standar Modern"
          >
            <Monitor size={14} /> 💻 Tampilan Desktop
          </button>
          <button
            type="button"
            className={`mode-btn ${displayMode === 'mobile-frame' ? 'active' : ''}`}
            onClick={() => setDisplayMode('mobile-frame')}
            title="Tampilan Smartphone Mockup"
          >
            <Smartphone size={14} /> 📱 Tampilan Mobile
          </button>
          <button
            type="button"
            className={`mode-btn ${displayMode === 'gallery' ? 'active' : ''}`}
            onClick={() => setDisplayMode('gallery')}
            title="Katalog 9 Layar sekaligus seperti gambar acuan"
          >
            <GalleryHorizontal size={14} /> 🖼️ Katalog 9 Layar
          </button>
        </div>

        <div className="controller-actions">
          <button
            type="button"
            className="action-pill"
            onClick={handleResetData}
            title="Reset data ke awal"
          >
            <RefreshCcw size={12} /> Reset Data
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-container">
        {displayMode === 'desktop' ? (
          /* Desktop Experience */
          !user.isLoggedIn ? (
            /* Desktop Web Dedicated Login View */
            <div className="desktop-login-layout">
              <div className="desktop-login-card">
                <LoginScreen
                  onLogin={handleLogin}
                  onLoginGoogle={handleLoginGoogle}
                  onOfflineMode={handleOfflineMode}
                  onForgotPassword={() => showToast('Link reset password dikirim ke email!')}
                />
              </div>
            </div>
          ) : (
            /* Desktop Web Dashboard Layout (Standard Web App) */
            <DesktopDashboard
              user={user}
              shoppingLists={shoppingLists}
              historyList={historyList}
              stats={stats}
              onToggleItem={handleToggleItem}
              onAddItem={(listId, item) => {
                setSelectedListId(listId);
                handleSaveItem(item);
              }}
              onOpenCreateListModal={() => setIsCreateListModalOpen(true)}
              onArchiveList={handleArchiveList}
              onDeleteList={handleDeleteList}
              onMarkAllDone={handleMarkAllDone}
              onResetChecklist={handleResetChecklist}
              onDuplicateHistory={handleDuplicateHistory}
              onSaveProfile={handleSaveProfile}
              onLogout={handleLogout}
              onSwitchToMobile={() => setDisplayMode('mobile-frame')}
            />
          )
        ) : displayMode === 'gallery' ? (
          /* Side by Side 9 Screens Catalog */
          <SideBySideGallery
            user={user}
            shoppingLists={shoppingLists}
            historyList={historyList}
            stats={stats}
            onToggleItem={handleToggleItem}
          />
        ) : (
          /* Mobile Phone Frame Mockup */
          <div className="mobile-device-wrapper">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className={`screen-scroll-container ${!showBottomNav ? 'no-nav' : ''}`}>
                  {renderMobileScreenContent()}
                </div>
                {showBottomNav && (
                  <BottomNav
                    activeTab={activeTab}
                    onSelectTab={handleSelectTab}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New List Modal */}
      <NewListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
        onCreateList={handleCreateList}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice" role="alert">
          <CheckCircle size={18} style={{ color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
