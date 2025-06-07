import { axiosClient } from "@/globalApi"
import * as SecureStore from "expo-secure-store";
import { setWalletInfo, setBalanceLoading } from '@/redux/WalletSlice'

const getWallet = async (dispatch: any, toast: any, changeCurrency: null | string) => {
    
    dispatch(setBalanceLoading(true))

    try {
      
      const result = await axiosClient.get("/wallet/get-wallet-details")

      console.log("balance data", result.data )
      dispatch(setWalletInfo({
        currency: changeCurrency === null ? result.data.walletDetails.currency : changeCurrency,
        walletId: result.data.walletDetails.id,
        is_active: result.data.walletDetails.is_active, 
        paymentType: result.data.walletDetails.paymentType,
        walletBalanceNGN: result.data.walletDetails.walletBalanceNGN,
        walletBalanceGBP: result.data.walletDetails.walletBalanceGBP,
      }))

    } catch (error: any) {
      toast.show(error.response.data.message || error.response.data.error.message,{
        type: "danger",
      });
    } finally {
        dispatch(setBalanceLoading(false))
    }
  }

  export default getWallet
