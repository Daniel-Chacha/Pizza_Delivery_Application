const express = require('express');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require ('dotenv')
const app= express()
const  mongoose  = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const multer = require('multer');
const path = require('path');

const Order =require('./models')  //import the order model

dotenv.config()
app.use(express.json());
app.use(cors());

const mongoURI = process.env.DATABASE_URL ;
// const mongoURI ="mongodb://localhost:27017/PizzaInn_db"
//connect to the MongoDB Atlas
mongoose.connect(mongoURI)
    .then( () =>console.log("Connected to MongoDB  Atlas") )
    .catch((err) =>console.error("Error connecting to MongoDB Atlas:", err));

const db =mongoose.connection


//Use mongoose schema
const userSchema = new mongoose.Schema({
    fname: {type: String, required:true ,minlength: 2},
    lname: {type: String, required:true, minlength: 2},
    email: {type: String, required:true ,unique: true },
    profilePikUrl: {type: String, required:true},
    joinedAt: {type: Date, default:Date.now },  //automatically sets the current date and time
});

const pizzaSchema = new mongoose.Schema({
    Id: {type: Number},  //auto incremented field
    category: {type: String, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    url: {type: String, required: true},
    sizes: {
        size1: {
            id: {type: Number, required: true},
            level: {type: String, required: true},
            diameter: {type: Number, required: true},
            price: {type: Number, required: true}
        },size2: {
            id: {type: Number, required: true},
            level: {type: String, required: true},
            diameter:{type: Number, required: true},
            price: {type: Number, required: true}
        },size3: {
            id: {type: Number, required: true},
            level:{type: String, required: true},
            diameter: {type: Number, required: true},
            price: {type: Number, required: true}
        },size4: {
            id: {type: Number, required: true},
            level: {type: String, required: true},
            diameter: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    }
})
//Add auto-incremented pluggin
pizzaSchema.plugin(AutoIncrement, {inc_field: "Id"})

const User= mongoose.model('Users', userSchema); //will create the collection if it doesn't exist
const readyPizza = mongoose.model('readyPizzas', pizzaSchema)  // will create the collection named readyPizzas if it doesn't exist


mongoose.set("debug", true);

//POST endpoint to create a save user data
app.post('/signup', async(req, res) =>{
    try{
        const {fname, lname,email, profilePikUrl } =req.body;
        const newUser = new User({fname, lname, email, profilePikUrl});

        //save user data
        const savedUser = await newUser.save();

        //Access or create User collection
        // const result =await usersCollection.insertOne({fname, lname, email, profilePikUrl});

        res.status(201).json({
            message: 'User registered successfully',
            user: savedUser  //return the details of inserted user
        });
    }catch(error){
        console.error("Error saving the user", error);
        res.status(500).json({error: "An error occurred while signing up the user."})
    }
})

app.post("/save-ready-pizza", async(req, res) =>{
    try{
        console.log(req.body); 
        // const {category, description,quantity, url, sizes }=req.body; 

        //create a new pizza document
        // const newPizza =new readyPizza({category, description, quantity, url, sizes})
        const newPizza= new readyPizza(req.body);

        await newPizza.save();

        //send a success response
        res.status(201).json({
            message: 'Pizza saved successfully',
            pizza: newPizza
        })
    }catch(error){
        console.error("Error saving the Pizza details", error);
        res.status(500).json({message: 'An error occurred while saving Pizza Details', error})
    }
})

app.get("/api/pizzas", async(req, res) =>{
    try{
        const pizzas =await readyPizza.find();
        res.json(pizzas);
    }catch(error){
        console.error("Error fetching data from the database", error);
        res.status(500).json({error: "Server error"});
    }
})

app.get("/api/get-user-id", async(req, res) =>{
    const {email} = req.body;

    if (!email){
        return res.status(400).json({ error: "Email is required" });
    }

    try{
        //find the user by email
        const user= await Users.findOne({email});

        if(!user){
            return res.status(404).json({error: "User not found"});
        }else{
            res.json({userId: user})
        }
    }catch(error){
        console.error("Error retrieving user details", error)
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.post("/api/add-to-cart", async(req, res) =>{

})

app.get('/api/orders', async(req, res) =>{
    try{
        const {pizzas, totalPrice,userId, status} = req.body;

        const newOrder =new Order({
            pizzas, totalPrice, userId, status
        })

        const savedOrder = await newOrder.save()  //save to the database

        res.status(201).json(savedOrder)
    }catch(error){
        console.error("Error saving order; ", error);
        res.status(500).json({error: "Internal server error "})
    }
})

app.listen(4000, () =>{
    console.log("Server is running at port 4000");
});




