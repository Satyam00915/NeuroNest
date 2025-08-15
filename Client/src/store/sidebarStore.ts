import { create } from "zustand";

interface Sidebar {
  sidebar: string;
  setSidebar: (sidebar: string) => void;
}

const useSidebarStore = create<Sidebar>((set) => ({
  sidebar: "Dashboard",

  setSidebar: (sidebar: string) => set({ sidebar }),
}));

export default useSidebarStore;
