// ==========================================
// 00_arrow_functions.js – توابع پیکانی (ES6)
// ==========================================

//
function addOld(a, b) {
  return a + b;
}

// 
const add = (a, b) => a + b;

console.log("addOld(2,3):", addOld(2, 3)); // 5
console.log("add(2,3):", add(2, 3));       // 5

// 
const greet = name => `سلام ${name}`;
console.log(greet("علی"));                 // سلام علی

// 
const getNow = () => new Date().toLocaleTimeString("fa-IR");
console.log(getNow());

// 
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
console.log("multiply(4,5):", multiply(4, 5)); // 20

// 
const person = {
  name: "علی",
  sayLaterOld: function () {
    setTimeout(function () {
      console.log("Old this.name:", this.name); // undefined
    }, 100);
  },
  sayLaterNew: function () {
    setTimeout(() => {
      console.log("New this.name:", this.name); // علی
    }, 150);
  }
};
person.sayLaterOld();
person.sayLaterNew();
