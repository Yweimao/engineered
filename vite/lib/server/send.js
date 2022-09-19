/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-19 11:32:10
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-19 11:40:49
 * @FilePath: /vite/lib/server/send.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const alais = {
  js: "application/javascript",
  html: "text/html",
  css: "text/css",
  json: "application/json",
};

function send(req, res, conent, type) {
  //设置响应格式
  res.setHeader("Content-Type", alais[type]);
  res.statusCode = 200;
  //写入响应并结束响应
  return res.end(conent);
}

module.exports = send;
