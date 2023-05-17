import { CommonProjectState } from "@/types/project_model"

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
        default:
            return '';
    }
}

export const parseColorByCommonState = (state: CommonProjectState) => {
    switch(state) {
        case CommonProjectState.Processing:
            return '#1677ff';
        case CommonProjectState.Completed:
            return '#52c41a';
        case CommonProjectState.Pending:
            return '#ffec3d';
        case CommonProjectState.Canceled:
            return '#ff4d4f';
        default:
            return 'grey';
    }
}