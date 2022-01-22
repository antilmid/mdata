const mdata = require('../lib/index').Mdata;

console.log('data: ', mdata.maybeword() );


class ExecTime {
    constructor () {
        this.__lastcall = (new Date).getTime();
    }
    start(){
        this.__lastcall = (new Date).getTime();
    }
    end(){
        const curTime = (new Date).getTime();
        console.log();
        console.log(`...运行用时${curTime - this.__lastcall}毫秒`);
        console.log();
    }
}

// 基础随机测试用例
// ((times, t = new ExecTime)=>{
//     const rand = mdata.rand({min: 0, max: 10, step: 1});
//     const obj = {};
//     for(let i = 0; i < times; i++) {
//         const index = rand();
//         obj[index] ? (obj[index]++):obj[index] = 1;
//     }

//     console.log("# 基础随机测试结果")
//     Object.keys(obj).forEach(index => {
//         console.log(`- ${index}: ${obj[index]}`)
//     })
//     t.end();
    
// })(10000);

// 测试电子邮箱
// ((times, t = new ExecTime)=>{
//     console.log("# 邮箱测试结果")
//     for(let i = 0; i < times / 2; i++) {
//         const email = mdata.email();
//         console.log(`- ${email}`);
//     }
//     console.log()
//     for(let i = 0; i < times / 2; i++) {
//         const email = mdata.email({emailService: 'rand'})();
//         console.log(`- ${email}`);
//     }
//     t.end();
// })(10);

// 测试中文名
((times, t = new ExecTime)=>{
    console.log("# 中文名测试结果")
    for(let i = 0; i < times; i++) {
        const cname = mdata.chineseName();
        console.log(`- ${cname}`);
    }
    t.end();
})(10);
