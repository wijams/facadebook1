const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/facade-book', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.post('/api/items', async (req, res) => {
    const item = new Item({
        title: req.body.title,
        text: req.body.text,
        path: req.body.path,
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const multer = require('multer')
const upload = multer({
    dest: '/var/www/project4.wesleyijams.com/images/',
    limits: {
        fileSize: 10000000
    }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
    title: String,
    text: String,
    path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/items/:id', async (req, res) => {
    try {
        let item = await Item.findOne({
            _id: req.params.id
        });
        item.title = req.body.title;
        item.text = req.body.text;
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const profileSchema = new mongoose.Schema({
    name: String,
    city: String,
    age: String,
    photo: String,
});

const Profile = mongoose.model('Profile', profileSchema);

app.get('/api/profile', async (req, res) => {
    try {
        let profile = await Profile.find();
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/profile', async (req, res) => {
    const profile = new Profile({
        name: req.body.name,
        city: req.body.city,
        age: req.body.age,
        photo: req.body.photo
    });
    try {
        await profile.save();
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/picture', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        photo: "/images/" + req.file.filename
    });
});

app.delete('/api/profile/:id', async (req, res) => {
    try {
        await Profile.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(0, () => console.log('Server listening on port 0!'));