import mongoose from "mongoose"

const Schema = mongoose.Schema

export const MessgaeSchema = new Schema({
  content : {
    type : String,
    required : true,
  },
  room : {
    type : string, 
    required: true
    ref : "Room"
  },
  sender : {
    type : {
      type : String,
      required : true
      
    }
  },
  createdAt : {
    type :Date
    timestam : Date.now()
  },
// fix this later
  
})
