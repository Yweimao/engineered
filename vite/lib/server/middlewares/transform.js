/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-19 10:07:04
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-19 23:51:13
 * @FilePath: /vite/lib/middlewares/transform.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { isJsRequest } = require("../../utils");
const send = require("../send");
const transformRequest = require("../transformRequest");
function transformMiddleware(server) {
  return async function (req, res, next) {
    debugger;
    if (req.method !== "GET") {
      return next();
    }
    // 判断是否是.js的请求  => /src/main.js
    if (isJsRequest(req.url)) {
      const result = await transformRequest(req.url, server);
      if (result) {
        return send(req, res, result.code, "js");
      } else {
        return next();
      }
    } else {
      return next();
    }
  };
}

module.exports = transformMiddleware;
