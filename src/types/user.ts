export interface User {
    key: string;
    lastName: string;
    firstName: string;
    role: number;
    email: string;
    department: string;
    walletAdress?: string;
}
export interface ListUserInfo {
    key: string;
    fullName: string;
    walletAddress: string;
    phoneNumber: string;
    role: number;
    address: string;
    email: string;
    department?: number;
}