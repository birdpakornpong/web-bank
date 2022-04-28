
const round = (num) => {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

export const numberFormat = (num = 0) => {
    const number = num && round(num) || 0.00;
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}