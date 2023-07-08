import { LogModel } from "@/types/project_log_model";

export const checkVerifyBlockchainLog = (logs: LogModel[]) => {
  if (logs.length !== 0) {
    const lastLog = logs[logs.length - 1];

    console.log(lastLog);

    if (
      lastLog.transactionHash === null ||
      lastLog.transactionHash === undefined ||
      lastLog.transactionHash === ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  return false;
};
