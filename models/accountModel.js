import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '.messages') });

const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: [true, process.env.REQUIRED_FIELD],
  },
  conta: {
    type: Number,
    required: [true, process.env.REQUIRED_FIELD],
  },
  name: {
    type: String,
    required: [true, process.env.REQUIRED_FIELD],
  },
  balance: {
    type: Number,
    min: [0, process.env.INSUFICIENT_BALANCE],
    required: [true, process.env.REQUIRED_FIELD],
  },
  lastModified: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const accountModel = mongoose.model('Account', accountSchema);

export { accountModel };
