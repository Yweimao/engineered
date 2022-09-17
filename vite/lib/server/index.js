/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:56:59
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 23:28:13
 * @FilePath: /engineered/vite/lib/server/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const connect = require("connect");

const serverStaticMiddleware = require("../middlewares/static");
const { createOptimizeDepsRun } = require("../optimizer");
const resolveConfig = require("../config");
async function createServer() {
  //获取路径
  const config = await resolveConfig();
  const server = {
    async listen(port, callback) {
      //项目启动前进行依赖的预构建
      //1. 找到项目的依赖
      debugger;
      await runOptimize(config);
      const app = connect();
      app.use(serverStaticMiddleware(config));
      require("http").createServer(app).listen(port, callback);
    },
  };
  return server;
}
async function runOptimize(config) {
  //创建依赖分析函数
  await createOptimizeDepsRun(config);
}
module.exports = { createServer };
