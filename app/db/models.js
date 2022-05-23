import { mongoose } from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    // img: {
    //   type: String,
    //   required: true,
    //   minLength: [3, "That's too short"],
    // },
    title: {
      type: String,
      required: true,
      minLength: [3, "That's too short"],
    },
    bio: {
      type: String,
      required: true,
      minLength: [3, "That's too short"],
    },
    hashtags: {
      type: String,
      required: true,
      minLength: [3, "That's too short"],
    },
  },
  { timestamps: true }
);

export const models = [
  {
    name: "Profile",
    schema: profileSchema,
    collection: "profiles",
  },
];
