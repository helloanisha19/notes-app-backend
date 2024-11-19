import { Schema, model } from "mongoose";

// Define the schema for the user
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    versionKey: false, // Disable version key (_v)
  }
);

// Create the User model from the schema
const UserModel = model("User", userSchema);

export default UserModel;
