console.log("=== 1. Spread Operator ===");
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // [1,2,3,4]

console.log("\n=== 2. filter ===");
const nums = [1,2,3,4,5,6];
const evens = nums.filter(n => n % 2 === 0);
console.log("زوج‌ها:", evens); // [2,4,6]

const products = [
  {name:"لپ تاپ", stock: 0},
  {name:"ماوس", stock: 5},
  {name:"کیبورد", stock: 3}
];
const inStock = products.filter(p => p.stock > 0);
console.log("موجودها:", inStock.map(p => p.name)); // ["ماوس", "کیبورد"]

console.log("\n=== 3. find ===");
const found = nums.find(n => n > 10);
console.log("اولین عدد >10:", found); // undefined (چون 6 کوچکتر از 10 است، بیاییم آرایه رو عوض کنیم)
const bigNums = [5, 12, 8, 130];
console.log("پیدا شده:", bigNums.find(n => n > 10)); // 12

console.log("\n=== 4. forEach ===");
['a', 'b'].forEach((item, i) => console.log(i, item));

console.log("\n=== 5. includes ===");
const arr = [1, 2, 3];
console.log("شامل ۲؟", arr.includes(2)); // true

console.log("\n=== 6. join ===");
const pathParts = ['users', '13', 'posts'];
const url = '/' + pathParts.join('/');
console.log("URL:", url); // "/users/13/posts"

console.log("\n=== 7. map ===");
const doubled = nums.map(n => n * 2);
console.log("دو برابر:", doubled); // [2,4,6,8,10,12]

console.log("\n=== 8. reduce ===");
const sum = [1,2,3].reduce((acc, cur) => acc + cur, 0);
console.log("مجموع:", sum); // 6

const stock = { laptop:3, mouse:5 };
const total = Object.values(stock).reduce((a,b) => a+b, 0);
console.log("کل موجودی:", total); // 8

console.log("\n=== 9. toLocaleString ===");
const amounts = [125000, 340000];
const formatted = amounts.map(a => a.toLocaleString('fa-IR')).join(' و ');
console.log("مبلغ‌ها:", formatted); // "۱۲۵٬۰۰۰ و ۳۴۰٬۰۰۰"


console.log("*********************");

const productsAdvanced = [
  { name: "laptop", stock: 0, id: "1" },
  { name: "mouse", stock: 5, id: "2" },
  { name: "keyBoard", stock: 3, id: "3" },
  { name: "monitor", stock: 13, id: "3" },
  { name: "monitor-gaming", stock: 33, id: "3" },
];
const query = "mo"

const res = productsAdvanced.filter(product=>{
  return product.name.includes(query)
})
console.log(res);