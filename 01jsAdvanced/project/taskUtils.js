// ========== taskUtils.js – ابزارهای کار با آرایهٔ وظایف ==========

/**
 * نمایش خوانای وظایف
 */
export function formatTasks(tasks) {
  if (tasks.length === 0) return "هیچ وظیفه‌ای وجود ندارد.";
  return tasks
    .map(t => `[${t.completed ? "✓" : " "}] ${t.title} (id: ${t.id})`)
    .join("\n");
}

/**
 * فیلتر وظایف انجام‌شده
 */
export function getCompleted(tasks) {
  return tasks.filter(t => t.completed);
}

/**
 * فیلتر وظایف انجام‌نشده
 */
export function getPending(tasks) {
  return tasks.filter(t => !t.completed);
}

/**
 * جستجوی یک وظیفه با id
 */
export function findTaskById(tasks, id) {
  return tasks.find(t => t.id === id);
}

/**
 * آمار کلی (reduce)
 */
export function getStats(tasks) {
  return tasks.reduce(
    (acc, t) => {
      acc.total++;
      if (t.completed) acc.completed++;
      else acc.pending++;
      return acc;
    },
    { total: 0, completed: 0, pending: 0 }
  );
}

/**
 * استخراج شناسه‌های وظایف (map)
 */
export function getAllIds(tasks) {
  return tasks.map(t => t.id);
}

/**
 * بررسی وجود یک عنوان با includes
 */
export function containsTitle(tasks, title) {
  return tasks.map(t => t.title).includes(title);
}