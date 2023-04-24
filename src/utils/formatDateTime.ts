export const formatDateTime = (string: any) => {
    const date = new Date(string);

    return date.toLocaleDateString();
};

export const dateFormat = "DD/MM/YYYY";
