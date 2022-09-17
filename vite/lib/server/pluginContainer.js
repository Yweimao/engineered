/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 20:48:43
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 22:25:09
 * @FilePath: /engineered/vite/lib/server/pluginContainer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { normalizePath } = require("../utils");
/**
 * 创建插件的容器
 * @param  plugins 插件的数组，它的格式和rollup插件是一样的 {name,resolveId}
 * @param root 根目录
 * @return 容器对象
 */
async function createPluginContainer({ plugins }) {
  const container = {
    async resolveId(path, importer) {
      let resolveId = path;
      for (const plugin of plugins) {
        if (!plugin.resolveId) continue;
        const result = await plugin.resolveId.call(null, path, importer);
        if (result) {
          resolveId = result.id || result;
          break;
        }
      } // \ 变成 /
      return { id: normalizePath(resolveId) };
    },
    load() {},
    transform() {},
  };
  return container;
}
exports.createPluginContainer = createPluginContainer;
