const mongoose = require('mongoose');
const User = require('../models/User'); // replace with the actual path to your User model
const Thread = require('../models/Threads'); // replace with the actual path to your Thread model
const Post = require('../models/Post'); // replace with the actual path to your Post model
const config = require('../config/config');

const seedUsers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password1'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        password: 'password2'
    }
];

const seedThreads = [
    {
        title: 'First thread',
        likes: ['User2', 'User3']
    },
    {
        title: 'Second thread',
        likes: ['User1']
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
    await mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true }); // replace with your database name

    console.log("MongoDB connected…");
    await User.deleteMany({});
    await Thread.deleteMany({});
    await Post.deleteMany({});

    console.log('Users, Threads and Posts cleared');

    for(let seed of seedUsers) {
        let user = new User(seed);
        await user.save();
        console.log('User created: ' + user.firstName);
    }

    for(let i = 0; i < seedThreads.length; i++) {
        let thread = new Thread({...seedThreads[i], userId: seedUsers[i].email});
        let savedThread = await thread.save();
        console.log('Thread created: ' + savedThread.title);

        let post = new Post({...seedPosts[i], userId: seedUsers[i].email, threadId: savedThread._id});
        let savedPost = await post.save();
        console.log('Post created: ' + savedPost.content);

        savedThread.replies.push(savedPost._id);
        await savedThread.save();
    }

    console.log('Database seeding completed');
    process.exit();
}

seedDatabase().catch(console.error);
