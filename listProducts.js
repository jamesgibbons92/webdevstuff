var faker = require('faker');


console.log("Your shopping basket:")
for (var i=0; i < 10; i++){
    console.log(faker.commerce.productName()+", $"+faker.commerce.price());
}