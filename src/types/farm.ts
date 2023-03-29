export interface FarmInfo {
    key: string;
    farmId: string;
    farmCode: string;
    farmName: string;
    farmAddress?: string;
    farmOwner?: string;
    farmPhoneNumber?: string;
    farmers: string[];
    statusFarm: number;
    dateCreated: string;
}

// export interface FarmDetail {
//     farmId: string;
//     farmCode: string;
//     farmName: string;
//     farmAddress?: string;
//     farmPhoneNumber?: string;
    
// }