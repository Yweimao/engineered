/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:33:03
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 16:10:19
 * @FilePath: /engineered/vite/doc/4.resolve.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//拿到npm包的入口
const resolve = require("resolve");
const res = resolve.sync("check-is-array", { basedir: __dirname });
console.log(res);
///Users/ywm/learnProject/zhufengPoject/engineered/vite/node_modules/check-is-array/index.js
