interface Props {
  title: string;
  subtitle?: string; // string | undefined
}
// 
let userInput: unknown;
userInput = 5;
userInput = "hello";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // صحیح
}

// 
interface Person {
  name: string;
  age: number;
}
const ali: Person = { name: "Ali", age: 30 };

// 
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
// 
type ID = string | number;
let userId: ID = "abc123";
userId = 456;
type Point = { x: number; y: number };
// 
type TaskStatus = "todo" | "in-progress" | "done";
type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
// 
function greet(name: string): string {
  return `Hello, ${name}`;
}
function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  // ... logic
  return Promise.resolve(true);
}
// 
function buildName(first: string, last?: string): string {
  if (last) return first + " " + last;
  return first;
}
function pow(base: number, exp = 2): number {
  return Math.pow(base, exp);
}
// 