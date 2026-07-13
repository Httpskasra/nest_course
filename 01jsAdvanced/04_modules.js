// همه چیز global است
function sum(a, b) {
  return a + b;
}

///
import { sum, multiply } from "./math.js";

console.log(sum(2, 3));
console.log(multiply(2, 3));