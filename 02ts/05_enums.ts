enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log("Color.Green:", c); // 1
let colorName: string = Color[2];
console.log("Color[2]:", colorName); // Blue

enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}
function updateStatus(status: OrderStatus) {
  console.log("Order status:", status);
}
updateStatus(OrderStatus.Shipped);