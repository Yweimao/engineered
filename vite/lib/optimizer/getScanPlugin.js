/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 18:00:48
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-18 18:44:10
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
      //解析文件路径
      debugger;
      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        // 把任意路径转化成绝对路径
        debugger;
        const resolved = await resolve(path, importer);
        if (resolved) {
          return {
            path: resolved.id || resolved,
            namespace: "html",
          };
        }
      });
      // //匹配任意文件
      build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
        // 把任意路径转化成绝对路径
        const resolved = await resolve(path, importer);
        const id = resolved.id || resolved;
        if (id) {
          if (id.includes("node_modules")) {
            depImports[path] = normalizePath(id);
            // 判断是否为外部模块的引用
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
      //加载文件内容
      build.onLoad(
        { filter: htmlTypesRE, namespace: "html" },
        async ({ path }) => {
          //读取到.html文件内容
          const html = await fs.readFileSync(path, "utf8");
          //读取到内容 匹配 <script type="module" src="/src/main.js"></script> 字符串
          //拿到 /src/main.js
          const [, src] = html.match(scriptModuleRE);
          // 转化成import 导入  import '/src/main.js'
          const jsContent = `import ${JSON.stringify(src)}`;
          return {
            contents: jsContent,
            loader: "js",
          };
        }
      );
    },
  };
}
module.exports = getScanPlugin;
