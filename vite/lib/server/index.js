/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:56:59
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-19 23:27:07
 * @FilePath: /engineered/vite/lib/server/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const connect = require("connect");

const serverStaticMiddleware = require("./middlewares/static");
const transformMiddleware = require("./middlewares/transform");
const { createOptimizeDepsRun } = require("../optimizer");
const resolveConfig = require("../config");
const { createPluginContainer } = require("./pluginContainer");
async function createServer() {
  //获取路径 | 内置查件
  const config = await resolveConfig();
  const middleware = connect();
  //获取插件容器对象
  const pluginContainer = await createPluginContainer(config);
  const server = {
    pluginContainer,
    async listen(port, callback) {
      //项目启动前进行依赖的预构建
      //1. 找到项目的依赖, 并存储到缓存文件
      await runOptimize(config, server);
      require("http").createServer(middleware).listen(port, callback);
    },
  };
  // 路径转化中间件
  //1. 将main.js import { createApp } from "vue"转换成 从 import { createApp } from "/node_modules/.vite/deps/vue.js 缓存目录中读取
  middleware.use(transformMiddleware(server));
  //静态文件中间件
  middleware.use(serverStaticMiddleware(config));
  return server;
}
async function runOptimize(config, server) {
  //创建依赖分析函数
  const optimizer = await createOptimizeDepsRun(config);
  // server上挂载vue引用的相对路径
  server._optimizeDepsMetadata = optimizer.metadata;
}
module.exports = { createServer };
