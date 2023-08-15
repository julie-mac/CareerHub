const mongoose = require('mongoose');
const Post = require('./Post'); // Make sure the path points to your Post model
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: String,
    content: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Change the type to ObjectId and ref to 'User'
    topic: String,
    replies: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likes: [String],
  }, { timestamps: true });

// Middleware to handle removal of related posts when a thread is removed
ThreadSchema.pre('remove', async function(next) {
    try {
        // Remove all posts associated with the thread
        await Post.deleteMany({ threadId: this._id });
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Thread', ThreadSchema);
