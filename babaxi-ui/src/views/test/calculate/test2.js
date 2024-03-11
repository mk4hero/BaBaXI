// 第一题
// // 异步函数
// function isAsyncFunction(func){
//     // console.log(func instanceof AsyncFunction);
//     return Object.prototype.toString.call(func) === '[object AsyncFunction]'
//     console.log(Object.prototype.toString.call(func));
//     console.dir(func);
// }

// console.log(isAsyncFunction(() => {}));// false
// console.log(isAsyncFunction(async () => {}));// true

// 第二题
import getName from './getName';

const template = '1,2-3_12——13';

const result = template.replace(/\d+/g, function (match){
    return getName(match);
});
console.log(result);
