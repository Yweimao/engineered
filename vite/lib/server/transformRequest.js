/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-19 11:51:32
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-19 23:43:19
 * @FilePath: /vite/lib/server/transformRequest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require("fs-extra");
async function transformRequest(url, server) {
  const { pluginContainer } = server;
  // // 拿到 /src/main.js的绝对路径
  const { id } = await pluginContainer.resolveId(url);
  // // 解析/src/main.js的内容
  const loadResult = await pluginContainer.load(id);
  let code;
  if (loadResult) {
    code = loadResult.code;
  } else {
    code = await fs.readFile(id, "utf-8");
  }
  // // 转换/src/main.js的内容
  // const result = await pluginContainer.transform(code, id);
  // return result;
}

module.exports = transformRequest;
