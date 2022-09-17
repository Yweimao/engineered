/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 21:01:04
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 23:23:14
 * @FilePath: /engineered/vite/lib/plugins/resolve.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const pathLib = require("path");
const resolve = require("resolve");
const fs = require("fs-extra");
const { isWindows } = require("../utils");

const srcTE = /^\/src/;

//既是一个vite插件也是一个rollup 插件
function resolvePlugin({ root }) {
  return {
    name: "resolve",
    //path绝对,相对,第三方,别名
    resolveId(path, importer) {
      //  /src/main.js
      if ((isWindows() || path.match(srcTE)) && path.startsWith("/")) {
        //如果path以/开头，说明它是一个根目录下的绝对路径
        return { id: pathLib.resolve(root, path.slice(1)) };
      }
      //如果path是一个绝对路径
      if (pathLib.isAbsolute(path)) {
        return { id: path };
      }

      //如果是相对路径的话
      if (path.startsWith(".")) {
        const baseDir = importer ? pathLib.dirname(importer) : root;
        const fsPath = pathLib.resolve(baseDir, path);
        return { id: fsPath };
      }
      if (path.startsWith("@")) {
        const baseDir = alias["@"];
        const fsPath = pathLib.resolve(baseDir, path);
        return { id: fsPath };
      }
      //如果是第三方的话
      let res = tryNodeResolve(path, importer, root);
      if (res) return res;
    },
  };
}
function tryNodeResolve(path, importer, root) {
  //vue/package.json
  const pkgPath = resolve.sync(`${path}/package.json`, { basedir: root });
  const pkgDir = pathLib.dirname(pkgPath);
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const entryPoint = pkg.module; //module字段指的是是es module格式的入口
  const entryPointPath = pathLib.join(pkgDir, entryPoint);
  //C:\vite50use\node_modules\vue\dist\vue.runtime.esm-bundler.js
  return { id: entryPointPath };
}
module.exports = resolvePlugin;
