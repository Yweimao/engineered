/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 21:25:25
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 21:25:31
 * @FilePath: /viteuse/vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
};
