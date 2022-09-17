/*
 * @Author: yeweimao yeweimao@zhuanzhuan.com
 * @Date: 2022-09-17 18:33:10
 * @LastEditors: yeweimao yeweimao@zhuanzhuan.com
 * @LastEditTime: 2022-09-17 18:33:51
 * @FilePath: /vite/doc/6.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const scriptModuleRE = /<script\s+type="module"\s+src\="(.+?)">/;
const html = '<script type="module" src="/src/main.js"></script>';
console.log(html.match(scriptModuleRE));
