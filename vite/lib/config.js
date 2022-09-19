/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-16 00:17:42
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-18 11:06:54
 * @FilePath: /engineered/vite/lib/config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const { normalizePath } = require("./utils");
function resolveConfig() {
  const root = normalizePath(process.cwd());
  //缓存目录存放的文件夹
  const cacheDir = normalizePath(path.resolve(`node_modules/.vite50`));
  const config = {
    root,
    cacheDir,
  };
  return config;
}
module.exports = resolveConfig;
