import Web3 from "web3";

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload: any) => {
    console.log("connect success");
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload: any) => {
    console.log("connect failed");
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};

const updateAccountRequest = (payload: any) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    };
};

export const connect = () => {
    return async (dispatch: any) => {
        dispatch(connectRequest());
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                dispatch(
                    connectSuccess({
                        account: accounts[0],
                    })
                );
                window.ethereum.on("accountsChanged", (accounts: any) => {
                    dispatch(updateAccount(accounts[0]));
                    console.log("run update")
                });
            } catch (err) {
                dispatch(connectFailed("Something went wrong."));
            }
        } else {
            dispatch(connectFailed("Install Metamask."));
        }
    };
};

export const updateAccount = (account: any) => {
    return async (dispatch: any) => {
        dispatch(updateAccountRequest({ account: account }));
    };
};