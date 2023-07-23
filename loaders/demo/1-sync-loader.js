// 同步loader
// module.exports = function (content, map, meta) {
//   console.log(content);
//   return content
// }

module.exports = function (content, map, meta) {
  console.log('test1', content, map, meta);
  /*
    第一个参数：err 代表是否有错误 没有则返回null
    第二个参数：content 初始化传入的内容 或者上个loader处理后的内容
    第三个参数：source-map 继续传递source-map
    第四个参数：meta 给下一个loader传递参数
  */
  this.callback(null, content, map, meta)

  // 同步loader中不能进行异步操作
  // throw new Error("callback(): The callback was already called.");
  // setTimeout(() => {
  //   console.log('test1 - async - ', content);
  //   this.callback(null, content, map, meta)
  // }, 3000)
}