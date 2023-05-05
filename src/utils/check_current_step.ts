import { CommonProjectState, ProjectDetailModel } from "@/types/project_model";

export const checkCurrentStepProject = (project: ProjectDetailModel) => {
    let value;
    if(project.produce.state === CommonProjectState.Completed) {
        value = 4;
    } else if(project.warehouseStorage.state === CommonProjectState.Completed) {
        value = 3;
    } else if(project.transport.state === CommonProjectState.Completed) {
        value = 2;
    } else if(project.harvest.state === CommonProjectState.Completed) {
        value = 1;
    } else {
        value = 0;
    }

    return value;
}