عالی، این دقیقاً همون پایه‌هایی هست که اگر درست یاد بگیری، بعداً **Node.js و NestJS و حتی React** برات خیلی راحت میشه.

من این موضوع رو برات مثل یک مسیر واقعی برنامه‌نویسی جلو می‌برم:
از ساده → حرفه‌ای → کاربردی + تمرین + پروژه

---

# 1. Promise در جاوااسکریپت

## مشکل قبل از Promise (Callback Hell)

فرض کن می‌خوای این کارها رو انجام بدی:

1. گرفتن کاربر
2. گرفتن سفارش‌های کاربر
3. گرفتن جزئیات سفارش

### ❌ روش بد (Callback Hell)

```js
function getUser(callback) {
  setTimeout(() => {
    console.log("User fetched");
    callback({ id: 1, name: "Ali" });
  }, 1000);
}

function getOrders(userId, callback) {
  setTimeout(() => {
    console.log("Orders fetched");
    callback(["order1", "order2"]);
  }, 1000);
}

function getOrderDetails(order, callback) {
  setTimeout(() => {
    console.log("Order details fetched");
    callback({ order, price: 100 });
  }, 1000);
}

// CALLBACK HELL
getUser(user => {
  getOrders(user.id, orders => {
    getOrderDetails(orders[0], details => {
      console.log(details);
    });
  });
});
```

### مشکل:

* کد غیرقابل خواندن
* خطاگیری سخت
* توسعه کابوس

---

## ✅ حل با Promise

```js
function getUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1, name: "Ali" });
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["order1", "order2"]);
    }, 1000);
  });
}

function getOrderDetails(order) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ order, price: 100 });
    }, 1000);
  });
}

// استفاده
getUser()
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0]))
  .then(details => console.log(details))
  .catch(err => console.error(err));
```

---

# 2. Async / Await (نسخه حرفه‌ای Promise)

## همان مثال بالا اما تمیزتر

```js
async function main() {
  try {
    const user = await getUser();
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0]);

    console.log(details);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
```

---

## نکته مهم (واقعی):

* `await` فقط داخل `async` کار می‌کند
* خطاها با `try/catch` کنترل می‌شوند

---

# 3. Modules در JavaScript

## قبل (بدون module)

```js
// همه چیز global است
function sum(a, b) {
  return a + b;
}
```

مشکل:

* تداخل نام‌ها
* پروژه بزرگ غیرقابل کنترل

---

## ✅ ES Modules

### math.js

```js
export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

---

### app.js

```js
import { sum, multiply } from "./math.js";

console.log(sum(2, 3));
console.log(multiply(2, 3));
```

---

## نکته مهم:

در Node.js باید:

```json
"type": "module"
```

---

# 4. ES6+ مهم‌ها

## 4.1 Destructuring

```js
const user = {
  name: "Ali",
  age: 25
};

const { name, age } = user;

console.log(name, age);
```

---

## 4.2 Spread Operator

### بدون spread

```js
const arr1 = [1, 2];
const arr2 = arr1.concat([3, 4]);
```

### با spread

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
```

---

## 4.3 Map / Filter

### filter

```js
const nums = [1, 2, 3, 4, 5];

const evens = nums.filter(n => n % 2 === 0);
```

### map

```js
const doubled = nums.map(n => n * 2);
```

---

# 5. Class در JavaScript (خیلی مهم)

## بدون class (قدیمی)

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  console.log("Hello " + this.name);
};
```

---

## با Class (مدرن)

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log("Hello " + this.name);
  }
}

const u = new User("Ali");
u.sayHello();
```

---

## وراثت (Inheritance)

```js
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof");
  }
}

const d = new Dog();
d.speak();
```

---

# تمرین‌ها (خیلی مهم)

## تمرین 1

یک Promise بنویس که بعد از 2 ثانیه عدد 10 را برگرداند.

---

## تمرین 2

با async/await:

* user بگیر
* سپس posts بگیر
* سپس اولین post را چاپ کن

---

## تمرین 3

آرایه زیر را تبدیل کن:

```js
[1,2,3,4,5]
```

به:

```js
[2,4,6,8,10]
```

---

## تمرین 4

یک class به اسم `Car` بساز:

* brand
* speed
* method accelerate()

---

# پروژه واقعی (Mini Project حرفه‌ای)

## 🎯 اسم پروژه: Task Manager (بدون UI فقط JS)

### امکانات:

* اضافه کردن task
* حذف task
* لیست task ها
* ذخیره در memory

---

## کد کامل:

```js
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    const task = {
      id: Date.now(),
      title
    };
    this.tasks.push(task);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  listTasks() {
    return this.tasks;
  }
}

// استفاده
const manager = new TaskManager();

manager.addTask("Learn JS");
manager.addTask("Build Project");

console.log(manager.listTasks());

manager.removeTask(manager.listTasks()[0].id);

console.log(manager.listTasks());
```

---

# جمع‌بندی واقعی (بدون تعارف)

اگر این 5 بخش را خوب یاد نگیری:

* Async/Await
* Promise
* Module
* ES6
* Class

➡️ در NestJS و Backend **گیر می‌کنی**

ولی اگر این‌ها را بفهمی:
➡️ تو 70% راه یک backend developer واقعی را رفتی

---

اگر خواستی مرحله بعدی را می‌تونیم خیلی جدی‌تر کنیم:

👉 پروژه واقعی Node.js + Express + Database
👉 یا ورود مستقیم به NestJS (حرفه‌ای)

فقط بگو موضوع بعدی چی باشه.
