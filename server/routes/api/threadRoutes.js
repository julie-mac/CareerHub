const express = require('express');
const router = express.Router();

const Thread = require('../../models/Threads');
const Post = require('../../models/Post');

// Route to create a thread
router.post("/create", (req, res) => {
    const { title, user_id, topic } = req.body;

    // Check for required fields
    if (!title || !user_id || !topic) {
        return res.status(400).json({ error_message: "Title, userId, and topic are required fields!" });
    }

    const newThread = new Thread({
        title,
        user_id,
        topic,
        replies: [],
        likes: []
    });

    newThread.save()
        .then(thread => {
            res.json({
                message: "Thread created successfully!",
                thread: thread,
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error_message: "Unable to create thread!" });
        });
});

router.post("/:threadId/like", async (req, res) => {
    const { userId } = req.body;
    const threadId = req.params.threadId;

    try {
        const thread = await Thread.findById(threadId);
        if (!thread) {
            res.status(404).json({ error_message: "Thread not found!" });
        } else {
            if (!thread.likes.includes(userId)) {
                thread.likes.push(userId);
                await thread.save();
                res.json({ message: "You've reacted to the post!" });
            } else {
                res.json({ error_message: "You can only react once!" });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to process request!" });
    }
});

// Route to view all threads
router.get("/", async (req, res) => {
    try {
        const threads = await Thread.find();
        res.json(threads);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to process request!" });
    }
});

// Route to view a single thread
router.get("/:threadId", async (req, res) => {
    const threadId = req.params.threadId;

    try {
        const thread = await Thread.findById(threadId).populate('replies');
        if (!thread) {
            res.status(404).json({ error_message: "Thread not found!" });
        } else {
            res.json(thread);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to process request!" });
    }
});

router.get("/topic/:topicName", async (req, res) => {
    const topicName = req.params.topicName;

    try {
        const threads = await Thread.find({ topic: topicName });
        if (!threads || threads.length === 0) {
            res.status(404).json({ error_message: "No threads found for this topic!" });
        } else {
            res.json(threads);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to process request!" });
    }
});

router.put("/:threadId/edit", async (req, res) => {
    const threadId = req.params.threadId;
    const { title } = req.body; // get the new title from the request body

    if (!title) {
        return res.status(400).json({ error_message: "Title is required!" });
    }

    try {
        const thread = await Thread.findById(threadId);
        
        if (!thread) {
            return res.status(404).json({ error_message: "Thread not found!" });
        }

        thread.title = title; // set the new title
        await thread.save();

        res.json({
            message: "Thread title updated successfully!",
            thread: thread
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to process request!" });
    }
});

// Route to delete a thread along with replies
router.delete("/:threadId", async (req, res) => {
    const threadId = req.params.threadId;

    try {
        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ error_message: "Thread not found!" });
        }

        // Delete all associated posts/replies
        await Post.deleteMany({ threadId: threadId });

        await Thread.deleteOne({ _id: threadId }); // Using deleteOne here

        res.json({ message: "Thread and its associated posts deleted successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to process request!" });
    }
});


module.exports = router;