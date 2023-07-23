module.exports = function (content, map, meta) {
  const callback = this.async()
  console.log('test2 - sync - ');
  setTimeout(() => {
    console.log('test2 - async - ', content);
    callback(null, content, map, meta)
  }, 3000)
}