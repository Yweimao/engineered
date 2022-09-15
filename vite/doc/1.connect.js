/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 22:58:47
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-15 23:03:20
 * @FilePath: /engineered/vite/doc/connect.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const connect = require("connect");
const app = connect();
const http = require("http");
app.use((req, res, next) => {
  console.log("中间件1");
  next();
});
app.use((req, res, next) => {
  console.log("中间件2");
  next();
});

http.createServer(app).listen(3000);
