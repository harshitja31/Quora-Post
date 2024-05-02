const express = require("express");
const app = express();

const path = require("path");

const port = 5000;

const methodOverride = require('method-override')

const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let posts = [{
    id: uuidv4(),
    username: "Mahatma Gandhi",
    content: "You must be the change you wish to see in the world"
},
{
    id: uuidv4(),
    username: "Mother Teresa",
    content: "Spread love everywhere you go. Let no one ever come to you without leaving happier."
},
{
    id: uuidv4(),
    username: "Benjamin Franklin",
    content: "Well done is better than well said."
},{
    id:uuidv4(),
    username: "Henry David Thoreau",
    content: "Go confidently in the direction of your dreams! Live the life you've imagined."
},
];

app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});

app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let  id  = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})