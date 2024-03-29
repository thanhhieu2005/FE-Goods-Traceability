import { axiosClient } from "../../services/axios";

const FarmServices = {
  getFarmDetailService: async (farmId: string) => {
    try {
      const currentToken = localStorage.getItem("token");
      const res = await axiosClient.get("/farm/" + farmId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  getAllFarmersInFarm: async (farmId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/farm/farmer/all/" + farmId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  getAllFarmProjectsService: async (farmId: string) => {
    try {
      const currentToken = localStorage.getItem("token");
      const res = await axiosClient.get("/farm-project/all/" + farmId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  getAllLandInFarmService: async (farmId: string) => {
    try {
      const currentToken = localStorage.getItem("token");
      const res = await axiosClient.get("/farm/land/all/" + farmId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  getAllSeedInFarmService: async (farmId: string) => {
    try {
      const currentToken = localStorage.getItem("token");
      const res = await axiosClient.get("/farm/seed/all/" + farmId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  getAllFarmerInFarmService: async (farmId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/farm/farmer/all/" + farmId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  createNewSeed: async (value: any) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.post("/farm/seed/", value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  updateSeed: async (value: any, seedId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch("/farm/seed/" + seedId, value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  deleteSeed: async (seedId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.delete("/farm/seed/" + seedId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  createNewLand: async (value: any) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.post("/farm/land/", value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  updateLand: async (value: any, landId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch("/farm/land/" + landId, value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  deleteLand: async (landId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.delete("/farm/land/" + landId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  addFarmerIntoFarm: async (farmId: string, email: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.post("/farm/add-farmer/" + farmId, email, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  updateFarmProject: async (farmProjectId: string, value: any) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/farm-project/" + farmProjectId,
        value,
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  },
  getFarmProjectDetail: async (farmProjectId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/farm-project/" + farmProjectId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  createNewFarmProject: async (value: any) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.post("/farm-project/", value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  getFarmProjectLogList: async (farmProjectId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/farm-project/loglist", {
        headers: { Authorization: `Bearer ${currentToken}` },
        params: {
          farmProjectId: farmProjectId,
        },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
};

export default FarmServices;
