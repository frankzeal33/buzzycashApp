import { axiosClient } from "@/globalApi"
import { setTransactionInfo, setTransactionLoading } from "@/redux/TransactionSlice";

const getTransactions = async (dispatch: any, toast: any) => {
    
    dispatch(setTransactionLoading(true))

    try {

      const result = await axiosClient.get("/transact/user-transaction-history")

      console.log("transaction data", result.data )
      dispatch(setTransactionInfo(result.data.transactions))

    } catch (error: any) {
      toast.show(error.response.data.message || error.response.data.error.message,{
        type: "danger",
      });
    } finally {
        dispatch(setTransactionLoading(false))
    }
  }

  export default getTransactions
