import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 120,
    },
    imageURL: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v) || v.startsWith("/uploads/");
        },
        message: "Invalid image URL",
      },
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
