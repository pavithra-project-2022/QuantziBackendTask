import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId:{type:String},
    fatherName: { type: String },
    motherName: { type: String },
    street: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    educationDetails: [
      {
        qualification: { type: String },
        since: { type: Date },
        to: { type: Date },
        percentage: { type: Number },
        completed: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
