const express = require("express")
const {users,admin,event} = require("./mongo")
//const alloweduser = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})


app.post("/Signup",async(req,res)=>{
        const{educationLevel,username,fullName,email,year,course,contactNumber,club,password}=req.body
    
        const data={
            educationLevel:educationLevel,
            username:username,
            fullName:fullName,
            email:email,   
            year:year,
            course:course,
            contactNumber:contactNumber,
            club:club,
            password:password,
    
        }
        
        try{
                 const check=await users.findOne({username:username})
    
                 if(check){
                    res.json("exist")
                }
                else{
                    res.json("notexist")
                    await users.insertMany([data])
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
                // Check if the provided password matches the stored password
                if (user.password === password) {
                    // Passwords match, return "exist"
                    res.json("match");
                } else if(user.password!=password) {
                    // Passwords don't match, return "notexist"
                    res.json("doesnotmatch");
                }
            } 
            else{
                res.json("notexist")
            }
    
        }
        catch(e){
            res.json("fail")
        }
    
    })
    
    
    
    app.post("/adminlogin", async (req, res) => {
        const { adminId, password, club } = req.body;
      
        try{
          const isadmin=await admin.findOne({adminId:adminId})
    
          if (isadmin) {
            // console.log("DB Password:", isadmin.password);
            // console.log("Entered Password:", password);
        
           
              if (isadmin.password !== password || isadmin.club !== club) {
                  // Password or club doesn't match, return "doesnotmatch"
    
                  console.log("Password or Club doesn't match");
                  res.json("doesnotmatch");
              } else {
                  // Both password and club match, return "match"
                  
                  console.log("Password and Club match", isadmin.id);
                  res.json(isadmin.id);
              }
          } 
          else {
              // Admin with the given adminname doesn't exist, return "notexist"
              res.json("notexist");
              console.log("Admin not found");
          }
    
      }
      catch(e){
          res.json("fail")
      }
    
    });
      
    
    app.post("/addevent",async(req,res)=>{
        const{eventType,eventName,eventDate,eventVenue,eventTime,enrollmentLastDate,eventDescription,eventRules,}=req.body
        const eventId = await mongooseSequence.next("events");
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
    
        }
        
        try{
                 const check=await event.findOne({eventName:eventName})
    
                 if(check){
                    res.json("exist")
                }
                else{
                    res.json("notexist")
                    await event.insertMany([eventdata])
                }
               
        }
        catch(e){
            res.json("fail")
        }
    
    })

    app.get('/getevents', async (req, res) => {
        try {
          const events = await event.find();
          res.json(events);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      
    
    app.listen(3000,()=>{
        console.log("port connected");
    })