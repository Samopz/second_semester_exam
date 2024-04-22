import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
    state: String,
    read_count: Number,
    reading_time: Number,
    body: String,
});

const Blog = mongoose.model("Blog", blogSchema,);
export default Blog;