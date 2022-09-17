/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 18:00:48
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 22:34:20
 * @FilePath: /viteuse/Users/ywm/learnProject/zhufengPoject/engineered/vite/lib/optimizer/getScanPlugin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require("fs-extra");
const htmlTypesRE = /\.html$/;
const scriptModuleRE = /<script\s+type="module"\s+src\="(.+?)">/;
const { createPluginContainer } = require("../server/pluginContainer");
const resolvePlugin = require("../plugins/resolve");
const { normalizePath } = require("../utils");
/**
 * 获取esbuild扫描插件的工厂方法
 * @param {*} config 配置对象 root
 * @param {*} depImports 将用来存放导入的模块
 */
async function getScanPlugin(config, depImports) {
  const container = await createPluginContainer({
    plugins: [resolvePlugin(config)],
    root: config.root,
  });
  const resolve = async function (path, importer) {
    //由插件容器进行路径解析，返回绝对路径
    return await container.resolveId(path, importer);
  };
  //rollup讲过如何写插件 {resolveId(path,importer){return 绝地路径}}
  //没有讲这个插件是如何运行的，插件机制是如何实现
  return {
    name: "scan", //依赖扫描插件
    setup(build) {
      //入口文件是index.html,找index.html它的真实路径，

      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        //把任意路径转成绝对路径 path可能是相对./index.html 绝对c:/index.html也可能是第三方 index
        const resolved = await resolve(path, importer);
        if (resolved) {
          return {
            path: resolved.id || resolved,
            namespace: "html",
          };
        }
      });
      build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
        //把任意路径转成绝对路径 path可能是相对./index.html 绝对c:/index.html也可能是第三方 index
        const resolved = await resolve(path, importer);
        if (resolved) {
          const id = resolved.id || resolved; //此模块的绝对路径
          if (id.includes("node_modules")) {
            depImports[path] = normalizePath(id); //key是包名，值是此包esmodule格式的入口文件的绝对路径
            return {
              path: id,
              external: true, //表示这是一个外部模块，不需要进一步处理了
            };
          } else {
            return {
              path: id,
            };
          }
        }
      });
      build.onLoad({ filter: htmlTypesRE, namespace: "html" }, ({ path }) => {
        // 需要把html转成JS才能进行后续的处理;
        const html = fs.readFileSync(path, "utf8");
        let [, src] = html.match(scriptModuleRE);
        let jsContent = `import ${JSON.stringify(src)}`; //import "/src/main.js"
        return {
          contents: jsContent,
          loader: "js",
        };
      });
    },
  };
}
module.exports = getScanPlugin;
