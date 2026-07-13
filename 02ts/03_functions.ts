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


// function sendEmail1(to: string, subject: string, body: string): Promise<boolean> {
//   return new Promise((resolve, reject) => {
//     // ارسال ایمیل به صورت ناهمگام
//     emailService.send(to, subject, body, (error, result) => {
//       if (error) {
//         reject(false); // یا reject(error)
//       } else {
//         resolve(true);
//       }
//     });
//   });
// }

// function sendEmail2(to: string, subject: string, body: string): Promise<boolean> {
//   return new Promise((resolve) => {
//     // شبیه‌سازی ارسال ایمیل با setTimeout (مثلاً ۲ ثانیه)
//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
// }

const result = sendEmail("a@b.com", "T", "B");
console.log(result); // Promise { <pending> } — نه true!
console.log("ادامه برنامه...");


// union return type
function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, p) => sum + p, 0);
}
console.log("Total:", calculateTotal([10, 20, 30]));