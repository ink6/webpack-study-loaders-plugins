module.exports = function (content) {
  /*
  使用nomal-loader的问题：
    1. 直接使用style-loader，因为只能处理样式 不能处理样式中引入的其他资源 如url
      use: ["./loaders/style-loader"],

    2. 借助css-loader解决样式中引入的其他资源的问题 仍然有问题
      use: ["./loaders/style-loader", "css-loader"],
      问题是css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上
      不好操作

    3. style-loader使用pitch loader用法
  */
  // const script = 
  // `
  //   const styleEl = document.createElement("style");
  //   styleEl.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(styleEl);
  // `
  // return script
}
module.exports.pitch = function (remainingRequest) {
  // remainingRequest 剩下还需要处理的loader 这里是inline loader用法，代表后面还有一个css-loader等待处理
  // console.log(remainingRequest); // /Users/chenhui/MyBook/Study/webpack/webpack-source/node_modules/css-loader/dist/cjs.js!/Users/chenhui/MyBook/Study/webpack/webpack-source/src/css/index.css

  // 1. 将 remainingRequest 中绝对路径改成相对路径（因为后面只能使用相对路径操作）
  const relativePath = remainingRequest.split('!').map(absolutePath => {
    // console.log(this.context); // 第[0]个 /Users/chenhui/MyBook/Study/webpack/webpack-source/src/css
    // console.log(absolutePath); // [0] /Users/chenhui/MyBook/Study/webpack/webpack-source/node_modules/css-loader/dist/cjs.js
    const contextPath = this.utils.contextify(this.context, absolutePath)
    // console.log(contextPath); // [0] ../../node_modules/css-loader/dist/cjs.js
    return contextPath
  }).join('!')
  // console.log(relativePath); // ../../node_modules/css-loader/dist/cjs.js!./index.css
  // 2. 引入css-loader处理后的资源 import style from "!!${relativePath}" 
  // 3. 创建style，将内容插入页面中生效
  /*
    !!${relativeRequest} 
      relativeRequest：../../node_modules/css-loader/dist/cjs.js!./index.css
      relativeRequest是inline loader用法，代表要处理的index.css资源, 使用css-loader处理
      !!代表禁用所有配置的loader，只使用inline loader。（也就是外面我们style-loader和css-loader）,它们被禁用了，只是用我们指定的inline loader，也就是css-loader

    import style from "!!${relativeRequest}"
      引入css-loader处理后的css文件
      为什么需要css-loader处理css文件，不是我们直接读取css文件使用呢？
      因为可能存在@import导入css语法，这些语法就要通过css-loader解析才能变成一个css文件，否则我们引入的css资源会缺少
    const styleEl = document.createElement('style')
      动态创建style标签
    styleEl.innerHTML = style
      将style标签内容设置为处理后的css代码
    document.head.appendChild(styleEl)
      添加到head中生效
  */
  const script = 
  `
    import style from "!!${relativePath}" 
    const styleEl = document.createElement("style")
    styleEl.innerHTML = style
    document.head.appendChild(styleEl)
  `
  // import style from "!!${relativePath}"  加 !! 表示 跳过 pre、 normal 和 post loader。
  // style-loader是第一个loader, 由于return导致熔断，所以其他loader不执行了（不管是normal还是pitch）
  return script
}