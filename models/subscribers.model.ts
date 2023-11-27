import { Schema, model } from "mongoose";

const subscriberSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationDate: {
      type: Date,
      default: null,
    },
    unsubscribed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

subscriberSchema.index({email: 1}, {unique: true})

const Subscriber = model("Subscriber", subscriberSchema);

export default Subscriber;
