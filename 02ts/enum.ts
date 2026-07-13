enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green; // 1
// let colorName: string = Color[2]; // "Blue"


enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED"
}
function updateStatus(status: OrderStatus) { 
    console.log(status)
 }
updateStatus(OrderStatus.Shipped);

