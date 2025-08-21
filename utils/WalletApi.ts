import { axiosClient } from "@/globalApi";
import useWalletStore from "@/store/WalletStore";
import Toast from "react-native-toast-message";

const getWallet = async (runOnBackground: boolean) => {

  const { setWalletInfo, setBalanceLoading } = useWalletStore.getState();

  if(!runOnBackground){
    setBalanceLoading(true);
  }

  try {
    const result = await axiosClient.get("/wallet/get-wallet");

    console.log("balance data", result.data);

    const walletBalance = result.data.result["wallet Balance"] || 0;

    setWalletInfo(walletBalance);

  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.response?.data?.message,
    });
  } finally {
    if(!runOnBackground){
      setBalanceLoading(false);
    }
  }
};

export default getWallet;