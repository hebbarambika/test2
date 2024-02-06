const express = require("express")
const {users,admins,events,clubInfos} = require("./mongo")
//const alloweduser = require("./mongo")
require('dotenv').configDotenv();
// dotenv.config();
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken");
// const { configDotenv } = require("dotenv");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }
  


app.get("/",cors(),(req,res)=>{

})


app.post("/Signup",async(req,res)=>{
        const{userType,username,name,email,sem,contactNumber,clubName,course,password}=req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const data={
            userType:userType,
            username:username,
            name:name,
            email:email,
            sem:sem,
            contactNumber:contactNumber,
            clubName:clubName,
            course:course,
            password:hash,
    
        }
        
        try{
                 const check= await users.findOne({username:username})
    
                 if(check){
                    res.json("exist")
                }
                else{
                    const test = await users.insertMany([data])
                    console.log("test=======>",test)
                    const token = createToken(test[0]._id)
                    res.json("notexist")
                    // res.status(200).json({test,token})
                   
                }
               
        }
        catch(e){
            res.json("fail")
        }
    
    })
    
app.post("/login",async(req,res)=>{
        const{username,password}=req.body
    
        try{
            const user=await users.findOne({username:username})
    
            if (user) {
                 const match = await bcrypt.compare(password, user.password)
                 if (match) {
                         const token = createToken(user._id)
                         res.status(200).json({ status: "match", user: user,token: token});
                        //  res.status("match").json({user,token});
                        }
                else{
                    // Passwords don't match, return "notexist"
                    res.status(401).json({ status: "doesnotmatch" });
                }
            } 
            else{
                res.status(404).json({ status: "notexist" });
            }
    
        }
        catch(e){
            console.error(e);
            res.status(500).json({ status: "fail" });
        }
    
    })
    
    
    
app.post("/adminlogin", async (req, res) => {
        const { adminId, password } = req.body;
      
        try {
          const foundAdmin = await admins.findOne({ adminId: adminId.trim()});
          
      
          if (foundAdmin) {
                if (foundAdmin.password !== password) {
                    res.status(401).json({ status: "doesnotmatch" }); // Unauthorized status code
                }
                else {
                    res.status(200).json({ status: "match", admin: foundAdmin }); // OK status code
                }
          } 
          else {
            res.status(404).json({ status: "notexist" }); // Not Found status code
          }
        } catch (e) {
          console.error(e);
          res.status(500).json({ status: "fail" }); // Internal Server Error status code
        }
    });
      
      
    
app.post("/addevent",async(req,res)=>{
        const{eventType,eventName,eventDate,eventVenue,eventTime,enrollmentLastDate,eventDescription,eventRules,createdBy,club,}=req.body
        // const eventId = await mongooseSequence.next("events");
        const eventdata={
            // eventId:eventId,
            eventType:eventType,
            eventName:eventName,
            eventDate:eventDate,
            eventVenue:eventVenue,
            eventTime:eventTime,
            enrollmentLastDate:enrollmentLastDate,
            eventDescription:eventDescription,
            eventRules:eventRules,
            createdBy:createdBy,
            club:club,
    
        }
        
        try{
                 const check=await events.findOne({eventName:eventName})
    
                 if(check){
                    res.json("exist")
                }
                else{
                    
                    await events.insertMany([eventdata])
                    res.json("notexist")
                }
               
        }
        catch(e){
            console.error(e);
            res.json("fail")
        }
    
    });

app.get('/getevents', async (req, res) => {
        const { adminId, club } = req.query; // Use req.query to access query parameters
    
        try {
            const event = await events.aggregate([
                { 
                    $match: { createdBy: adminId, club: club } 
                },
                {
                    $group: {
                        _id: '$eventType', // Group by eventType field
                        events: { $push: '$$ROOT' } // Store all matching events in an array
                    }
                }
            ]);
            console.log(event)
            res.json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
app.get('/viewmembers', async (req, res) => {
        const { club } = req.query; // Get the club from query parameters
        
        try {
            // Assuming you have a "users" collection to store user data
            const members = await users.find({ clubName: club }); // Find users where clubName matches the admin's club
            res.json(members);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/clubpage', async (req, res) => {
        const { club } = req.body; // Extract the club name from req.body
        try {
            // Fetch club data based on the club name
            const clubinfo = await clubInfos.findOne({ name: club }).exec();
            // Fetch events data based on the club name
            const event = await events.find({ club: club }).exec();
            console.log(clubinfo)
            res.json({ clubinfo, event });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
      
    
    
      
    
app.listen(3000,()=>{
        console.log("port connected");
        console.log("test====>",process.env.SECRET)
    });