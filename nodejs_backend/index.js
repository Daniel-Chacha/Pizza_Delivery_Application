const express = require('express');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require ('dotenv')
const app= express()
const  mongoose  = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')


dotenv.config()
app.use(express.json());
app.use(cors());

const mongoURI = process.env.DATABASE_URL ;
// const mongoURI ="mongodb://localhost:27017/PizzaInn_db"
//connect to the MongoDB Atlas
mongoose.connect(mongoURI)
    .then( () =>console.log("Connected to MongoDB  Atlas") )
    .catch((err) =>console.error("Error connecting to MondoDB Atlas:", err));

const db =mongoose.connection;

//connection events
// db.on('connected', () =>{
//     console.log('Connected to MongoDb successfully');
// })

// db.on('error', (err) =>{
//     console.error('MongoDb connection error', err);
// })

//Use mongoose schema
const userSchema = new mongoose.Schema({
    fname: {type: String, required:true ,minlength: 2},
    lname: {type: String, required:true, minlength: 2},
    email: {type: String, required:true ,unique: true },
    profilePikUrl: {type: String, required:true},
    joinedAt: {type: Date, default:Date.now },  //automatically sets the current date and time
});

const User= mongoose.model('Users', userSchema); //will create the collection if it doesn't exist

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



app.listen(4000, () =>{
    console.log("Server is running at port 4000");
});