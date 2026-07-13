function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  console.log("Hello " + this.name);
};



// 
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log("Hello " + this.name);
  }
}

const u = new User("Ali");
u.sayHello();

// 

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
d.speak();