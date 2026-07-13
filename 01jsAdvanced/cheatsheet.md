# JavaScript ES6+ Cheat Sheet – کارگاه آموزشی

## Arrow Functions
const add = (a, b) => a + b;
// با یک پارامتر:  const double = n => n * 2;
// بدون پارامتر:   const now = () => new Date();
// بدنه چندخطی:    const fn = (x) => { ...; return ...; };
// `this` به بافت بیرونی اشاره می‌کند (مناسب callback)

## Destructuring
// شیء
const { name, age } = user;
// آرایه
const [first, second] = arr;
// در پارامترها: function({ id }) { ... }

## Classes
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(`${this.name} makes sound`); }
  static info() { return "کلاس حیوانات"; }
}
class Dog extends Animal {
  speak() { console.log("Woof"); }
}
const d = new Dog("Rex");

## Modules
// export (math.js)
export const sum = (a, b) => a + b;
export default function greet() { ... }
// import
import { sum } from "./math.js";
import greet from "./math.js";
// در Node: package.json ← "type": "module"

## Array Operators
const arr = [1, 2, 3];

// map → تبدیل هر عنصر
arr.map(n => n * 2)                        // [2,4,6]

// filter → گزینش با شرط
arr.filter(n => n > 1)                     // [2,3]

// find → اولین عضو با شرط
arr.find(n => n > 1)                       // 2

// reduce → تجمیع به یک مقدار
arr.reduce((acc, cur) => acc + cur, 0)     // 6

// forEach → پیمایش (بدون return)
arr.forEach((item, i) => console.log(i, item))

// includes → بررسی وجود
arr.includes(2)                            // true

// join → اتصال عناصر با جداکننده
arr.join(" - ")                            // "1 - 2 - 3"

// Spread (...) → کپی/ادغام
const arr2 = [...arr, 4, 5];               // [1,2,3,4,5]

// toLocaleString → فرمت عددی محلی
(125000).toLocaleString('fa-IR')           // "۱۲۵٬۰۰۰"

## Promises & Async/Await
// ساخت Promise
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});
// then/catch
p.then(result => console.log(result))
 .catch(err => console.error(err));

// async/await
async function fetchData() {
  try {
    const data = await p;  // منتظر می‌ماند
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}