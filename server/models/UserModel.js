import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, trim: true },
  person: { type: String, required: true },
  fatherName: { type: String, required: false },
  motherName: { type: String, required: false },
  address: { type: String, required: true },
  class: [Number],
  subjects: [String],
});

const User = mongoose.model("User", UserSchema);
export default User;
