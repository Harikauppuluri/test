import mongoose from 'mongoose';

const auctionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  presentprice: {
    type: Number,
    required: true
  },
  posttime: {
    type: Date,
    default: Date.now
  },
  time: {
    type: Date,
    required: true
  },
  cat: {
    type: String,
    required: true
  },
  mail: {
    type: String
  },
  image: {
    type: String
  }
});

export default mongoose.model('AuctionItems', auctionItemSchema);
