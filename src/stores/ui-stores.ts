import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UiState {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
      },
    ),
    { name: 'ui-store', enabled: import.meta.env.DEV },
  ),
);
