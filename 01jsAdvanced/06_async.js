// // with out promise
// function getUser(callback) {
//   setTimeout(() => {
//     console.log("User fetched");
//     callback({ id: 1, name: "Ali" });
//   }, 1000);
// }

// function getOrders(userId, callback) {
//   setTimeout(() => {
//     console.log("Orders fetched");
//     callback(["order1", "order2"]);
//   }, 1000);
// }

// function getOrderDetails(order, callback) {
//   setTimeout(() => {
//     console.log("Order details fetched");
//     callback({ order, price: 100 });
//   }, 1000);
// }

// // CALLBACK HELL
// getUser(user => {
//   getOrders(user.id, orders => {
//     getOrderDetails(orders[0], details => {
//       console.log(details);
//     });
//   });
// });


// // solution
// function getUser() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({ id: 1, name: "Ali" });
//     }, 1000);
//   });
// }

// function getOrders(userId) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(["order1", "order2"]);
//     }, 1000);
//   });
// }

// function getOrderDetails(order) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({ order, price: 100 });
//     }, 1000);
//   });
// }

// // استفاده
// getUser()
//   .then(user => getOrders(user.id))
//   .then(orders => getOrderDetails(orders[0]))
//   .then(details => console.log(details))
//   .catch(err => console.error(err));






  // ========== ۱. روش Callback (جهنم callback) ==========
function getUser_CB(callback) {
  setTimeout(() => {
    console.log("1- User fetched");
    callback({ id: 1, name: "Ali" });
  }, 1000);
}
function getOrders_CB(userId, callback) {
  setTimeout(() => {
    console.log("2- Orders fetched");
    callback(["order1", "order2"]);
  }, 2000);
}
function getOrderDetails_CB(order, callback) {
  setTimeout(() => {
    console.log("3- Order details fetched");
    callback({ order, price: 100 });
  }, 1000);
}

console.log("--- Callback Hell ---");
getUser_CB(user => {
  getOrders_CB(user.id, orders => {
    getOrderDetails_CB(orders[0], details => {
      console.log("نتیجه:", details);
    });
  });
});

// ========== ۲. روش Promise ==========
// new Promise((resolve, reject) => {
//   // کار ناهمگام
//   if (موفق) resolve(مقدار);
//   else reject(خطا);
// });
function getUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("1- User fetched (Promise)");
      resolve({ id: 1, name: "Ali" });
    }, 1000);
  });
}
function getOrders(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("2- Orders fetched (Promise)");
      resolve(["order1", "order2"]);
    }, 1000);
  });
}
function getOrderDetails(order) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("3- Order details fetched (Promise)");
      resolve({ order, price: 100 });
    }, 1000);
  });
}
// اجرای زنجیره‌ای
setTimeout(() => {  // تأخیر کوچک برای جدا شدن از بخش قبل
  console.log("\n--- Promise Chain ---");
  getUser()
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0]))
    .then(details => console.log("نتیجه:", details))
    .catch(err => console.error(err));
}, 3500); // صبر کن تا callback تمام شود

// ========== ۳. روش Async/Await ==========
async function fetchOrderDetails() {
  try {
    console.log("\n--- Async/Await ---");
    const user = await getUser();
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0]);
    console.log("نتیجه:", details);
  } catch (error) {
    console.error(error);
  }
}
setTimeout(fetchOrderDetails, 7000); // اجرا بعد از promise