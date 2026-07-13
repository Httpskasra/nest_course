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

  // 1. بارگذاری اولیه (async/await)
  await manager.loadInitialTasks();
  console.log("📋 وظایف فعلی:\n" + formatTasks(manager.getAllTasks()));
  console.log("---");

  // 2. Destructuring برای دریافت آمار
  const stats = getStats(manager.getAllTasks());
  const { total, completed, pending } = stats; // Destructuring
  console.log(`📊 آمار: کل=${total}, انجام‌شده=${completed}, انجام‌نشده=${pending}`);

  // 3. افزودن وظیفهٔ جدید
  await manager.addTask("ارسال پروژه");
  await manager.addTask("مطالعهٔ ES2024");

  // 4. تلاش برای افزودن عنوان تکراری
  await manager.addTask("تمرین Destructuring"); // تکراری – هشدار می‌دهد

  // 5. تغییر وضعیت یک وظیفه با id=2
  await manager.toggleTask(2);

  // 6. حذف وظیفه با id=1
  await manager.removeTask(1);

  console.log("\n📋 وضعیت نهایی وظایف:");
  const allTasks = manager.getAllTasks();

  // استفاده از map برای استخراج فقط عنوان‌ها
  const titles = allTasks.map(t => t.title);
  console.log("عنوان‌ها:", titles);

  // استفاده از filter برای جداسازی
  const done = getCompleted(allTasks);
  const notDone = getPending(allTasks);
  console.log(`✅ انجام‌شده‌ها (${done.length}):`, done.map(t => t.title).join("، "));
  console.log(`⬜ انجام‌نشده‌ها (${notDone.length}):`, notDone.map(t => t.title).join("، "));

  // شناسه‌ها با reduce (اختیاری) و includes
  const ids = getAllIds(allTasks);
  console.log("🆔 شناسه‌ها:", ids);
  console.log("آیا شناسهٔ 3 وجود دارد؟", ids.includes(3)); // true

  // نمایش کامل با formatTasks (join داخلی)
  console.log("\n📋 نمایش نهایی:\n" + formatTasks(allTasks));
}

runApp().catch(err => console.error("خطا:", err));