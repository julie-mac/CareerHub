const express = require('express');
const router = express.Router();

const Thread = require('../../models/Thread');
const Post = require('../../models/Post');

// Route to reply to a thread
router.post("/:threadId/reply", async (req, res) => {
    const { content, userId } = req.body;
    const threadId = req.params.threadId;

    const newPost = new Post({
        content,
        userId,
        threadId
    });

    try {
        const savedPost = await newPost.save();
        const thread = await Thread.findById(threadId);
        
        if (!thread) {
            res.status(404).json({ error_message: "Thread not found!" });
        } else {
            thread.replies.push(savedPost._id);
            await thread.save();
            res.json({
                message: "Reply posted!",
                post: savedPost,
                thread: thread
            });
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to post reply!" });
    }
});

// Route to get all posts by a specific user
router.get("/user/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.json(posts);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to get posts!" });
    }
});

// Route to edit a specific post
router.put("/:postId", async (req, res) => {
    const { content } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ error_message: "Post not found!" });
        } else {
            post.content = content;
            const updatedPost = await post.save();
            res.json(updatedPost);
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to edit post!" });
    }
});

// Route to delete a specific post
router.delete("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ error_message: "Post not found!" });
        } else {
            await Post.deleteOne({ _id: req.params.postId });
            res.json({ message: "Post deleted successfully!" });
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to delete post!" });
    }
});

module.exports = router;
