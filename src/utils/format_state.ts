import { CommonProjectState } from "@/types/project_model"
import { StaffDepartment, UserRole } from "@/types/user";
import { mainColor } from "./app_color";

export const parseToStringCommonState =(state: CommonProjectState) => {
    switch(state) {
        case CommonProjectState.Processing:
            return 'Processing';
        case CommonProjectState.Completed:
            return 'Completed';
        case CommonProjectState.Pending:
            return 'Pending';
        case CommonProjectState.Canceled:
            return 'Cancel';
        case CommonProjectState.NotYet:
            return 'Not Yet'
        default:
            return 'Not Yet';
    }
}

export const parseColorByCommonState = (state: CommonProjectState) => {
    switch(state) {
        case CommonProjectState.Processing:
            return '#1677ff';
        case CommonProjectState.Completed:
            return '#52c41a';
        case CommonProjectState.Pending:
            return mainColor;
        case CommonProjectState.Canceled:
            return '#ff4d4f';
        default:
            return 'grey';
    }
}

export const parseToStringDepartment = (department: StaffDepartment) => {
    switch(department) {
        case StaffDepartment.Empty:
            return 'Not Department Yet';
        case StaffDepartment.HarvestInspection:
            return 'Harvest Inspection';
        case StaffDepartment.TransportSupervision:
            return 'Transport Supervision';
        case StaffDepartment.WarehouseSupervision:
            return 'Warehouse Supervision';
        case StaffDepartment.SupervisingProducer:
            return 'Supervising Producer';
        default:
            return '';
    }
}

export const parseToStringRole = (role: UserRole) => {
    switch(role) {
        case UserRole.TechnicalAdmin:
            return 'Technical Admin';
        case UserRole.SystemAdmin:
            return 'System Admin';
        case UserRole.Staff:
            return 'Staff';
        case UserRole.Farmer:
            return 'Farmer';
       
        default:
            return '';
    }
}