// old (Constructor Function)
function UserOld(name) {
  this.name = name;
}
UserOld.prototype.sayHello = function () {
  console.log("(Old) Hello " + this.name);
};

// new (Class)
class User {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("(Class) Hello " + this.name);
  }
}

const u1 = new UserOld("Ali");
u1.sayHello();

const u2 = new User("Ali");
u2.sayHello();

// Inheritance
class Animal {
  speak() {
    console.log("Animal sound");
  }
}
class Dog extends Animal {
  speak() {
    console.log("Woof");
  }
}
const d = new Dog();
d.speak(); // Woof

// static
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}
console.log("Static add:", MathHelper.add(5, 3)); // 8