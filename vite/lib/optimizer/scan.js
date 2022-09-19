/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 17:29:51
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-18 18:25:17
 * @FilePath: /vite/lib/optimizer/scan.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const path = require("path");
const { build } = require("esbuild");
const getScanPlugin = require("./getScanPlugin");
/**
 * 扫描文件的主题函数
 * @param {*} config  当前工作目录的路径
 */
async function scanImports(config) {
  // 此处存放依赖导入
  const deepImports = {};
  // 创建一个esbuid 扫描插件
  const scanPlugin = await getScanPlugin(config, deepImports);
  await build({
    absWorkingDir: config.root, //当前工作的目录
    entryPoints: [path.resolve("./index.html")], //编译入口 绝对路径
    bundle: true,
    format: "esm",
    outfile: "./dist/bundle.js",
    write: true, // 在真实的代码中, write = false 不需要写入硬盘
    plugins: [scanPlugin],
  });
  return deepImports;
}
module.exports = scanImports;
