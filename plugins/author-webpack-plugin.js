
// 给js css 文件添加author前缀
class AuthorWebpackPlugin {
  constructor(options = {}) {
    this.options = options
  }
  apply(compiler) {
    // debugger
    // console.log(compiler);
    // emit 输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器
    compiler.hooks.emit.tap('AuthorWebpackPlugin', (compilation) => {
      console.log(compilation);
      // compilation.assets
      // images/3ed69ba1f4164e71.gif: RawSource{}
      // js/main.js: CachedSource{}
      const extensions = ["css", "js"];
      // 1. 获取即将输出的资源文件：compilation.assets
      // 2. 过滤只保留js和css资源
      const assets = Object.keys(compilation.assets).filter(assetPath => {
        // 将文件名切割 ['xxxx', 'js'] ['xxxx', 'css']
        const splitted = assetPath.split('.')
        // 获取最后一个文件扩展名
        const extension = splitted[splitted.length - 1]
        // 判断是否包括
        return extensions.includes(extension)
      })
      // console.log(assets); // assets: ['js/main.js']
      const prefix = `/*
* Author: ${this.options.author}
*/
`;
      // 3. 遍历剩下资源添加上注释
      assets.forEach(asset => {
        // 获取原来内容
        const source = compilation.assets[asset].source();
        console.log(source);
        const content = prefix + source
        // 修改资源
        compilation.assets[asset] = {
          // 最终资源输出时，调用source方法，source方法的返回值就是资源的具体内容
          source() {
            return content
          },
          // 资源大小
          size() {
            return content.length
          }
        }
      })
    })
  }
}
module.exports = AuthorWebpackPlugin