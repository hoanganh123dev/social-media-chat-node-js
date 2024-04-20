import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
