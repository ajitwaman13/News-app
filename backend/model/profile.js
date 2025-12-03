import mongoose from "mongoose";



const profileSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
         ref:"User"
    },
    name :{
        type:String ,
    },
    nickname:{
        type:String ,
    },
    age:{
        type:Number,
        
    },
    phoneNumber:{
        type:Number
    },

})


const profileModel=mongoose.model("profile",profileSchema)

export default profileModel;