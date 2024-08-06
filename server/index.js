const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const app = express();
const port = 5000;

const MONGO_URL = 'mongodb://localhost:27017/ytLogin';

app.use(cors());
app.use(express.json());
mongoose.connect(MONGO_URL);
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('mongodb connecting error', err);
});

db.once('open', () => {
    console.log('mongodb connected successfully');
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const hashPassword = await bcryptjs.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('error during register', error);
        res.status(500).json({ error: 'internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
