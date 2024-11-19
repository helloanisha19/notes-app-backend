import NoteModel from "../models/NoteModel.js";

// Get all notes for a user
export const getAllNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find({ user: req.body.user });
    res.status(200).json({
      data: notes,
      message: "Notes retrieved successfully",
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to retrieve notes",
      status: 0,
    });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const newNote = new NoteModel(req.body);
    await newNote.save();
    res.status(201).json({
      message: "Note created successfully",
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create note",
      status: 0,
    });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
        status: 0,
      });
    }
    res.status(200).json({
      message: "Note updated successfully",
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to update note",
      status: 0,
    });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await NoteModel.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
        status: 0,
      });
    }
    res.status(200).json({
      message: "Note deleted successfully",
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to delete note",
      status: 0,
    });
  }
};
