const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const axios = require('axios');

const UNSPLASH_ACCESS_KEY = "aj0u6eTwr7Bq95X-8sun7WBR61N4aXNHzkp109kuS10"; // Replace with your Unsplash API key

const fetchImageFromUnsplash = async (topicName) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: topicName, per_page: 1 },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });

        return response.data.results[0]?.urls.small;
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        return null;
    }
};

// Route to get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();

    // Fetching image URLs for each topic
    const topicsWithImages = await Promise.all(topics.map(async (topic) => {
      const imageUrl = await fetchImageFromUnsplash(topic.name);
      return { ...topic._doc, imageUrl };
    }));

    res.json(topicsWithImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a topic by ID
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      // If no topic is found, return a 404 status
      return res.status(404).json({ message: "Topic not found" });
    }

    // Optionally, fetch an image URL for the topic if you wish
    const imageUrl = await fetchImageFromUnsplash(topic.name);

    // Return the topic (and the image URL if you fetched it)
    res.json({ ...topic._doc, imageUrl });
  } catch (err) {
    // If the error is due to an invalid ID format, return a 400 status
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid topic ID format" });
    }
    // For other errors, return a 500 status
    res.status(500).json({ message: err.message });
  }
});


// Route to create a new topic
router.post('/', async (req, res) => {
  const topic = new Topic({
    name: req.body.name,
    category: req.body.category
  });
  
  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
