import mongoose from 'mongoose';

const BidData = new mongoose.Schema({
  itemId:{
    type:String,
    required:true
},
  bidprice:{
    type:Number,
    required:true
  } ,
  time:{
    type: Date,
    default: Date.now,
  },
  mail:{
    type:String,
    required:true
  },
});

export default mongoose.model('BidData', BidData);
