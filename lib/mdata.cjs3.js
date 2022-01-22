interface randOptions {
    max?: number;
    min?: number;
    step?: number;
}
declare type PhoneBaseType = '中国移动' | '中国电信' | '中国联通';
interface phoneOptions {
    length?: number;
    type?: PhoneBaseType | Array<PhoneBaseType> | Array<String> | (() => string);
}
declare const Mdata: {
    rand: {
        (): number;
        (op: randOptions): (options?: randOptions) => number;
    };
    phone: {
        (): string;
        (op: phoneOptions): (options: phoneOptions) => string;
    };
};

export { Mdata, phoneOptions, randOptions };
