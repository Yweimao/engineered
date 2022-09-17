/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:56:59
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-16 14:45:05
 * @FilePath: /engineered/vite/lib/server/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const connect = require("connect");

const serverStaticMiddleware = require("../middlewares/static");
const resolveConfig = require("../config");
async function createServer() {
  //获取路径
  const config = await resolveConfig();
  const server = {
    async listen(port, callback) {
      const app = connect();
      app.use(serverStaticMiddleware(config));
      require("http").createServer(app).listen(port, callback);
    },
  };
  return server;
}
module.exports = { createServer };
