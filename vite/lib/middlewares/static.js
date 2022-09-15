/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-16 00:12:47
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-16 00:14:08
 * @FilePath: /engineered/vite/lib/middlewares/static.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const static = require("serve-static");
function serverStaticMiddleware({ root }) {
  return static(root);
}

module.exports = serverStaticMiddleware;
