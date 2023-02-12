import { RootState,  } from '../redux/store';

export interface ConnectState {
    account: any;
    loading: boolean;
    errorMsg: string;
}

const initialState: ConnectState = {
    account: null,
    loading: false,
    errorMsg: "",
}

const accountReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case "CONNECTION_REQUEST":
            return {
                ...initialState,
                loading: true,
            };
        case "CONNECTION_SUCCESS":
            return {
                ...state,
                loading: false,
                account: action.payload.account,
            };
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload,
            };
        case "UPDATE_ACCOUNT":
            return {
                ...state,
                account: action.payload.account,
            };
        default:
            return state;
    }
}

export const selectAccount = (state: RootState) => state.account.account;

export default accountReducer;