const arr1 = [1, 2];
const arr2 = arr1.concat([3, 4]);


// 
const arr3 = [1, 2];
const arr4 = [...arr1, 3, 4];




const evens = nums.filter(n => n % 2 === 0);
const nums = [1,2,3,4,5,6];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2,4,6]
// 
const products = [
  {name:"لپ تاپ", stock: 0},
  {name:"ماوس", stock: 5},
  {name:"کیبورد", stock: 3}
];
// 
const inStock = products.filter(p => p.stock > 0);
console.log(inStock.map(p => p.name)); // ["ماوس", "کیبورد"]
const required = ["name","email"];
const formData = {name:"علی", email:""};
const missing = required.filter(k => !formData[k]);
// 
const nums = [5, 12, 8, 130];
const found = nums.find(n => n > 10);
console.log(found); // 12

const users = [
  {id:1, email:"ali@test.com"},
  {id:2, email:"sara@test.com"}
];
const user = users.find(u => u.email === "sara@test.com");
console.log(user?.id); // 2
// 
['a', 'b'].forEach((item, i) => console.log(i, item));
const tasks = [{done:false},{done:false}];
tasks.forEach(t => t.done = true);
// 
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true
console.log(arr.includes(4)); // false
const admins = ["user1", "user2"];
const isAdmin = admins.includes(currentUser); // true/false
// 
const arr = ['Fire', 'Air', 'Water'];
console.log(arr.join(' - ')); // "Fire - Air - Water"

const pathParts = ['users', '13', 'posts'];
const url = '/' + pathParts.join('/');
console.log(url); // "/users/13/posts"

// 
// 
// const nums = [1, 2, 3, 4, 5];
// const doubled = nums.map(n => n * 2);
// console.log(doubled); // [2,4,6]
// const users = [{id:1,name:"علی"},{id:2,name:"سارا"}];
// const ids = users.map(u => u.id);
// console.log(ids); // [1,2]

// 
const sum = [1,2,3].reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 6

const people = [
  {name:"علی", role:"admin"},
  {name:"سارا", role:"user"},
  {name:"رضا", role:"admin"}
];
const grouped = people.reduce((acc, p) => {
  (acc[p.role] = acc[p.role] || []).push(p);
  return acc;
}, {});
console.log("forrrrrrrrr");
console.log(grouped);
// { admin: [{...}, {...}], user: [{...}] }
const stock = { laptop:3, mouse:5 };
const total = Object.values(stock).reduce((a,b) => a+b, 0);
console.log(total); // 8
// 
const prices = [1234.5, 5678.9];
console.log(prices.toLocaleString('fa-IR', {style:'currency', currency:'IRR'}));
// "۱٬۲۳۴٫۵ ریال،۵٬۶۷۸٫۹ ریال" (بسته به مرورگر)
const amounts = [125000, 340000];
const formatted = amounts.map(a => a.toLocaleString('fa-IR')).join(' و ');
console.log(formatted); // "۱۲۵٬۰۰۰ و ۳۴۰٬۰۰۰"
// 
