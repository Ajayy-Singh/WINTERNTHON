import { Router } from "express";
import Writing from "../models/Writing";
import auth, { AuthRequest } from "../middleware/auth";

const router = Router();

// Save writing (auto-save)
router.post("/", auth, async (req: AuthRequest, res) => {
  const writing = await Writing.create({
    userId: req.userId,
    title: req.body.title || "",
    content: req.body.content,
  });

  res.json(writing);
});

// Get all writings of user
router.get("/", auth, async (req: AuthRequest, res) => {
  const writings = await Writing.find({ userId: req.userId });
  res.json(writings);
});

// UPDATE writing
router.put("/:id", auth, async (req: AuthRequest, res) => {
  const updated = await Writing.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    {
      title: req.params.id,
      content: req.body.content,
    },
    { new: true }
  );
  res.json(updated);
});

// DELETE writing
router.delete("/:id", auth, async (req: AuthRequest, res) => {
  await Writing.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  res.json({ message: "Deleted successfully" });
});

// GET single writing (for edit)
router.get("/:id", auth, async (req: AuthRequest, res) => {
  const writing = await Writing.findOne({
    _id: req.params.id,
    userId: req.userId,
  });
  res.json(writing);
});

export default router;
