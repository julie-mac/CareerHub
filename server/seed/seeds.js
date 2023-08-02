const mongoose = require('mongoose');
const User = require('../models/User'); // replace with the actual path to your User model

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

const seedDatabase = async () => {
    await mongoose.connect('mongodb://127.0.0.1/forum_db', { useNewUrlParser: true, useUnifiedTopology: true }); // replace with your database name

    console.log("MongoDB connected…");
    await User.deleteMany({});

    console.log('Users cleared');

    for(let seed of seedUsers) {
        let user = new User(seed);
        await user.save();
        console.log('User created: ' + user.firstName);
    }

    console.log('Database seeding completed');
    process.exit();
}

seedDatabase().catch(console.error);