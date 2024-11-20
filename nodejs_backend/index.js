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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//connect to Mongodb
// let database;
// client.connect()
//     .then(()=>{
//         database = client.db("PizzaDelivery")
//         console.log("Connected to MongoDb Atlas!")
//     })
//     .catch((error) =>{
//         console.error("Error connecting to MondoDb", error);
//     })

//connect to the MongoDB Atlas
mongoose.connect(mongoURI)
    .then( () =>console.log("Connected to MongoDB  Atlas") )
    .catch((err) => {"Error connecting to MondoDB Atlas:", err});

//Use mongoose schema
const userSchema = new mongoose.Schema({
    fname: {type: String, required:true},
    lname: {type: String, required:true},
    email: {type: String, required:true},
    profilePikUrl: {type: String, required:true},
    joinedAt: {type: Date, default:Date.now },  //automatically sets the current date and time
});

// const User= mongoose.model('Users', userSchema); //will create the collection if it doesn't exist


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