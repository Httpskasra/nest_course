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