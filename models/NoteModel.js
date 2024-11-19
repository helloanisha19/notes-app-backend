import { Schema, model } from "mongoose";

// Define the schema for the notes
const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    versionKey: false, // Disable version key (_v)
  }
);

// Create the Note model from the schema
const NoteModel = model("Note", noteSchema);

export default NoteModel;
