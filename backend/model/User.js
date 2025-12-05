import mongoose from "mongoose"

const Schema = mongoose.Schema


export const UserSchema = new Schema({
  name : {type : String, unique : true, required: true},
  passwordHash : {
    type :  String ,
    required : true,
  },
  online : {
    type : Boolean,
    default : false
  }, id : {
  type : String,
    default : null


}
  

})
