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