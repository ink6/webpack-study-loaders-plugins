// webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法
// 在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 。

module.exports = function (content) {
  console.log('nomal1');
  this.callback(null, content)
}
module.exports.pitch = function (content) {
  console.log('pitch1');
}
