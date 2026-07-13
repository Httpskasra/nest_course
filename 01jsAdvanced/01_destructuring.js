const user = {
  name: "Ali",
  age: 25,
  gender:'female'
};

const { name, age } = user;

const UserId = {...user , id:25000}

console.log(name, age);
console.log(UserId);