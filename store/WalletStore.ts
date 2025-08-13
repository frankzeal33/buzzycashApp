import { create } from 'zustand'

interface WalletStore {
  walletBalance: number
  balanceLoading: boolean
  hideWallet: string | null
  setWalletInfo: (data: number) => void
  setBalanceLoading: (loading: boolean) => void
  setHideWallet: (status: string | null) => void
}

const useWalletStore = create<WalletStore>((set) => ({
  walletBalance: 0,
  balanceLoading: false,
  hideWallet: null,
  setWalletInfo: (data) => set({ walletBalance: data }),
  setBalanceLoading: (loading) => set({ balanceLoading: loading }),
  setHideWallet: (status) => set({ hideWallet: status }),
}))

export default useWalletStore
