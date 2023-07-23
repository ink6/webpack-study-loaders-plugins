const babel = require("@babel/core");
const schema = require('./schema.json')
module.exports = function(content) {
  // https://www.babeljs.cn/docs/babel-core
  // 异步loader
  const callback = this.async()
  const options = this.getOptions(schema)
  // 使用babel对js代码进行编译
  babel.transform(content, options, function(err, result) {
    // result; // => { code, map, ast }
    if (err) callback(err)
    else {
      callback(null, result.code, result.map)
    }
  });
}