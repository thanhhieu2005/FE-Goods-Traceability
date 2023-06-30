import { axiosClient } from "@/services/axios";
import { AxiosError } from "axios";

export const GetAllProjectAPI = async () => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.get("/project/", {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProjectDetailByID = async (projectId: string) => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.get("/project/" + projectId, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CreateNewProjectService = async (value: any) => {
  try {
    const currentToken = localStorage.getItem("token");

    console.log(currentToken);

    const res = await axiosClient.post("/project/", value, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    return res;
  } catch (err: any) {
    console.log("Test", err);
    if (err === AxiosError) return err.response;
    return err;
  }
};

export const UpdateProjectInfo = async (value: any, projectId: string) => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.patch("/project/" + projectId, value, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const ProjectServices = {
  addHarvestorIntoProject: async (email: string, harvestId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/harvest/add-harvestor",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            email: email,
            harvestId: harvestId,
          },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  removeHarvestorInProject: async (harvestId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/harvest/remove-harvestor",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            harvestId: harvestId,
          },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  addTransportSupervisor: async (email: string, transportId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/transport/add-transport-supervision",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            email: email,
            transportId: transportId,
          },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  removeTransportSupervisor: async (transportId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/transport/remove-transport-supervision",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            transportId: transportId,
          },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  addWarehouseStorageSupervisor: async (
    email: string,
    warehouseStorageId: string
  ) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/warehouse-storage/add-warehouse-supervision",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            email: email,
            warehouseStorageId: warehouseStorageId,
          },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  removeWarehouseStorageSupervisor: async (warehouseStorageId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/warehouse-storage/remove-warehouse-supervision",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            warehouseStorageId: warehouseStorageId,
          },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  addProduceSupervisor: async (email: string, produceSupervisionId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch(
        "/produce/add-produce-supervision",
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            email: email,
            produceSupervisionId: produceSupervisionId,
          },
        }
      );

      return res;

    } catch (err) {
      return err;
    }
  },
  removeProduceSupervisor: async (produceSupervisionId: string) => {
    try {
        const currentToken = localStorage.getItem("token");

        const res = await axiosClient.patch(
            "/produce/remove-produce-supervision",
            {},
            {
              headers: { Authorization: `Bearer ${currentToken}` },
              params: {
                produceSupervisionId: produceSupervisionId,
              },
            }
          );
    
          return res;
    } catch(err) {
        return err;
    }
  },
  getProductsByProjectId: async(projectId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get(
        '/product/all-by-project',
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          params: {
            projectId: projectId,
          },
        },
      );

      return res;
    } catch(err) {
      return err;
    }
  }
};

export default ProjectServices;
