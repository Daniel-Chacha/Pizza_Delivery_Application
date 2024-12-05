
const mongoose = require('mongoose')

const sizeSchema =new mongoose.Schema({
    level: {type:String, required: true },
    diameter:  {type:Number, required: true},
    quantity: {type: Number, required: true},
    price: {type:Number, required: true}
})

const PizzaSchema =new mongoose.Schema({
    name: {type: String, required: true},
    sizes: {type: [sizeSchema], required: true},
    flavour: {type: String, required: true}
});

const OrderSchema= new mongoose.Schema({
    orderDate: {type: Date, default:Date.now , index: true},
    pizzas: {type:[PizzaSchema], required:true},
    totalPrice: {type: Number, required: true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: "Users", required: true, index:true}, 
    status: {type: String, default: "Pending"}   
})
OrderSchema.index({userId:1, orderDate:-1})
const Order =mongoose.model("Order", OrderSchema);

const CartSchema = new mongoose.Schema({
    addedOn: {type: Date, default:Date.now , index: true},
    pizzas: {type:[PizzaSchema], required:true},
    totalPrice: {type: Number, required: true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: "Users", required: true, index:true}, 
})

CartSchema.index({userId:1, addedOn:-1})
const Cart =mongoose.model("Cart", CartSchema);

module.exports =Order, Cart;