import { StaffDepartment } from "@/types/user";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export const checkRole = (role: number, department: StaffDepartment) => {
  var roleName = "";

  switch (role) {
    case 1: {
      roleName = "Tech Admin";
      break;
    }
    case 2: {
      roleName = "System Admin";
      break;
    }
    case 3: {
      roleName = "Farmer";
      break;
    }
    case 4: {
      if (department === StaffDepartment.HarvestInspection) {
        roleName = "Harvester";
        break;
      } else if (department === StaffDepartment.TransportSupervision) {
        roleName = "Transport Supervisor";
        break;
      } else if (department === StaffDepartment.WarehouseSupervision) {
        roleName = "Warehouse Supervisor";
        break;
      } else if (department === StaffDepartment.SupervisingProducer) {
        roleName = "Production Supervisor";
        break;
      } else {
        roleName = "Staff";
        break;
      }
    }
    default: {
      roleName = "No Role Yet";
    }
  }

  return roleName;
};

export const listMenuByRole = (role: number) => {
  var listMenu: ItemType[] = [];

  switch (role) {
    case 1: {
      listMenu = [
        { label: "Account Management", key: "/techAd-account-management" },
        { label: "Farm Management", key: "/farm-management" },
      ];
      break;
    }
    case 2: {
      listMenu = [
        // add label and key for list menu by role
        { label: "Test", key: "/test" },
      ];
      break;
    }
  }

  return listMenu;
};
