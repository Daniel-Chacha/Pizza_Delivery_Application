const express = require('express');
const dotenv = require ('dotenv')
const app= express()
const  mongoose  = require('mongoose')
// const bodyParser = require('body-parser');
const cors = require('cors')
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const multer = require('multer');
const path = require('path');


const Order =require('./models')  //import the order model
const Cart = require('./models')

dotenv.config()
app.use(express.json());
//  Allow requests from  frontend URL
app.use(cors({
    origin: "https://pizzainn.vercel.app",  // frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const mongoURI = process.env.DATABASE_URL ;
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

        const savedPizza = await newPizza.save();

        //send a success response
        res.status(201).json({
            message: 'Pizza saved successfully',
            pizza: savedPizza
        })
    }catch(error){
        console.error("Error saving the Pizza details", error);
        res.status(500).json({error: 'An error occurred while saving Pizza Details', error})
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

app.get("/api/get-user-details", async(req, res) =>{
    const {email} = req.query;

    if (!email){
        return res.status(400).json({ error: "Email is required" });
    }

    try{
        //find the user by email
        const user= await User.findOne({email});

        if(!user){
            return res.status(404).json({error: "User not found"});
        }else{
            res.json(user)
        }
    }catch(error){
        console.error("Error retrieving user detailss", error)
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.post("/api/add-to-cart", async(req, res) =>{
    try{
        const {category, sizes, quantities,prices,totalPrice,userId} = req.body;
        
        if(!category || !sizes || !quantities || !prices || !totalPrice || !userId){
        	return res.status(400).json({error: "Missing required fields"});
        }
        
        const formattedSizes = sizes.map((size, index) =>{
        	if(!size.level || !size.diameter){
        		throw new Error("Invalid size structure");
        	}
        	return {
        		level: size.level,
        		diameter: size.diameter,
        		quantity: quantities[index],
        		price :prices[index],
        	};
        })

        const newCart =new Cart({
            pizzas:
            {           
            	name:category,
            	sizes: formattedSizes,
            },
            
            totalPrice,
            userId
        })

        const savedCart = await newCart.save()  //save to the database

        res.status(201).json(savedCart)
    }catch(error){
        console.error("Error saving order; ", error);
        res.status(500).json({error: "Internal server error "})
    }
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

app.get("/api/get-user-cart-data", async(req,res) =>{
	const {userId} = req.query;
	
	if(!userId){
		res.status(400).json({error: "UserId is required"})
	};
	
	try{
	//Find all the cart entries for the user
	const details =await Cart.find({userId}).sort({ addedOn: -1 })   //Sort by the most recent
	
	if(!details || details.length === 0){
		return res.status(404).json({message: "No Items added to Cart yet. "})
	}else{
		res.status(200).json(details);
	}	
	
	}catch(error){
		console.error("Error fetching cart details: ", error);
		res.status(500).json({error: "Internal Server Error"});
	}
})


app.listen(process.env.PORT, () =>{
    console.log("Server is running at port ", process.env.PORT);
});




