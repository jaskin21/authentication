import mongoose from 'mongoose';

const UserModelSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    // index: true,
    max: 255,
  },
  userclass: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  password: {
    require: true,
    type: String,
    min: 8,
  },
  emailAddress: {
    type: String,
    require: true,
  },
});

export default mongoose.model('User', UserModelSchema);
