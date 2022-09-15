/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:45:00
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-15 23:46:16
 * @FilePath: /engineered/vite/doc/5.glob.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const glob = require("fast-glob");
(async () => {
  const entries = await glob(["**/*.js"]);
  console.log(entries);
})();

// [
//   '1.connect.js',
//   '2.static.js',
//   '3.module.js',
//   '4.resolve.js',
//   '5.glob.js'
// ]
