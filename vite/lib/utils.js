/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-16 00:18:29
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-16 00:18:38
 * @FilePath: /engineered/vite/lib/utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function normalizePath(path) {
  //保证所有的路径路径分隔符全部是/,而非\
  return path.replace(/\\/g, "/");
}
exports.normalizePath = normalizePath;
