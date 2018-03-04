import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Message', MessageSchema);
