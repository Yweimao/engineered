/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 17:27:15
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-18 18:48:10
 * @FilePath: /vite/lib/optimizer/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const scanImports = require("./scan");
const { build } = require("esbuild");
const fs = require("fs-extra");
const { normalizePath } = require("../utils");
async function createOptimizeDepsRun(config) {
  /**
   * @function 扫描文件的主体函数
   * @param {Object} 根目录
   * @return {Object} 第三方依赖
   */
  //{
  //   vue: '/Users/ywm/learnProject/zhufengPoject/engineered/viteuse/node_modules/vue/dist/vue.runtime.esm-bundler.js'
  // }

  const deps = await scanImports(config);
  console.log(deps);
  //创建缓存目录
  // node_modules/.vite/deeps_temp
  //node_modules/.vite/deeps_temp/_metadata.json
  const { cacheDir } = config;
  const depsCacheDir = path.resolve(cacheDir, "deeps_temp");
  const metaDataPath = path.join(depsCacheDir, "_metadata.json");
  const metadata = {
    optimized: {},
  };

  for (const id in deps) {
    const entry = deps[id];
    // 内存里面存放是绝对路径, 硬盘里面存放是相对路径
    const file = path.resolve(depsCacheDir, id + ".js");
    metadata.optimized[id] = {
      scr: entry,
      file,
    };
    //第三方依赖进行预编译
    await build({
      absWorkingDir: config.root, //当前工作的目录
      entryPoints: [entry], //编译入口 绝对路径
      bundle: true,
      format: "esm",
      outfile: file,
      write: true,
    });
  }

  //写入metadata文件
  await fs.writeFile(
    metaDataPath,
    JSON.stringify(metadata, (key, value) => {
      if (key === "file" || key === "src") {
        return normalizePath(path.relative(depsCacheDir, value));
      }
      return value;
    })
  );
  return { metadata };
}

exports.createOptimizeDepsRun = createOptimizeDepsRun;
