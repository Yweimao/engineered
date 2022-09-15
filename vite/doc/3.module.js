/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-15 23:25:41
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-15 23:29:22
 * @FilePath: /engineered/vite/doc/module.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// es-module-lexer 是一个es 模块解析器, 可以解析es模块的导入导出
const { init, parse } = require("es-module-lexer");
(async function () {
  await init;
  const sourceCode = `import _ from 'lodash';\nexport var p = 5`;
  const [improts, exports] = parse(sourceCode);
  console.log(improts, exports);
})();
