/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:10:27
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-15 23:22:07
 * @FilePath: /engineered/vite/doc/static.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const connect = require("connect");
const app = connect();
const http = require("http");
// 静态文件中间件, 实现静态资源访问服务
const static = require("serve-static");
app.use((req, res, next) => {
  console.log("中间件1");
  next();
});
app.use((req, res, next) => {
  console.log("中间件2");
  next();
});
app.use(static(__dirname));

http.createServer(app).listen(3000, () => {
  console.log(30000);
});
