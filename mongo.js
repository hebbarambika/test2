const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/clubs", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error("MongoDB connection error:", error))

// mongooseSequence.initialize(mongoose);
  

const adminSchema=new mongoose.Schema({
        adminId:{
            type:String,
            required:true,
            unique: true,
        },
        password:{
            type:String,
            required:true
        },
        club: {
            type: String,
            required: true,
          },
    
    });
    
    const admins = mongoose.model('admin', adminSchema);
    

const newSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    sem: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: Number,
        required: false
    },
    clubName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


    const users = mongoose.model("users", newSchema);
    
    const eventSchema = new mongoose.Schema({
        // eventId: { type: Number,required: true, unique: true },
        eventType:{ type: String, required: true },
        eventName: { type: String, required: true },
        eventDate: { type: Date, required: true },
        eventVenue: { type: String, required: true },
        eventTime: { type: String, required: true },
        enrollmentLastDate: { type: Date, required: true },
        eventDescription: { type: String, required: true },
        eventRules: { type: String, required: true },
        createdBy:{type: String, required: true },
        club:{type: String, required: true },
      });
      
      const events = mongoose.model('events', eventSchema);
      
    
    // // // const clubSchema = new mongoose.Schema({
    // // //     name: {
    // // //       type: String,
    // // //       required: true
    // // //     },
    // // //     info: {
    // // //       type: String,
    // // //       required: true
    // // //     },
    // // //     event: {
    // // //       type: String,
    // // //       required: true
    // // //     },
    // //   });
      
     
    //   // const Club = mongoose.model("Club", clubSchema);

module.exports={users,admins,events};