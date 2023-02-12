export const formatDateTime = (string: string) => {
    const date = new Date(string);

    return date.toLocaleDateString();
};

export const dateFormat = "YYYY/MM/DD";
