// کلاس با private و public
class Animal {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
const dog = new Animal("Dog");
// console.log(dog.name)
dog.move(10);

// Abstract class
abstract class Shape {
  abstract getArea(): number;
  printArea(): void {
    console.log("Area:", this.getArea());
  }
}
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
const circle = new Circle(3);
circle.printArea();

// implements interface
interface IClock {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock implements IClock {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
    console.log("Time set to:", d.toISOString());
  }
}
const clock = new Clock();
clock.setTime(new Date("2024-01-01"));

// Generic function
function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>("hello");
console.log("identity<string>:", result);
const inferred = identity(42);
console.log("identity (inferred):", inferred);