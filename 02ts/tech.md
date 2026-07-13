برای آموزش TypeScript در یک جلسه، رویکرد مشابهی را پیاده می‌کنم: **مرتب‌سازی مفاهیم از پایه‌ای به پیشرفته**، **تبدیل هر فایل به یک واحد قابل اجرا** و **ارائهٔ یک پروژهٔ تکمیلی** که همهٔ مفاهیم را در خود داشته باشد.

---

## ۱. پیش‌نیاز اجرای فایل‌ها

TypeScript مستقیماً توسط Node.js قابل اجرا نیست. ساده‌ترین راه برای اجرای سریع `npx ts-node` است (بدون نیاز به نصب سراسری).  
برای این کار:

```bash
mkdir ts-workshop
cd ts-workshop
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init   # ایجاد tsconfig.json پیش‌فرض
```

سپس در `package.json` مطمئن شو که `"type": "module"` وجود ندارد (چون ts-node با commonjs بهتر کار می‌کند، مگر اینکه تنظیمات خاصی انجام دهی). بهتر است پروژه را با `commonjs` پیش ببریم تا اجرا ساده باشد.

**فایل `package.json` نهایی (نمونه):**
```json
{
  "name": "ts-workshop",
  "version": "1.0.0",
  "scripts": {
    "start": "npx ts-node"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "ts-node": "^10.0.0",
    "@types/node": "^20.0.0"
  }
}
```

اکنون برای اجرای هر فایل کافی است در ترمینال بنویسی:
```bash
npx ts-node filename.ts
```

---

## ۲. ترتیب آموزش و محتوای فایل‌ها

ترتیب پیشنهادی از ساده به پیچیده:

1. **firstLook.ts** – اولین برخورد با TypeScript (نوع‌دهی ساده)  
2. **types.ts** – انواع پایه (boolean, number, string, array, tuple, any, void, null/undefined, union)  
3. **functions.ts** (جدید) – توابع، پارامترها و خروجی‌ها (از `interface.ts` توابع استخراج و کامل کن)  
4. **interfaces.ts** – تعریف interface و type alias (از `interface.ts` قسمت‌های مربوطه)  
5. **enums.ts** – enum های عددی و رشته‌ای  
6. **class.ts** – کلاس‌ها، وراثت، abstract، implements، و یک generic ساده  
7. **advanced.ts** – ابزارهای پیشرفته (Partial, Required, Pick, Omit, Record, Parameters, ReturnType)  
8. **project.ts** – پروژهٔ TaskManager تایپ‌شده که تمام مفاهیم را پوشش می‌دهد (اختیاری اما بسیار توصیه می‌شود)

> **نکته:** هر فایل باید مستقل و قابل اجرا با `npx ts-node` باشد و خروجی کنسول واضحی داشته باشد.

---

## ۳. بهبود و بازنویسی فایل‌ها برای اجرای مستقل

### `01_firstLook.ts` (دست‌نخورده)
```typescript
const message: string = "سلام TypeScript";
console.log(message);
```

---

### `02_types.ts` (نسخهٔ اصلی با افزودن `console.log` های گویا)
```typescript
// boolean
let isDone: boolean = false;
console.log("boolean:", isDone);

// number
let decimal: number = 6;
console.log("number:", decimal);

// array
let list: number[] = [1, 2, 3];
let genericList: Array<string> = ["a", "b"];
console.log("number[]:", list);
console.log("Array<string>:", genericList);

// tuple
let x: [string, number];
x = ["hello", 10];
console.log("tuple:", x, "first element substring:", x[0].substring(1));

// any
let notSure: any = 4;
notSure = "maybe a string";
console.log("any:", notSure);

// void
function warnUser(): void {
  console.log("This is a warning");
}
warnUser();

// null & undefined (strictNullChecks فرضی)
let u: undefined = undefined;
let n: null = null;
console.log("undefined:", u, "null:", n);

// union: string | null
function validateEmail(email: string): string | null {
  if (!email.includes("@")) return "ایمیل نامعتبر";
  return null;
}
console.log("validateEmail('test@test.com'):", validateEmail("test@test.com"));
console.log("validateEmail('test'):", validateEmail("test"));
```

---

### `03_functions.ts` (توابع از `interface.ts` جدا شوند و بسط یابند)
```typescript
// تابع ساده
function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Ali"));

// پارامترهای اختیاری و پیش‌فرض
function buildName(first: string, last?: string): string {
  if (last) return first + " " + last;
  return first;
}
console.log(buildName("Ali"));
console.log(buildName("Ali", "Rezaei"));

function pow(base: number, exp = 2): number {
  return Math.pow(base, exp);
}
console.log("3^2:", pow(3));
console.log("3^3:", pow(3, 3));

// تابع با Promise
function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  return Promise.resolve(true);
}
sendEmail("a@b.com", "Title", "Body").then(console.log);

// union return type
function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, p) => sum + p, 0);
}
console.log("Total:", calculateTotal([10, 20, 30]));
```

---

### `04_interfaces.ts` (بازنویسی بخش‌های مربوطه از `interface.ts`)
```typescript
// Interface
interface Person {
  name: string;
  age: number;
}
const ali: Person = { name: "Ali", age: 30 };
console.log("Person:", ali);

// Optional property
interface Props {
  title: string;
  subtitle?: string; // string | undefined
}
const header: Props = { title: "Main" };
console.log("Props without subtitle:", header);

// Interface برای یک مدل کامل
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}
function getUserInfo(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
const user: User = {
  id: 1,
  email: "ali@test.com",
  firstName: "Ali",
  lastName: "Rezaei",
  createdAt: new Date(),
};
console.log(getUserInfo(user));

// Type alias
type ID = string | number;
let userId: ID = "abc123";
userId = 456;
console.log("ID:", userId);

type Point = { x: number; y: number };
const p: Point = { x: 5, y: 10 };
console.log("Point:", p);

// Union literal type
type TaskStatus = "todo" | "in-progress" | "done";
type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
const task: Task = { id: "1", title: "Learn TS", status: "todo" };
console.log("Task:", task);

// unknown
let userInput: unknown;
userInput = 5;
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}
userInput = "hello";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}
```

---

### `05_enums.ts` (همراه با خروجی)
```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log("Color.Green:", c); // 1
let colorName: string = Color[2];
console.log("Color[2]:", colorName); // Blue

enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}
function updateStatus(status: OrderStatus) {
  console.log("Order status:", status);
}
updateStatus(OrderStatus.Shipped);
```

---

### `06_class.ts` (کامل‌تر و با generic)
```typescript
// کلاس با private و public
class Animal {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
const dog = new Animal("Dog");
dog.move(10);

// Abstract class
abstract class Shape {
  abstract getArea(): number;
  printArea(): void {
    console.log("Area:", this.getArea());
  }
}
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
const circle = new Circle(3);
circle.printArea();

// implements interface
interface IClock {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock implements IClock {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
    console.log("Time set to:", d.toISOString());
  }
}
const clock = new Clock();
clock.setTime(new Date("2024-01-01"));

// Generic function
function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>("hello");
console.log("identity<string>:", result);
const inferred = identity(42);
console.log("identity (inferred):", inferred);
```

---

### `07_advanced.ts` (نمایش ابزارهای کاربردی)
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial
type PartialUser = Partial<User>;
const update: PartialUser = { name: "Ali" };
console.log("Partial<User>:", update);

// Required (فرض کن یک نوع با optional هم داشتیم)
type RequiredUser = Required<User>;
// const r: RequiredUser = {}; // خطا

// Pick
type UserSummary = Pick<User, "id" | "name">;
const summary: UserSummary = { id: 1, name: "Ali" };
console.log("Pick:", summary);

// Omit
type PublicUser = Omit<User, "email">;
const publicUser: PublicUser = { id: 1, name: "Ali" };
console.log("Omit:", publicUser);

// Record
const cache: Record<string, User> = {};
cache["user1"] = { id: 1, name: "Ali", email: "a@b.com" };
console.log("Record cache:", cache);

// Parameters & ReturnType
function add(a: number, b: number): number {
  return a + b;
}
type AddParams = Parameters<typeof add>; // [number, number]
type AddReturn = ReturnType<typeof add>; // number
console.log("Parameters type demo, ReturnType is number");
```

---

## ۴. پروژهٔ نهایی: TaskManager تایپ‌شده (پوشش کامل مفاهیم TypeScript)

برای اینکه آموزش عملی شود، یک نسخهٔ TypeScript از Task Manager می‌سازیم که از interface, enum, utility types, generics, و کلاس‌های async استفاده می‌کند.

**ساختار پوشه:**
```
ts-project/
├── package.json   (همان قبلی)
├── tsconfig.json  (با تنظیمات ساده)
├── types.ts        // تعریف interface و enum ها
├── taskUtils.ts
├── TaskManager.ts
└── main.ts
```

### `tsconfig.json` (حداقلی)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  },
  "include": ["*.ts"]
}
```

### `types.ts`
```typescript
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: Date;
}

export type TaskStatus = "todo" | "in-progress" | "done";

export enum TaskPriority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}
```

### `taskUtils.ts` (توابع کمکی با انواع)
```typescript
import { Task, TaskStats, TaskStatus } from "./types";

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter(t => t.status === status);
}

export function findTaskById(tasks: Task[], id: number): Task | undefined {
  return tasks.find(t => t.id === id);
}

export function getStats(tasks: Task[]): TaskStats {
  return tasks.reduce(
    (acc, t) => {
      acc.total++;
      if (t.status === "done") acc.completed++;
      else acc.pending++;
      return acc;
    },
    { total: 0, completed: 0, pending: 0 }
  );
}

export function mapToTitles(tasks: Task[]): string[] {
  return tasks.map(t => t.title);
}
```

### `TaskManager.ts` (کلاس مدیر وظایف با Generic برای ذخیره‌سازی اضافی)
```typescript
import { Task, TaskStatus, TaskPriority } from "./types";
import { findTaskById, getStats } from "./taskUtils";

// یک کلاس Generic برای مدیریت آیتم‌ها (اختیاری)
class Store<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  getAll(): T[] {
    return this.items;
  }
}

export class TaskManager {
  private tasks: Task[] = [];

  // بارگذاری اولیه (شبیه‌سازی async)
  async loadInitialTasks(): Promise<Task[]> {
    // تأخیر ساختگی
    await new Promise(res => setTimeout(res, 500));
    this.tasks = [
      { id: 1, title: "Learn JS", status: "done", createdAt: new Date() },
      { id: 2, title: "Learn TS", status: "in-progress", createdAt: new Date() },
      { id: 3, title: "Build project", status: "todo", createdAt: new Date() },
    ];
    return this.tasks;
  }

  async addTask(title: string, priority: TaskPriority = TaskPriority.Medium): Promise<Task> {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: "todo",
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    console.log(`Task added: ${title} with priority ${priority}`);
    return newTask;
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task | undefined> {
    const task = findTaskById(this.tasks, id);
    if (task) task.status = status;
    return task;
  }

  // استفاده از Partial برای آپدیت جزئی
  async updateTask(id: number, changes: Partial<Omit<Task, "id">>): Promise<Task | undefined> {
    const task = findTaskById(this.tasks, id);
    if (task) Object.assign(task, changes);
    return task;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  printStats(): void {
    const stats = getStats(this.tasks);
    console.log(`Total: ${stats.total}, Completed: ${stats.completed}, Pending: ${stats.pending}`);
  }
}
```

### `main.ts` (سناریوی اصلی)
```typescript
import { TaskManager } from "./TaskManager";
import { filterByStatus, mapToTitles } from "./taskUtils";
import { TaskStatus, TaskPriority } from "./types";

async function run() {
  const manager = new TaskManager();

  await manager.loadInitialTasks();
  console.log("Initial tasks:", manager.getAll());

  await manager.addTask("Write Tests", TaskPriority.High);
  await manager.updateStatus(2, "done");

  // استفاده از Partial update
  await manager.updateTask(3, { title: "Build advanced project" });

  const allTasks = manager.getAll();
  console.log("All titles:", mapToTitles(allTasks));
  console.log("Todo tasks:", filterByStatus(allTasks, "todo"));
  manager.printStats();

  // نمایش Destructuring
  const [first, ...rest] = allTasks;
  console.log("First task:", first);
}

run().catch(console.error);
```

**اجرا:** `npx ts-node main.ts`

---

## ۵. توضیحات گام‌به‌گام برای تدریس

### **گام ۱: firstLook.ts**  
- TypeScript = JavaScript + type annotations.  
- نوع متغیر را مشخص می‌کنیم تا خطاهای زمان کامپایل بگیریم.  
- فایل را با `npx ts-node firstLook.ts` اجرا کنید.

### **گام ۲: types.ts**  
- معرفی انواع داده اولیه: `boolean`, `number`, `string`, `Array`, `Tuple`, `any`, `void`, `undefined/null`, `union`.  
- نشان دهید که TypeScript از اختصاص نوع نادرست جلوگیری می‌کند.  
- مثال `validateEmail` خروجی `string | null` دارد.  
- `strictNullChecks` را توضیح دهید.

### **گام ۳: functions.ts**  
- نوع پارامترها و خروجی اجباری.  
- پارامترهای اختیاری `?` و مقدار پیش‌فرض.  
- توابع async که `Promise<T>` برمی‌گردانند.

### **گام ۴: interfaces.ts**  
- `interface` برای شکل دادن به اشیاء.  
- پراپرتی‌های اختیاری.  
- `type` alias برای انواع ساده و union.  
- `unknown` و تفاوت آن با `any`.

### **گام ۵: enums.ts**  
- Enum عددی (مقادیر 0,1,2) و enum رشته‌ای (با مقادیر صریح).  
- دسترسی به نام از طریق مقدار.  
- مزیت: جلوگیری از مقادیر جادویی.

### **گام ۶: class.ts**  
- کلاس‌های مدرن با `private`, `public` (برخلاف JS).  
- کلاس‌های abstract.  
- `implements` برای اطمینان از پیاده‌سازی اینترفیس.  
- تابع generic `identity` – شروع مبحث جنریک.

### **گام ۷: advanced.ts**  
- ابزارهای کاربردی:  
  - `Partial<T>` برای به‌روزرسانی جزئی.  
  - `Pick<T, K>` برای انتخاب فقط چند فیلد.  
  - `Omit<T, K>` برای حذف فیلدهای خاص.  
  - `Record<K, V>` برای نگاشت کلید-مقدار.  
  - `Parameters<F>` و `ReturnType<F>` برای کار با نوع توابع.

### **گام ۸: پروژه TaskManager**  
- تلفیق همهٔ مفاهیم در یک برنامهٔ واقعی.  
- interface و enum از `types.ts`.  
- توابع کمکی با `filter`, `find`, `map`, `reduce` تایپ‌شده.  
- کلاس `TaskManager` با متدهای async و استفاده از `Partial` برای آپدیت.  
- جنریک در صورت تمایل (کلاس `Store`).  
- اجرا و بررسی خروجی.

---

## ۶. برگهٔ تقلب (Cheat Sheet) برای TypeScript

```markdown
# TypeScript Cheat Sheet

## انواع پایه
let isDone: boolean = true;
let count: number = 42;
let name: string = "Ali";
let list: number[] = [1,2,3];
let tuple: [string, number] = ["a", 1];
let anything: any = 5;

## توابع
function add(a: number, b: number): number { return a + b; }
function greet(name: string, greeting?: string): string { ... }
function pow(base: number, exp = 2): number { ... }
async function fetch(): Promise<Data> { ... }

## Interface / Type
interface User { id: number; name: string; email?: string; }
type ID = string | number;
type Status = "todo" | "done";
type Point = { x: number; y: number };

## Enum
enum Color { Red, Green, Blue }
let c: Color = Color.Green; // 1
enum Status { Pending = "PENDING", Done = "DONE" }

## Classes
class Animal {
  private name: string;
  constructor(name: string) { this.name = name; }
  public move(d: number): void { ... }
}
abstract class Shape { abstract area(): number; }
class Circle extends Shape implements Drawable { ... }

## Generics
function identity<T>(arg: T): T { return arg; }
class Stack<T> { private items: T[] = []; push(item:T) { ... } }

## Utility Types
Partial<User>        // همه فیلدها اختیاری
Required<User>       // همه اجباری
Pick<User, "id"|"name">  // انتخاب
Omit<User, "email">      // حذف
Record<string, User>     // دیکشنری
Parameters<typeof fn>    // نوع پارامترهای تابع
ReturnType<typeof fn>    // نوع خروجی تابع

## اجرا
npx ts-node file.ts
```

---

با همین ساختار، می‌توانی TypeScript را در یک جلسهٔ فشرده تدریس کنی و در انتها شرکت‌کنندگان یک پروژهٔ واقعی تایپ‌شده داشته باشند. اگر نیاز به تنظیم دیگری بود، بگو.