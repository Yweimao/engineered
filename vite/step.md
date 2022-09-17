<!--
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 16:55:42
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 17:18:47
 * @FilePath: /vite/step.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## 项目启动第一步

- 1.查找当前依赖的第三方模块
- 2.把他们的 es module 版本进行打包, 存放在`node_modules/.vite/deps_temp`

node_modules/.vite/deps_temp/vue.js
node_modules/.vite/deps_temp/\_metadata.json
node_modules\.vite\deps_temp 就是依赖缓存存放目录
{
"optimized": {
"vue": {
"src": "../../vue/dist/vue.runtime.esm-bundler.js",
"file": "vue.js"
}
},
}
