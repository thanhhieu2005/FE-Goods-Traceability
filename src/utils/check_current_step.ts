import { CommonProjectState, ProjectDetailModel } from "@/types/project_model";

export const checkCurrentStepProject = (project: ProjectDetailModel) => {
  if (project?.farmProject === null) {
    return 0;
  } else {
    if (project?.produce.state === CommonProjectState.Completed) {
      return 4;
    } else if (
      project?.warehouseStorage.state === CommonProjectState.Completed
    ) {
      return 4;
    } else if (project?.transport.state === CommonProjectState.Completed) {
      return 3;
    } else if (project?.harvest.state === CommonProjectState.Completed) {
      return 2;
    } else if (project?.farmProject.state === CommonProjectState.Completed) {
      return 1;
    } else {
      return 0;
    }
  }
};
