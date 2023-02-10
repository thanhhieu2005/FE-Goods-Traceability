export const formatDateTime = (string: string) => {
    const date = new Date(string);

    return date.toLocaleDateString();
};