let isDone: boolean = false;
isDone = true; // صحیح
// isDone = 1; // خطا: Type 'number' is not assignable to type 'boolean'.

let decimal: number = 6;
function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, p) => sum + p, 0);
}
// 
function validateEmail(email: string): string | null {
  if (!email.includes('@')) return "ایمیل نامعتبر";
  return null;
}
// 
let list: number[] = [1, 2, 3];
let genericList: Array<string> = ["a", "b"];
// 
let x: [string, number];
x = ["hello", 10]; // صحیح
// x = [10, "hello"]; // خطا
console.log(x[0].substring(1)); // OK

// 
let notSure: any = 4;
notSure = "maybe a string";
notSure = false; // مشکلی نیست
// 
function warnUser(): void {
  console.log("This is a warning");
}
let unusable: void = undefined;

// 
let u: undefined = undefined;
let n: null = null;
// با strictNullChecks
let name1: string = "Ali";
// name = null; // خطا
let maybeName: string | null = null; // صحیح


// 

