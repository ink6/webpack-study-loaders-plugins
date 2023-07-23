module.exports = function (content) {
  console.log('nomal2');
  this.callback(null, content)
}
module.exports.pitch = function (content) {
  console.log('pitch2');
  // return 'result'
}
