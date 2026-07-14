import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
{
  locationName: {
    type: String,
    required: true,
    unique: true,
  },

  zone: {
    type: String,
    enum: [
      "Hostel Zone 1",
      "Hostel Zone 2",
      "Academic Zone",
      "Colony Zone",
    ],
    required: true,
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },

 caretaker:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User",
 default:null
}
},
{
  timestamps: true,
}
);

const Location = mongoose.model("Location", locationSchema);

export default Location;