import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function HeaderStatusBar() {
  return (
    <div className="status-bar" aria-label="Status Bar">
      <div className="status-time">9:41</div>
      <div className="status-icons">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BatteryMedium size={18} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
