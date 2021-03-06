export interface RandOptions {
    max?: number;
    min?: number;
    step?: number;
}
declare type PhoneBaseType = '中国移动' | '中国电信' | '中国联通';
export interface PhoneOptions {
    length?: number;
    type?: PhoneBaseType | Array<PhoneBaseType> | Array<String> | (() => string);
}
declare const VOVEL_ALPHABET: string[];
export interface UsernameOptions {
    length?: number;
    vovelAlphabet?: typeof VOVEL_ALPHABET;
}
export interface RandataOptions<T = any> {
    dataSet?: T[];
}
export declare const COMMON_EMAIL_SERVICE: string[];
export interface EmailOptions {
    emailService?: string[] | 'rand';
    username?: () => string | 'rand';
}
export interface WordOptions {
    lang?: 'ch' | 'en';
    length?: number;
}
export interface ChineseNameOptions {
    surnames?: string[];
    names?: string[];
}
export interface DateOptions {
    year?: [number, number] | (() => number);
    month?: [number, number] | ((year: number) => number);
    day?: [number, number] | ((year: number, month: number) => number);
    hour?: [number, number] | ((year: number, month: number, day: number) => number);
    minute?: [number, number] | ((year: number, month: number, day: number, hour: number) => number);
    second?: [number, number] | ((year: number, month: number, day: number, hour: number, minute: number) => number);
    millisecond?: [number, number] | ((year: number, month: number, day: number, hour: number, minute: number, second: number) => number);
    format?: string | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => string);
}
export declare const Mdata: {
    rand: {
        (): number;
        (op: RandOptions): (options?: RandOptions) => number;
    };
    phone: {
        (): string;
        (op: PhoneOptions): (options?: PhoneOptions) => string;
    };
    maybeword: {
        (): string;
        (op: UsernameOptions): (options?: UsernameOptions) => string;
    };
    randata: {
        (): unknown;
        (op: RandataOptions<unknown>): <T>(options?: RandataOptions<T>) => T;
    };
    email: {
        (): string;
        (op: EmailOptions): (options?: EmailOptions) => string;
    };
    word: {
        (): string;
        (op: WordOptions): (options?: WordOptions) => string;
    };
    chineseName: {
        (): string;
        (op: ChineseNameOptions): (options?: ChineseNameOptions) => string;
    };
    date: {
        (): string;
        (op: DateOptions): (options?: DateOptions) => string;
    };
};
export {};
