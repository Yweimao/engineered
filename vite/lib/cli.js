/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:51:10
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-16 00:03:28
 * @FilePath: /engineered/vite/lib/cli.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { createServer } = require("./server");
(async function () {
  const serve = await createServer();
  serve.listen("1111", () => {
    console.log("服务启动");
  });
})();
