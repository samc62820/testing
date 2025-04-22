const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const  validateUserSchema = require("./helpers/userValidation");
const validateUpdateUser = require("./helpers/userValidation");

const app = express();

//middleware read json data and convert it to javascript object notation
app.use(express.json());

//Add user to the database
app.post("/addUser",validateUserSchema,  async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully!");

    }catch(err){
      res.status(400).send("Error!"+err.message);
    }

});

//fetch all user
app.get("/fetchAllUser",async(req,res)=>{
    try{
        const users = await User.find({});
         res.send(users);
    }catch(err){
        res.status(400).send("Error!"+err.message);
    }
});

//fetch a user by its id
app.get("/user/:userId", async(req,res)=>{
    const userId = req.params.userId;
    try{
        const data = await User.findById(userId).exec();
        res.send(data);
    }catch(err){
        res.status(400).send("Error!"+err.message);
    }
});

//edit user
app.patch("/editUser/:userId", validateUpdateUser, async(req,res)=>{
    const userId = req.params.userId;
    const user = req.body;
    try{
       await User.findByIdAndUpdate({ _id: userId}, user);
       res.send("User updated successfully!"); 
    }catch(err){
        res.status(400).send("Error!"+err.message);
    }
})
//find by id and delete
app.delete("/findByIdAndDelete",async(req,res)=>{
    const userId = req.body.userId;
    const user = req.body;
    try{
        await User.findOneAndDelete({ _id: userId}, user);
        res.send("User deleted successfully!") 

    }catch(err){
        res.status(400).send("Error!"+err.message)
    }

});

//Database connection
connectDB().then(()=>{
    console.log("Database connected succesfully!");
    app.listen(7777,()=>{
        console.log("App is successfully running on port 7777");
    });
}).catch((err)=>{
    console.log("Database cannot be connected!");
});



