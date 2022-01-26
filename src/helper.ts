// 闰年判断
export function isLeapYear(year:number|string) {
    year = Number(year);
    return year % 4 === 0 || year % 400 === 0;
}

// 获取某年某月有多少天
export function  getDays(year: number|string, month: number|string) {
    year = Number(year);
    month = Number(month);
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if(isLeapYear(year)) return 29;
            return 28;
        default:
            return 0;
    }
}

export function num2str(num: number, strLength: number = 2) {
    let res = num.toString();
    let i = strLength - res.length;
    while(i > 0) {
        res=`0${res}`;
        i--;
    }
    return res.slice(0, strLength);
}