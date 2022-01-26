import {HUNDRED_FAMILY_NAMES} from './baseData';
import {getDays, num2str} from './helper';

function createWrapper<T>(fn: T) {
    type In = typeof fn extends (op: infer T) => any ? T : undefined;
    type Out = typeof fn extends (op: any) => infer T ? T : undefined;

    function nfn(): Out;
    function nfn(op: In): T;
    function nfn(op?: In): (Out | T) {
        if (op) {
            return (fn as any).bind({}, op);
        }
        else {
            return (fn as any).call({});
        }
    }
    return nfn;
}


export interface RandOptions {
    // 开区间
    max?: number
    min?: number
    step?: number
}



const PHONE_HEADER_OF_TYPE: any = {
    '中国移动': ['134', '135', '136', '137', '138', '139', '140', '147', '150', '151', '152', '157', '158', '159', '182', '183', '187', '188'],
    '中国电信': ['133', '142', '144', '146', '148', '149', '153', '180', '181', '189'],
    '中国联通': ['130', '131', '132', '141', '143', '145', '155', '156', '185', '186']
}
type PhoneBaseType = '中国移动' | '中国电信' | '中国联通'
export interface PhoneOptions {
    length?: number,
    type?: PhoneBaseType | Array<PhoneBaseType> | Array<String> | (() => string)
}

const VOVEL_ALPHABET = ['a', 'e', 'i', 'o', 'u'];
export interface UsernameOptions {
    length?: number,
    vovelAlphabet?: typeof VOVEL_ALPHABET
}

export interface RandataOptions<T=any> {
    dataSet?: T[]
}

export const COMMON_EMAIL_SERVICE = [
    'qq.com',
    'gmail.com',
    '163.com',
    'fox.com',
    'yahoo.com',
    'msn.com',
    'hotmail.com',
    'aol.com',
    'ask.com',
    'live.com',
    '0355.net',
    '163.net',
    '263.net',
    '3721.net'
];
export interface EmailOptions {
    emailService?: string[] | 'rand'
    username?: ()=>string | 'rand'
}

export interface WordOptions {
    lang?: 'ch' | 'en',
    length?: number
}


export interface ChineseNameOptions {
    surnames?: string[]
    names?: string[]
}

export interface DateOptions {
    year?: [number, number] | (() => number),
    month?: [number, number] | ((year: number) => number),
    day?: [number, number] | ((year: number, month: number) => number),
    hour?: [number, number] | ((year: number, month: number, day: number) => number),
    minute?: [number, number] | ((year: number, month: number, day: number, hour: number) => number),
    second?: [number, number] | ((year: number, month: number, day: number, hour: number, minute: number) => number),
    millisecond?: [number, number] | ((year: number, month: number, day: number, hour: number, minute: number, second: number) => number),
    format?: string | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number)=>string)
}

export const Mdata = {
    // 获取随机数
    rand: createWrapper((options: RandOptions = {}) => {
        const min = options.min || 0;
        const max = options.max || 1;
        const step = options.step || .1;
        return Math.floor(((Math.random()) * (max - min) + min) / step) * step
    }),
    // 获取手机号
    phone: createWrapper((options: PhoneOptions = {}) => {
        const phone_type = options.type || ['中国移动', '中国电信', '中国联通'];
        const length = options.length || 11;
        let headerGen = [] as Array<string>;
        let headerGenFn = null;
        if (typeof phone_type === 'string') headerGen.push(...PHONE_HEADER_OF_TYPE[phone_type] || []);
        if (typeof phone_type === 'object' && typeof phone_type[0] === 'string') phone_type.forEach(typeItem => headerGen.push(...PHONE_HEADER_OF_TYPE[typeItem as string] || typeItem));
        if (typeof phone_type === 'function') {
            headerGenFn = phone_type;
        } else {
            headerGenFn = () => {
                const max = headerGen.length as number;
                return headerGen[Mdata.rand({max, step: 1})()];
            }
        }
        let fulled = '';
        let header = headerGenFn();
        for(let i = 0; i < length - header.length; i++) fulled += Mdata.rand({max: 10, step: 1})().toString();
        return header + fulled
    }),
    // 可能是一个单词
    maybeword: createWrapper((options:UsernameOptions = {})=>{
        const len = options.length || Mdata.rand({max: 16, min: 2, step: 1})();
        const alphabetIndexRand = Mdata.rand({min: 1, max: 26, step: 1});
        
        const vovelAlphabet = options.vovelAlphabet || VOVEL_ALPHABET;
        const vblen = vovelAlphabet.length;
        const vovelIndexRand = Mdata.rand({min: 1, max: vblen-1, step: 1});
        let vovelRate = .2;
        let res = '';
        for(let i = 0; i < len; i++) {
            const rate = Mdata.rand();
            if(i === len - 1) vovelRate = 0.3;
            if(rate < vovelRate) {
                const index = vovelIndexRand();
                res+=vovelAlphabet[index];
                if(vovelRate > 0) vovelRate -= 0.4;
            }else{
                res+=String.fromCharCode(97+alphabetIndexRand());
                if(vovelRate < 1) vovelRate += 0.2;
            }
        }
        return res;
    }),
    // 从一个数据集中随机取一个
    randata: createWrapper(<T>(options:RandataOptions<T> = {})=>{
        const dataSet = options.dataSet || [];
        if(!dataSet.length) null;
        const index = Mdata.rand({min: 0, max: dataSet.length, step: 1})();
        return dataSet[index];
    }),
    // 获取一个电子邮箱
    email: createWrapper((options:EmailOptions = {})=>{
        const emailService = options.emailService || COMMON_EMAIL_SERVICE;
        const username = options.username || Mdata.maybeword();
        let suffix = '';
        
        if(emailService instanceof Array) {
            suffix = Mdata.randata({dataSet: emailService})();
        }
        if(emailService === 'rand') {
            const smallRand = Mdata.rand({max: 6, min: 2, step: 1});
            suffix = Mdata.maybeword({length:smallRand()})();
            suffix+='.';
            suffix += Mdata.maybeword({length:smallRand()})();
        }
        return `${username}@${suffix}`;
    }),
    word: createWrapper((options:WordOptions = {})=>{
        const lang = options.lang || 'en';
        const length = options.length || 1;
        let ret = '';
        if(lang === 'en') {
            // 65-90
            const srand = Mdata.rand({min: 0, max: 52, step: 1});
            for(let i = 0; i < length; i++) {
                const index = srand();
                if(index > 25) {
                    ret += String.fromCharCode(97+index-26);
                }else{
                    ret += String.fromCharCode(97+index);
                }
            }
            return ret;
        }
        if(lang === 'ch') {
            // 65-90
            const srand = Mdata.rand({min: 19968, max: 40869, step: 1});
            
            for(let i = 0; i < length; i++) {
                const index = srand();
                ret += String.fromCharCode(index);
            }
            return ret;
        }
        return ret;
    }),
    // 获取一个中文名
    chineseName: createWrapper((options:ChineseNameOptions = {})=>{
        const surnames = options.surnames || HUNDRED_FAMILY_NAMES;
        const names = options.names || null;

        let ret = '';
        ret += surnames[  Mdata.rand({min: 0, max: surnames.length, step: 1})() ];
        if(names) {
            ret += surnames[  Mdata.rand({min: 0, max: names.length, step: 1})() ];
            return ret;
        }

        const srand = Mdata.rand({min: 0, max: 1, step: 0.1});
        for(let i = -0.1; i < srand(); i+=0.35) {
            ret +=  Mdata.word({lang: 'ch'})();
        }
        return ret;
    }),
    // 获取一个日期
    date: createWrapper((options:DateOptions = {}) => {
        let year, month, day, hour, min, sec, ms;
        const opYear = options.year || [1900, 2100];
        year = opYear instanceof Array ? Mdata.rand({min: opYear[0], max: opYear[1] + 1, step: 1})() : opYear();

        const opMonth = options.month || [1, 12];
        month = opMonth instanceof Array ? Mdata.rand({min: opMonth[0], max: opMonth[1] + 1, step: 1})() : opMonth(year);

        const opDay = options.day || [1, getDays(year, month)];
        day = opDay instanceof Array ? Mdata.rand({min: opDay[0], max: opDay[1] + 1, step: 1})() : opDay(year, month);

        const opHour = options.hour || [1, 24];
        hour = opHour instanceof Array ? Mdata.rand({min: opHour[0], max: opHour[1] + 1, step: 1})() : opHour(year, month, day);

        const opMinute = options.minute || [1, 60];
        min = opMinute instanceof Array ? Mdata.rand({min: opMinute[0], max: opMinute[1] + 1, step: 1})() : opMinute(year, month, day, hour);

        const opSecond = options.second || [1, 60];
        sec = opSecond instanceof Array ? Mdata.rand({min: opSecond[0], max: opSecond[1] + 1, step: 1})() : opSecond(year, month, day, hour, min);

        const opMillisecond = options.millisecond || [1, 1000];
        ms = opMillisecond instanceof Array ? Mdata.rand({min: opMillisecond[0], max: opMillisecond[1] + 1, step: 1})() : opMillisecond(year, month, day, hour, min, sec);

        const format = options.format || 'YYYY-MM-DD hh:mm:ss';
        if(typeof format === 'function') return format(year, month, day, hour, min, sec, ms);

        if(typeof format !== 'string') throw Error('format期望是一个函数或者一个字符串');

        let i = -1; // 当前匹配位置
        let s = ''; // 状态
        let l = 0; // 同状态长度
        let r = ''; // 内容
        const dmap = {
            Y: year,
            M: month,
            D: day,
            h: hour,
            m: min,
            s: sec
        } as any;
        while(++i < format.length) {
            if(/[yY]/.test(format[i]) && (!s || s === 'Y')) {
                s = 'Y';
                l++;
                continue;
            }
            if(/[M]/.test(format[i]) && (!s || s === 'M')) {
                s = 'M';
                l++;
                continue;
            }
            if(/[Dd]/.test(format[i]) && (!s || s === 'D')) {
                s = 'D';
                l++;
                continue;
            }
            if(/[Hh]/.test(format[i]) && (!s || s === 'h')) {
                s = 'h';
                l++;
                continue;
            }
            if(/[m]/.test(format[i]) && (!s || s === 'm')) {
                s = 'm';
                l++;
                continue;
            }
            if(/[Ss]/.test(format[i]) && (!s || s === 's')) {
                s = 's';
                l++;
                continue;
            }
            if(/[\\]/.test(format[i])) {
                r+=`${dmap[s] ? num2str(dmap[s], l) : ''}`;
                l=0;
                s='';
                s = 'changed';
                continue;
            }

            r+=`${dmap[s] ? num2str(dmap[s], l) : ''}${format[i]}`;
            l=0;
            s='';
        }
        r+=`${dmap[s] ? num2str(dmap[s], l) : ''}`;
        return r;
    })
}