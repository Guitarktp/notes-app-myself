import express from "express";
import noteData from "../models/note.js";
import authenticateMiddleware from "../middleware/authenticateMiddleware.js";

const router = express.Router();

// API - Add note

router.post("/add-note", authenticateMiddleware, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;
  // console.log(user)
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }
  try {
    const newNote = new noteData({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await newNote.save();
    return res.json({
      data: newNote,
      message: "Note added successful",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// API - Edit note
router.put("/edit-note/:noteId", authenticateMiddleware, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }
  try {
    const noteInfo = await noteData.findOne({ _id: noteId, userId: user._id });

    console.log(noteInfo);

    if (!noteInfo) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) noteInfo.title = title;
    if (content) noteInfo.content = content;
    if (tags) noteInfo.tags = tags;
    if (isPinned) noteInfo.isPinned = isPinned;

    await noteInfo.save();
    return res.json({
      error: false,
      noteInfo,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// API - Update isPinned
router.put("/update-pinned/:noteId", authenticateMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const user = req.user;

    try {
      const noteInfo = await noteData.findOne({ _id: noteId, userId: user.id });

      if (!noteInfo) {
        return res.status(404).json({ error: true, message: "Note not found" });
      }
      noteInfo.isPinned = isPinned;

      await noteInfo.save();
      return res.json({
        data: noteInfo,
        message: "Note pinned status updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  }
);

// API - Get all note
router.get("/get-all-notes", authenticateMiddleware, async (req, res) => {
  const user = req.user;
  // use sort for pinned note on the top
  try {
    const allNotes = await noteData.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
        error: false,
        allNotes,
        message: "All notes retrieved successfully",
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});


// API - Delete Note
router.delete("/delete-note/:noteId", authenticateMiddleware, async(req, res) => {
    const user = req.user;
    const noteId = req.params.noteId;
    try {
        const deletetNote = await noteData.deleteOne({_id:noteId, userId:user._id})
        if (!deletetNote) {
            return res.status(404).json({ error: true, message: "Note not found" });
            
          }
        return res.json({
        error: false,
        message: "Note deleted successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
        error: true,
        message: "Internal Server Error",
        });
        
    }

})

export default router;
