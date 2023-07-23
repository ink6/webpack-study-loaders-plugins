// module.exports = __webpack_require__.p + \"static/images/074d0a3966.png\";
const loaderUtils = require('loader-utils')
function fileLoader (content, sourceMap) {
  // 1. 根据文件内容生成带hash值文件名
  let interpolatedName = loaderUtils.interpolateName(
    this,
    '[hash].[ext][query]',
    { content }
  );
  interpolatedName = `images/${interpolatedName}`
  // 2. 将文件输出出去
  this.emitFile(interpolatedName, content, sourceMap)
  // 3. 返回：module.exports = "文件路径（文件名）"
  return `module.exports = "${interpolatedName}"`
}
// 需要处理图片、字体等文件。它们都是buffer数据
// 需要使用raw loader才能处理
fileLoader.raw = true
module.exports = fileLoader