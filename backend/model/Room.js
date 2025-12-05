import mongoose from "mongoose"


const Schema = mongoose.Schema

export const Room = new Schema({
  name : {
    type : String,
    required : true
  },
  // add tags later 
  //

  members: [{
    type : Schema.Types.ObjectId, Ref : "User"
    
  }], {timestamps : true}


})
