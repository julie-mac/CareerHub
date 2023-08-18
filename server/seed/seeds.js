const mongoose = require('mongoose');
const User = require('../models/User'); // replace with the actual path to your User model
const Thread = require('../models/Threads'); // replace with the actual path to your Thread model
const Post = require('../models/Post'); // replace with the actual path to your Post model
const config = require('../config/config');
const Topic = require('../models/Topic'); // replace with the actual path to your Topic model

const seedTopics = [
    { name: 'Software Development', category: 'Career' },
    { name: 'Data Science', category: 'Career' },
    { name: 'Marketing', category: 'Career' },
    { name: 'Graphic Design', category: 'Career' },
    { name: 'Human Resources', category: 'Career' },
    { name: 'Finance & Accounting', category: 'Career' },
    { name: 'Sales & Business Development', category: 'Career' },
    { name: 'Healthcare & Medicine', category: 'Career' },
    { name: 'Engineering & Architecture', category: 'Career' },
    { name: 'Education & Training', category: 'Career' },
    { name: 'Real Estate', category: 'Career' },
    { name: 'Legal & Law', category: 'Career' },
    { name: 'Travel & Tourism', category: 'Career' },
    { name: 'Arts & Entertainment', category: 'Career' },
    { name: 'Food & Culinary', category: 'Career' },
    { name: 'Science & Research', category: 'Career' },
    { name: 'Journalism & Writing', category: 'Career' },
    { name: 'Entrepreneurship & Startups', category: 'Career' }
    
];

const seedUsers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'dude@example.com',
        phoneNumber: '+11234567890',
        password: 'password1'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '+10987654321',
        password: 'password2'
    }
];

const seedThreads = [
    {
        title: 'Investing in Real Estate',
        content: 'Real estate has always been a lucrative market. Anyone here with experience in this field?',
        topic: 'Real Estate',
        likes: ['dude@example.com', 'jane.doe@example.com'] // I'm using emails for simplicity. 
    },
    {
        title: 'Choosing the Right Programming Language',
        content: 'There are so many programming languages out there. Which one is the best for web development?',
        topic: 'Software Development',
        likes: ['dude@example.com']
    },
  
];

const seedPosts = [
    {
        content: 'First reply'
    },
    {
        content: 'Second reply'
    },
];

const seedDatabase = async () => {
    await mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("MongoDB connected…");
    await User.deleteMany({});
    await Thread.deleteMany({});
    await Post.deleteMany({});
    await Topic.deleteMany({});

    console.log('Users, Threads, Posts and Topics cleared');

    const topics = {};
    for(let topic of seedTopics) {
        let newTopic = new Topic(topic);
        await newTopic.save();
        topics[newTopic.name] = newTopic._id;
        console.log('Topic created: ' + newTopic.name);
    }

    const users = {};
    for(let seed of seedUsers) {
        let user = new User(seed);
        await user.save();
        users[user.email] = user._id;
        console.log('User created: ' + user.firstName + ' ' + user.lastName);
    }

    for(let i = 0; i < seedThreads.length; i++) {
        let thread = new Thread({
            title: seedThreads[i].title,
            content: seedThreads[i].content,
            userId: users[seedUsers[i].email],
            topic: topics[seedThreads[i].topic],
            likes: seedThreads[i].likes.map(email => users[email])
        });

        let savedThread = await thread.save();
        console.log('Thread created: ' + savedThread.title);

        let post = new Post({
            ...seedPosts[i],
            userId: users[seedUsers[i].email],
            threadId: savedThread._id
        });

        let savedPost = await post.save();
        console.log('Post created: ' + savedPost.content);

        savedThread.replies.push(savedPost._id);
        await savedThread.save();
    }

    console.log('Database seeding completed');
    process.exit();
}

seedDatabase().catch(console.error);
