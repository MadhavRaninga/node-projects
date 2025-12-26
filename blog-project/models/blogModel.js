const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    description: {
      type: String,
      required: [true, "Blog description is required"],
    },

    content: {
      type: String,
      required: [true, "Blog content is required"]
    },

    image: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      enum: ["Technology", "Education", "Business", "Lifestyle", "Other"]
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Blog", blogSchema)
