import { create } from 'zustand'

type TMobileSidebarStore = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useMobileSidebarStore = create<TMobileSidebarStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
