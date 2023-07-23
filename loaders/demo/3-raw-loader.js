// 默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 raw 为 true，loader 可以接收原始的 Buffer。
// 一般用于处理图片 字体图库等数据

// module.exports = function(content) {
//   console.log(content); // <Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 22 68 65 6c 6c 6f 20 6d 61 69 6e 22 29 3b>
//   return content
// }
// module.exports.raw = true


function rawLoader (content) {
  console.log(content); // <Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 22 68 65 6c 6c 6f 20 6d 61 69 6e 22 29 3b>
  return content
}

rawLoader.raw = true

module.exports = rawLoader
