import './css/index.css'

console.log("hello main1");
console.log("hello main2");
console.log("hello main3");
console.log("hello main4");
console.log("hello main5");


const sum = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};
