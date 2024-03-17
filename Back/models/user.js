import mongoose from "mongoose";
const schema = mongoose.Schema

const userdb = new schema(
    {
        name:{
            type:String,
            required:true
        },
        mail:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        confirmpassword:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
            required:true
        }
    }
)
export default mongoose.model('auction_users',userdb);