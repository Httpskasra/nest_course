// ========== TaskManager.js – مدیریت وظایف با عملیات async ==========

import { findTaskById, containsTitle } from "./taskUtils.js";

// شبیه‌سازی تأخیر شبکه
function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // بارگذاری اولیه از «سرور» (Promise)
  async loadInitialTasks() {
    console.log("📥 در حال دریافت وظایف از سرور...");
    await delay(800);
    // داده‌های پیش‌فرض
    this.tasks = [
      { id: 1, title: "یادگیری JavaScript", completed: true },
      { id: 2, title: "تمرین Destructuring", completed: false },
      { id: 3, title: "پیاده‌سازی پروژه", completed: false }
    ];
    console.log("✅ وظایف دریافت شدند:", this.tasks.length, "عدد");
    return this.tasks;
  }

  // افزودن وظیفهٔ جدید (async)
  async addTask(title) {
    if (!title) throw new Error("عنوان نمی‌تواند خالی باشد");
    await delay(200);
    // جلوگیری از تکراری بودن عنوان (includes)
    if (containsTitle(this.tasks, title)) {
      console.warn("⚠️ این عنوان قبلاً وجود دارد:", title);
      return null;
    }
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    // استفاده از spread برای اضافه کردن
    this.tasks = [...this.tasks, newTask];
    console.log(`➕ وظیفهٔ جدید اضافه شد: "${title}"`);
    return newTask;
  }

  // حذف وظیفه با id (با filter – روی آرایه جدید)
  async removeTask(id) {
    await delay(200);
    const task = findTaskById(this.tasks, id);
    if (!task) {
      console.warn("⚠️ وظیفه‌ای با این id یافت نشد:", id);
      return false;
    }
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log(`❌ وظیفهٔ "${task.title}" حذف شد.`);
    return true;
  }

  // تغییر وضعیت انجام (toggle)
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

  // دریافت وضعیت کنونی (بدون async)
  getAllTasks() {
    return this.tasks;
  }
}