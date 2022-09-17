/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 17:27:15
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 21:09:13
 * @FilePath: /vite/lib/optimizer/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const scanImports = require("./scan");
async function createOptimizeDepsRun(config) {
  //扫描文件的主题函数
  const deps = await scanImports(config);
  console.log(deps);
}

exports.createOptimizeDepsRun = createOptimizeDepsRun;
