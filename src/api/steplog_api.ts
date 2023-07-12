import { axiosClient } from "@/services/axios";

const StepLogServices = {
    updateTransactionStepLog: async (logId: string, transactionHash: string) => {
        try {
            const currentToken = localStorage.getItem("token");
            
            const res: any = await axiosClient.patch(
                "/stepLog/" + logId,
                {
                    transactionHash: transactionHash,
                    transactionUrl: "https://mumbai.polygonscan.com/tx/" + transactionHash,
                },
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                  }
            );

            return res;
        } catch(err) {
            return err;
        }
    }
}

export default StepLogServices;