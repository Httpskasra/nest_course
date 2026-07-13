
class Animal {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
// const a = new Animal("Cat"); a.name; // خطا
//
abstract class Shape {
  abstract getArea(): number;
  printArea(): void { console.log(this.getArea()); }
}
class Circle extends Shape {
  constructor(public radius: number) { super(); }
  getArea(): number { return Math.PI * this.radius ** 2; }
} 
// 
interface IClock {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock implements IClock {
  currentTime: Date = new Date();
  setTime(d: Date) { this.currentTime = d; }
}
// 
function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>("hello"); // type string
const inferred = identity(42); // type number
