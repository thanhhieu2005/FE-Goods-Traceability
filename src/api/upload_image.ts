import axios from "axios";

const UploadImagesService = {
  uploadImagesCloudinary: async (formData: any) => {
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dafxqnwts/image/upload",
        formData
      );

      const dataLink = res.data["secure_url"];

      return dataLink;
    } catch (err) {
      return err;
    }
  },
};

export default UploadImagesService;
