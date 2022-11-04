import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true , unique: true},
    name: { type: String, required: true },
    emailId: { type: String, required: true},
    phoneNumber:{type:Number,require:true},
    password: {
      type: String,
      required: true,
     
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
