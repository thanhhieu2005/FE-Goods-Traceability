import UploadImagesService from "@/api/upload_image";

export const submitImage = async (image: any) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "hk_solution");
    formData.append("cloud_name", "dafxqnwts");

    const linkImage = await UploadImagesService.uploadImagesCloudinary(formData);

    return linkImage;
}