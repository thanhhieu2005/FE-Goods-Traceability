import { UserDetailModel } from "@/types/user";
import { useSelector } from "react-redux";

export const checkMatchWalletAddress = () => {
    const localUserInfo: UserDetailModel = useSelector(
        (state: any) => state.authen.currentUserInfo
    );

    const walletInfo = useSelector((state: any) => state.account);

    if(localUserInfo.walletAddress != walletInfo.account) {
        return false;
    } else return true;

}