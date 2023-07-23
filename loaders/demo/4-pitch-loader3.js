module.exports = function (content) {
  console.log('nomal3');
  this.callback(null, content)
}
module.exports.pitch = function () {
  console.log('pitch3');
}
