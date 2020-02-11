
const express = require('express');
const fs = require('file-system');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

const Book = require('./models/books');
const Post = require('./models/posts');
const nodemailer = require('nodemailer');


var PORT = process.env.PORT || 3000;
var url = process.env.MONGODB_URI || 'mongodb://localhost/andrew_blog';

mongoose.connect(url);

app.get('/', (req, res)=>{
    Post.find({}, (err, posts)=>{
        if(err){
            console.log(err);
        } else {
            res.render('index', {posts: posts});
        }
    })
})

app.post('/', (req,res)=>{
    Post.find({}, (err, posts)=>{
        if(err){
            console.log(err);
        } else {
            res.render('index', {posts: posts});
        }
    })
})


app.get('/books', (req,res)=>{
    Book.find({}, (err,books)=>{
        if(err){
            console.log(err);
            res.redirect('/')
        } else {
            res.render('books', {books: books});
        }
    })
})
app.get('/books/:type', (req,res)=>{
    Book.find({category: req.params.type.toLowerCase()}, (err, books)=>{
        if(err){
            console.log(err);
        } else {
            res.render('books', {books: books});
        }
    })
})

app.get('/contact', (req,res)=>{
    res.render('contact');
})
app.post('/ajax/email', function(req, res){
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: null,
            pass: null
        }
    });
    var textBody = `Message from: ${req.body.email} -- ${req.body.message}`;
    var mail = {
        from: 'rahook92@gmail.com',
        to: 'rahook92@gmail.com',
        subject: 'practice contact',
        text: textBody
    };
    transporter.sendMail(mail, (err, info) => {
        if(err){
            console.log(err);
        } else {
            res.json({message: 'just splendid love.'});
        }
    })
})
app.get('/addBooks', (req,res)=>{
    res.render('addBooks');
})

app.get('/addPosts', (req,res)=>{
    res.render('addPosts');
})

app.post('/addPosts', (req,res)=>{
    const post = new Post({
        title: req.body.title,
        date: new Date().toString(),
        contents: [{
            headers: req.body.headers,
            paragraphs: req.body.content,
            images: [{
                url: req.body.image,
                class: req.body.image_class
            }]
        }],
        tags: req.body.tag
    })
    .save((err,data)=>{
        if(err){
            console.log(err);
        } else {
            console.log('success');
        }
    })
    res.redirect('/');
})

app.get('/description/:title', (req,res)=>{
    Book.findOne({title: req.params.title.toLowerCase()}, (err,book)=>{
            if(err){
                console.log(err);   
            } else {
                res.send(book);
            }
        })
})

app.post('/addBooks', (req,res)=>{
    const book = new Book({
        title: req.body.title.toLowerCase(),
        author: req.body.author.toLowerCase(),
        publisher: req.body.publisher.toLowerCase(),
        publishDate: req.body.publish_date.toLowerCase(),
        category: req.body.category.toLowerCase(),
        description: req.body.description.toLowerCase(),
        image: req.body.image
    })
    .save((err, book)=>{
        if(err){
            console.log(err);
        } else {
            console.log(book + ' was successfully saved');
        }
    })

    res.redirect('/')
})

app.listen(PORT, ()=>{
    console.log('app has begun');
});