export const humanReadableDate = (stringISO) => {
    const date = new Date(stringISO);
    return date.toLocaleDateString();
}
