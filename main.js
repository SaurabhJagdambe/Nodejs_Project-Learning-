// console.log("Server is Starting..")
// var add =(a,b) =>{return a+b}
// console.log(add(2,3))

// (function(){
//     console.log("Hello Callback");
// })();

//
// function callback(){
//   console.log("You Called Me")
// }
// function add(a,b,callback){
//   var result = a+b;
//   callback();
//   console.log(result)
// }
// add(5,7,callback)

// DAY1

// Problem1
var prompt = require("prompt-sync")();
var age = prompt("Enter your Age : ");
if (age < 18) {
  console.log("You Get 20% discount");
} else if (age > 18 && age < 65) {
  console.log("You Get Normal Ticket");
} else if (age >= 65) {
  console.log("You get 30% discount as Senior Citizen ");
}

// Problem2
