import { ProjectDetailModel } from "./project_model";

export interface DescriptionProductModel {
    title: string;
    content: string;
}

export interface ProductImageModel {
    productImageUrl: string;
}

export interface ProductModel {
    productId: string;
    projectId: ProjectDetailModel;
    productName: string;
    description: DescriptionProductModel[];
    exp: string;
    mfg: string;
    businessLicenseRegistrationNumber: string;
    certificateOfFoodHygieneAndSafety: string;
    typeOfProduct: string;
    measureUnit: string;
    productImage: ProductImageModel[];
    state: number;
    productQRCodeUri: string;
}