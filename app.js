//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Compose blogs and share your thoughts. A diary to observe yourself and check your development. ";
const aboutContent = "It's a blog post web app where you can post blog and share your thoght , you can keep record of yourself with this use friendly interface";
const contactContent = "Designed by: Chinmaya Chiranjib Sahoo";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin2:admin2@cluster0.0xrbk.mongodb.net/BlogDb",{useNewUrlParser:true ,useUnifiedTopology:true , useFindAndModify:false});


const postSchema = {
  title:String,
  content:String
};

const Post = mongoose.model("Post",postSchema);
// let posts = [];

app.get("/", function(req, res){

  Post.find({},function(err,posts){
    if(!err){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    }
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res){
  const requestedId = req.params.postId;

  Post.findOne({_id:requestedId},function(err,posts){
    if(!err){
      res.render("post", {
        title: posts.title,
        content: posts.content
      });
    }
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
