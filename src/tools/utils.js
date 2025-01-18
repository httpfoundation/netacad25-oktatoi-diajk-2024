export function getHungarianYearPostfix(year) {
    if (typeof year === 'string') year = parseInt(year);

    const lastDigit = year % 10;

    switch (year) {
        case 2010:
            return `${year}-es`;
        case 2020:
            return `${year}-as`;
        case 2030:
            return `${year}-as`;
        case 2040:
            return `${year}-es`;
        case 2050:
            return `${year}-es`;
    }

    switch (lastDigit) {
        case 1:
            return `${year}-es`;
        case 2:
            return `${year}-es`;
        case 3:
            return `${year}-as`;
        case 4:
            return `${year}-es`;
        case 5:
            return `${year}-ös`;
        case 6:
            return `${year}-os`;
        case 7:
            return `${year}-es`;
        case 8:
            return `${year}-as`;
        case 9:
            return `${year}-es`;
        default:
            return `${year}-es`;
    }
}
