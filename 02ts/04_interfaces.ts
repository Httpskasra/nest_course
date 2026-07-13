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



// Function Signature
interface SearchFunction {
  (query: string, limit: number): string[];
}

const search: SearchFunction = (q, l) => {
  return [`${q}1`, `${q}2`];
};

// implements
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}
  makeSound() {
    console.log("هاپ هاپ");
  }
}


// extends
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const emp: Employee = {
  name: "زهرا",
  age: 28,
  employeeId: 123,
  department: "فنی"
};



// api example 
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface UserInfo {
  id: number;
  email: string;
  name: string;
}

async function fetchUser(): Promise<ApiResponse<UserInfo>> {

  return {
    data: { id: 1, email: "a@b.com", name: "رضا" },
    status: 200,
    message: "OK"
  };
}