/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-19 14:48:43
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-19 14:54:29
 * @FilePath: /vite/lib/plugins/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//拿到所有的插件
const resolvePlugin = require("./resolve");
function plugins(config) {
  return [resolvePlugin(config)];
}
module.exports = plugins;
