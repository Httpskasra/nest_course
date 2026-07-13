برای اینکه پروژه را گام‌به‌گام و بخش‌بخش آموزش بدهی، آن را به ۵ مرحله تقسیم می‌کنم. هر مرحله یک هدف مشخص دارد، کد کامل آن مرحله (قابل اجرا) را می‌نویسم و توضیح می‌دهم که به بچه‌ها چه بگویم و چه چیزی را نشان بدهم.

در انتها هم به همان فایل‌های نهایی `TaskManager.js`، `taskUtils.js` و `main.js` می‌رسیم.

---

## مرحله‌بندی کلی پروژه

1. **مدیر وظایف ساده (بدون ماژول و async) – فقط کلاس و آرایه**
2. **افزودن ابزارهای آرایه‌ای (map, filter, reduce, ...) در همان فایل**
3. **ماژولار کردن پروژه (جدا کردن فایل‌ها و import/export)**
4. **شبیه‌سازی ناهمگامی (async/await و delay) در متدهای کلاس**
5. **سرهم‌بندی نهایی – سناریوی واقعی با main.js و استفاده از تمام مفاهیم**

---

### مرحله ۱: TaskManager ساده (بدون ماژول، بدون async)

**هدف:** ساختن کلاس پایه با متدهای `addTask`, `removeTask`, `listTasks` و استفاده از `filter` برای حذف.

**فایل:** فقط یک فایل `app.js` (اسمش مهم نیست)

```javascript
// ===== مرحله ۱: TaskManager مقدماتی =====

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    const task = {
      id: Date.now(),      // تقریباً یکتا
      title: title,
      completed: false
    };
    this.tasks.push(task);
    console.log(`وظیفه "${title}" اضافه شد.`);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log(`وظیفه با id=${id} حذف شد.`);
  }

  listTasks() {
    console.log("لیست وظایف:", this.tasks);
  }
}

// === استفاده ===
const manager = new TaskManager();
manager.addTask("یادگیری JavaScript");
manager.addTask("تمرین Destructuring");
manager.addTask("پیاده‌سازی پروژه");

manager.listTasks();  // سه وظیفه را نشان می‌دهد

// حذف اولین وظیفه
const firstId = manager.tasks[0].id;
manager.removeTask(firstId);
manager.listTasks();  // دو وظیفه
```

**برای تدریس بگو:**
- کلاس قالبی برای ساخت اشیاء مشابه است.
- `this.tasks` آرایه‌ای درون هر نمونه است.
- `addTask` یک شیء وظیفه با شناسه (از `Date.now()`) می‌سازد و با `push` اضافه می‌کند.
- `removeTask` با `filter` همهٔ وظایفی که شناسه‌شان با `id` برابر نیست را نگه می‌دارد → حذف منطقی.
- خروجی کنسول را بلافاصله ببینند.

---

### مرحله ۲: اضافه کردن ابزارهای آرایه‌ای (همه در همان فایل)

**هدف:** آموزش `map`، `filter`، `find`، `reduce`، `join`، `includes` با نوشتن چند تابع کمکی در همان فایل.

فایل `app.js` را گسترش می‌دهیم:

```javascript
// ===== مرحله ۲: TaskManager + توابع کمکی آرایه‌ای =====

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    const task = { id: Date.now(), title, completed: false };
    this.tasks.push(task);
    console.log(`وظیفه "${title}" اضافه شد.`);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log(`وظیفه با id=${id} حذف شد.`);
  }

  listTasks() {
    console.log("وظایف:", this.tasks);
  }
}

// توابع کمکی (همان‌هایی که بعداً به taskUtils.js منتقل می‌شوند)
function formatTasks(tasks) {
  if (tasks.length === 0) return "هیچ وظیفه‌ای نیست.";
  return tasks
    .map(t => `[${t.completed ? "✓" : " "}] ${t.title} (id: ${t.id})`)
    .join("\n");
}

function getCompleted(tasks) {
  return tasks.filter(t => t.completed);
}

function getPending(tasks) {
  return tasks.filter(t => !t.completed);
}

function findTaskById(tasks, id) {
  return tasks.find(t => t.id === id);
}

function getStats(tasks) {
  return tasks.reduce((acc, t) => {
    acc.total++;
    if (t.completed) acc.completed++;
    else acc.pending++;
    return acc;
  }, { total: 0, completed: 0, pending: 0 });
}

function getAllIds(tasks) {
  return tasks.map(t => t.id);
}

function containsTitle(tasks, title) {
  return tasks.map(t => t.title).includes(title);
}

// === اجرای نمایشی ===
const manager = new TaskManager();
manager.addTask("یادگیری JavaScript");
manager.addTask("تمرین Destructuring");
manager.addTask("پیاده‌سازی پروژه");

// یکی را انجام‌شده کن (دستی)
manager.tasks[0].completed = true;

console.log("\n--- نمایش با formatTasks ---");
console.log(formatTasks(manager.tasks));

console.log("\n--- آمار (reduce) ---");
const stats = getStats(manager.tasks);
console.log(`کل: ${stats.total}, انجام‌شده: ${stats.completed}, انجام‌نشده: ${stats.pending}`);

console.log("\n--- انجام‌شده‌ها (filter) ---");
console.log(getCompleted(manager.tasks).map(t => t.title));

console.log("\n--- جستجو با find ---");
const found = findTaskById(manager.tasks, manager.tasks[1].id);
console.log("وظیفه پیدا شده:", found);

console.log("\n--- شامل عنوان؟ (map + includes) ---");
console.log("آیا 'تمرین Destructuring' وجود دارد؟", containsTitle(manager.tasks, "تمرین Destructuring"));
```

**برای تدریس بگو:**
- این توابع نشان می‌دهند چطور با متدهای آرایه کار کنیم.
- `formatTasks` با `map` هر وظیفه را به یک رشته تبدیل می‌کند و با `join` خط جدید می‌گذارد.
- `getCompleted` و `getPending` با `filter` وظایف را جدا می‌کنند.
- `getStats` با `reduce` یک شیء آماری می‌سازد.
- `findTaskById` با `find` اولین عضو با شرط را برمی‌گرداند.
- `containsTitle` با `map` عنوان‌ها را بیرون می‌کشد و با `includes` بررسی می‌کند.
- همه در کنسول قابل مشاهده است.

---

### مرحله ۳: ماژولار کردن (جدا کردن فایل‌ها)

**هدف:** آموزش `import`/`export` و ساختار پروژه.

ساختار پوشه:

```
project/
├── package.json       ←  {"type": "module"}
├── taskUtils.js       ←  توابع کمکی
├── TaskManager.js     ←  کلاس (هنوز بدون async)
└── main.js            ←  سناریوی استفاده
```

**package.json** (همان که داری):
```json
{
  "name": "project",
  "type": "module"
}
```

**taskUtils.js** (نسخهٔ ماژولار):
```javascript
export function formatTasks(tasks) {
  if (tasks.length === 0) return "هیچ وظیفه‌ای نیست.";
  return tasks.map(t => `[${t.completed ? "✓" : " "}] ${t.title} (id: ${t.id})`).join("\n");
}

export function getCompleted(tasks) {
  return tasks.filter(t => t.completed);
}

export function getPending(tasks) {
  return tasks.filter(t => !t.completed);
}

export function findTaskById(tasks, id) {
  return tasks.find(t => t.id === id);
}

export function getStats(tasks) {
  return tasks.reduce((acc, t) => {
    acc.total++;
    if (t.completed) acc.completed++;
    else acc.pending++;
    return acc;
  }, { total: 0, completed: 0, pending: 0 });
}

export function getAllIds(tasks) {
  return tasks.map(t => t.id);
}

export function containsTitle(tasks, title) {
  return tasks.map(t => t.title).includes(title);
}
```

**TaskManager.js** (وارد کردن توابع مورد نیاز):
```javascript
import { findTaskById, containsTitle } from "./taskUtils.js";

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    if (containsTitle(this.tasks, title)) {
      console.warn("⚠️ عنوان تکراری است:", title);
      return null;
    }
    const newTask = { id: Date.now(), title, completed: false };
    this.tasks = [...this.tasks, newTask];  // spread
    console.log(`➕ وظیفه "${title}" اضافه شد.`);
    return newTask;
  }

  removeTask(id) {
    const task = findTaskById(this.tasks, id);
    if (!task) {
      console.warn("⚠️ وظیفه‌ای با این id یافت نشد:", id);
      return false;
    }
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log(`❌ وظیفه "${task.title}" حذف شد.`);
    return true;
  }

  getAllTasks() {
    return this.tasks;
  }
}
```

**main.js** (نمایش کامل):
```javascript
import { TaskManager } from "./TaskManager.js";
import { formatTasks, getStats, getCompleted, getPending, getAllIds } from "./taskUtils.js";

const manager = new TaskManager();

manager.addTask("یادگیری JavaScript");
manager.addTask("تمرین Destructuring");
manager.addTask("پیاده‌سازی پروژه");

// دستی یک وظیفه را انجام‌شده کن
manager.tasks[0].completed = true;

console.log("📋 وظایف:\n" + formatTasks(manager.getAllTasks()));

const stats = getStats(manager.getAllTasks());
const { total, completed, pending } = stats;   // Destructuring
console.log(`📊 آمار: کل=${total}, انجام‌شده=${completed}, انجام‌نشده=${pending}`);

const titles = getAllIds(manager.getAllTasks());
console.log("🆔 شناسه‌ها:", titles);
```

**اجرا:** `node main.js`

**برای تدریس بگو:**
- کد را در فایل‌های جداگانه سازماندهی می‌کنیم تا خوانا و قابل استفادهٔ مجدد باشد.
- `export` برای بیرون دادن توابع/کلاس، `import` برای وارد کردن.
- حتماً `"type": "module"` در `package.json` باشد.
- حالا می‌توانیم پروژه را گسترش دهیم بدون اینکه فایل اصلی شلوغ شود.

---

### مرحله ۴: اضافه کردن عملیات ناهمگام (async/await)

**هدف:** شبیه‌سازی تأخیر شبکه با `delay` (Promise) و تبدیل متدهای کلاس به `async`.

**فایل‌های تغییر یافته:** فقط `TaskManager.js`

`taskUtils.js` و `package.json` بدون تغییر می‌مانند.

**TaskManager.js جدید:**
```javascript
import { findTaskById, containsTitle } from "./taskUtils.js";

// تابع کمکی برای ایجاد تأخیر (Promise)
function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  async loadInitialTasks() {
    console.log("📥 دریافت وظایف از سرور...");
    await delay(800);
    this.tasks = [
      { id: 1, title: "یادگیری JavaScript", completed: true },
      { id: 2, title: "تمرین Destructuring", completed: false },
      { id: 3, title: "پیاده‌سازی پروژه", completed: false }
    ];
    console.log("✅ وظایف دریافت شدند:", this.tasks.length, "عدد");
    return this.tasks;
  }

  async addTask(title) {
    if (!title) throw new Error("عنوان نمی‌تواند خالی باشد");
    await delay(200);
    if (containsTitle(this.tasks, title)) {
      console.warn("⚠️ عنوان تکراری:", title);
      return null;
    }
    const newTask = { id: Date.now(), title, completed: false };
    this.tasks = [...this.tasks, newTask];
    console.log(`➕ وظیفه "${title}" اضافه شد.`);
    return newTask;
  }

  async removeTask(id) {
    await delay(200);
    const task = findTaskById(this.tasks, id);
    if (!task) {
      console.warn("⚠️ وظیفه‌ای با این id یافت نشد:", id);
      return false;
    }
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log(`❌ وظیفه "${task.title}" حذف شد.`);
    return true;
  }

  async toggleTask(id) {
    await delay(200);
    const task = findTaskById(this.tasks, id);
    if (!task) {
      console.warn("⚠️ وظیفه‌ای با این id یافت نشد:", id);
      return null;
    }
    task.completed = !task.completed;
    const status = task.completed ? "انجام‌شده" : "انجام‌نشده";
    console.log(`🔄 وضعیت "${task.title}" به ${status} تغییر کرد.`);
    return task;
  }

  getAllTasks() {
    return this.tasks;
  }
}
```

**main.js متناسب با async (فعلاً ساده):**
```javascript
import { TaskManager } from "./TaskManager.js";
import { formatTasks, getStats } from "./taskUtils.js";

async function run() {
  const manager = new TaskManager();
  await manager.loadInitialTasks();
  console.log("📋 وظایف:\n" + formatTasks(manager.getAllTasks()));

  await manager.addTask("ارسال پروژه");
  await manager.toggleTask(2);   // تغییر وضعیت وظیفه با id=2

  console.log("\n📋 بعد از تغییرات:\n" + formatTasks(manager.getAllTasks()));
}

run().catch(err => console.error(err));
```

**برای تدریس بگو:**
- `async` قبل از تابع یعنی داخل آن می‌توان از `await` استفاده کرد.
- `await` اجرا را تا زمان حل شدن Promise متوقف می‌کند (اما رشتهٔ اصلی را مسدود نمی‌کند).
- تابع `delay` یک Promise برمی‌گرداند که بعد از `ms` میلی‌ثانیه حل می‌شود.
- حالا عملیات ما مثل ارتباط با سرور زمان‌بر شده‌اند.
- اجرا کن و ترتیب لاگ‌ها را ببینند.

---

### مرحله ۵: سناریوی کامل (همان `main.js` نهایی)

حالا که همهٔ قطعات آماده است، `main.js` نهایی (همانی که داری) را اجرا کن که تمام قابلیت‌ها را یکجا نشان می‌دهد:

```javascript
// ========== main.js – سناریوی کامل ==========
import { TaskManager } from "./TaskManager.js";
import {
  formatTasks,
  getCompleted,
  getPending,
  getStats,
  getAllIds
} from "./taskUtils.js";

async function runApp() {
  console.log("🚀 راه‌اندازی TaskManager پیشرفته...\n");

  const manager = new TaskManager();

  await manager.loadInitialTasks();
  console.log("📋 وظایف فعلی:\n" + formatTasks(manager.getAllTasks()));
  console.log("---");

  const stats = getStats(manager.getAllTasks());
  const { total, completed, pending } = stats; // Destructuring
  console.log(`📊 آمار: کل=${total}, انجام‌شده=${completed}, انجام‌نشده=${pending}`);

  await manager.addTask("ارسال پروژه");
  await manager.addTask("مطالعهٔ ES2024");
  await manager.addTask("تمرین Destructuring"); // هشدار تکراری

  await manager.toggleTask(2);      // تغییر وضعیت
  await manager.removeTask(1);      // حذف

  console.log("\n📋 وضعیت نهایی:");
  const allTasks = manager.getAllTasks();
  const titles = allTasks.map(t => t.title);
  console.log("عنوان‌ها:", titles);
  const done = getCompleted(allTasks);
  const notDone = getPending(allTasks);
  console.log(`✅ انجام‌شده‌ها (${done.length}):`, done.map(t => t.title).join("، "));
  console.log(`⬜ انجام‌نشده‌ها (${notDone.length}):`, notDone.map(t => t.title).join("، "));

  const ids = getAllIds(allTasks);
  console.log("🆔 شناسه‌ها:", ids);
  console.log("آیا شناسهٔ 3 وجود دارد؟", ids.includes(3));

  console.log("\n📋 نمایش نهایی:\n" + formatTasks(allTasks));
}

runApp().catch(err => console.error("خطا:", err));
```

**توضیح نهایی برای بچه‌ها:**
- این سناریو همهٔ مفاهیم را ترکیب می‌کند: کلاس، ماژول، Destructuring، متدهای آرایه (map, filter, find, reduce, includes, spread, join)، async/await.
- خروجی قدم‌به‌قدم نشان‌دهندهٔ اجرای ناهمگام است.
- حالا می‌توانید خودتان امکاناتی مثل جستجو، اولویت‌بندی، ذخیره در فایل و ... اضافه کنید.

---

## جمع‌بندی ترتیب ارائه

| مرحله | مفهوم اصلی | کد قابل اجرا |
|-------|------------|--------------|
| ۱ | کلاس و آرایه (push, filter) | `01_basic.js` |
| ۲ | توابع کمکی با map, filter, reduce, ... | `02_with_array_utils.js` |
| ۳ | ماژول‌ها و import/export | `taskUtils.js` + `TaskManager.js` + `main.js` (ساده) |
| ۴ | async/await و شبیه‌سازی تأخیر | همان فایل‌ها با نسخهٔ async (TaskManager تغییر یافته) |
| ۵ | سناریوی کامل final | همان فایل‌های `main.js` نهایی |

هر مرحله را می‌توانی در یک فولدر جداگانه یا با نام‌گذاری متفاوت ذخیره کنی تا بچه‌ها عقب نمانند. پیشنهاد می‌کنم مراحل ۱ و ۲ را در یک فایل سادهٔ `.js` (بدون نیاز به `package.json`) انجام دهید و از مرحله ۳ پروژه را ماژولار کنید.

با این روش، همه گام‌به‌گام پیش می‌روند و در انتها پروژهٔ کامل را در اختیار دارند.