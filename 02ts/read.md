خوبه، الان وارد نقطه‌ای می‌شی که خیلی‌ها همین‌جا جا می‌مونن. TypeScript فقط “تایپ دادن به JS” نیست؛ در واقع **کنترل کردن هرج‌ومرج جاوااسکریپت در پروژه‌های واقعیه**.

من مثل قبل می‌برمت از:
تئوری ساده → مثال بدون TS → مثال با TS → کاربرد واقعی → تمرین → پروژه

---

# 2. TypeScript (فهم واقعی، نه حفظی)

## TypeScript چیه؟

TypeScript = JavaScript + Type System

یعنی:

* JS = آزاد (هر چیزی می‌تونی بزنی)
* TS = قانون‌مند (اجازه خطا کمتر)

### مشکل JS:

```js
function sum(a, b) {
  return a + b;
}

sum("10", 20); // ❌ ولی JS اجازه میده!
```

---

## چرا TypeScript مهمه؟

* جلوگیری از bug قبل از اجرا
* مناسب پروژه‌های بزرگ
* پایه اصلی NestJS

---

# 1. Types & Interfaces

## 1.1 Types

### ❌ بدون TypeScript

```js
function greet(name) {
  return "Hello " + name;
}
```

مشکل: نمی‌دونی name چی هست

---

### ✅ با TypeScript

```ts id="ts1"
function greet(name: string): string {
  return "Hello " + name;
}
```

### نکته مهم:

* `: string` یعنی فقط string قبول کن
* `: string` بعد function یعنی خروجی string است

---

## انواع type مهم:

```ts id="ts2"
let age: number = 25;
let isActive: boolean = true;
let names: string[] = ["Ali", "Sara"];
```

---

## Union Type (خیلی کاربردی)

```ts id="ts3"
let id: string | number;

id = 10;
id = "10";
```

---

## 1.2 Interfaces

Interface یعنی قرارداد برای object

### بدون interface

```js
const user = {
  name: "Ali",
  age: 25
};
```

---

### با interface

```ts id="ts4"
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Ali",
  age: 25
};
```

---

## تفاوت مهم:

* type → ساده‌تر
* interface → مناسب پروژه بزرگ (NestJS)

---

# 2. Classes در TypeScript

## بدون TS (JS)

```js id="ts5"
class User {
  constructor(name) {
    this.name = name;
  }
}
```

---

## با TS

```ts id="ts6"
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

---

## چرا مهمه؟

چون NestJS کل architecture با class ساخته شده

---

# 3. Access Modifiers

## public / private / protected

---

## 3.1 public (همه جا دسترسی دارد)

```ts id="ts7"
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

---

## 3.2 private (فقط داخل کلاس)

### ❌ مشکل بدون private

```ts
class Bank {
  balance = 1000;
}

const b = new Bank();
b.balance = 0; // خطرناک
```

---

### ✅ با private

```ts id="ts8"
class Bank {
  private balance: number = 1000;

  getBalance() {
    return this.balance;
  }
}
```

---

## 3.3 protected (بین کلاس و child)

```ts id="ts9"
class Animal {
  protected sound: string = "noise";
}

class Dog extends Animal {
  bark() {
    console.log(this.sound);
  }
}
```

---

# 4. Generics (خیلی مهم برای حرفه‌ای شدن)

## مشکل بدون Generic

```ts
function identity(value: any) {
  return value;
}
```

❌ مشکل: type از بین میره

---

## با Generic

```ts id="ts10"
function identity<T>(value: T): T {
  return value;
}
```

---

## استفاده:

```ts
identity<string>("Hello");
identity<number>(10);
```

---

## مثال واقعی‌تر

```ts id="ts11"
function getArray<T>(items: T[]): T[] {
  return items;
}

getArray<number>([1,2,3]);
getArray<string>(["a","b"]);
```

---

## چرا مهمه؟

NestJS service ها خیلی از Generic استفاده می‌کنن

---

# 5. DTO Concept (خیلی مهم برای NestJS)

## DTO یعنی چی؟

DTO = Data Transfer Object
یعنی “قالب داده‌ای که API می‌گیرد”

---

## مشکل بدون DTO

```ts
function createUser(body) {
  console.log(body.name);
}
```

❌ هر چیزی می‌تواند وارد شود

---

## با DTO

```ts id="ts12"
class CreateUserDto {
  name: string;
  age: number;
}
```

---

## استفاده

```ts
function createUser(dto: CreateUserDto) {
  console.log(dto.name);
}
```

---

## چرا مهمه؟

* validation
* امنیت
* ساخت API حرفه‌ای

---

# 6. Decorators (خیلی مهم برای NestJS)

## Decorator یعنی چی؟

یک function که به class یا method “رفتار اضافه” می‌دهد

---

## مثال ساده

```ts id="ts13"
function Logger(target: any) {
  console.log("Class created:", target);
}

@Logger
class User {}
```

---

## NestJS واقعاً همین کار را می‌کند:

```ts
@Controller('users')
class UserController {}
```

👉 این یعنی: این کلاس تبدیل به controller API شده

---

## متد decorator

```ts id="ts14"
function LogMethod(target: any, key: string) {
  console.log("Method:", key);
}

class User {
  @LogMethod
  getName() {}
}
```

---

# جمع‌بندی واقعی

اگر این‌ها را خوب بفهمی:

* Types
* Interfaces
* Classes
* Generics
* DTO
* Decorators
* Access Modifiers

👉 تو 80% آماده NestJS هستی

---

# تمرین‌ها

## تمرین 1

یک interface برای Product بساز:

* name
* price
* inStock

---

## تمرین 2

یک class بساز:

* BankAccount
* private balance
* deposit / withdraw

---

## تمرین 3

Generic بنویس:

* input array
* output array

---

## تمرین 4

DTO برای Login بساز:

* email
* password

---

## تمرین 5

یک decorator بنویس که هنگام اجرای متد log بزند

---

# پروژه واقعی (Mini API Design)

## 🎯 Project: User System (TypeScript Only)

### امکانات:

* Create User (DTO)
* Validate user structure
* Store users in array
* Get users
* Use interface + class + private fields

---

## کد کامل:

```ts id="ts15"
interface IUser {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: IUser[] = [];

  createUser(name: string, email: string): IUser {
    const user: IUser = {
      id: Date.now(),
      name,
      email
    };

    this.users.push(user);
    return user;
  }

  getUsers(): IUser[] {
    return this.users;
  }
}

// استفاده
const service = new UserService();

service.createUser("Ali", "ali@test.com");
service.createUser("Sara", "sara@test.com");

console.log(service.getUsers());
```

---

# حقیقت مهم (بدون تعارف)

اگر TypeScript را سطحی یاد بگیری:
➡️ NestJS برایت تبدیل به دردسر می‌شود

اگر درست یاد بگیری:
➡️ تو داری وارد سطح Backend Developer واقعی می‌شی

---

اگر خواستی مرحله بعدی:

👉 NestJS واقعی (Controller / Service / Module)
👉 یا پروژه API کامل با Database (PostgreSQL + Prisma)

فقط بگو ادامه رو از کجا شروع کنیم.
