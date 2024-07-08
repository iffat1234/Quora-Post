const express = require("express");
const app = express();
const methodOverride = require("method-override");
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Ishrat",
        content: " Effective time management allows students to prioritize their studies, complete assignments on time, and prepare adequately for exams. This leads to better grades and a deeper understanding of course material.",
    },
    {
        id: uuidv4(),
        username: "iffat nigar",
        content: "Properly managing time helps students avoid last-minute cramming and the anxiety that comes with it. By planning ahead and breaking tasks into manageable chunks, they can maintain a more relaxed and focused mindset.",
    },
    {
        id: uuidv4(),
        username: "shafak ejaz",
        content: "College life isn't just about academics—it's also about personal growth and social experiences. Good time management ensures students have time for extracurricular activities, hobbies, and socializing while still meeting their academic commitments.",
    }
]

//index route
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

//new post route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})

//show route
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

//edit route
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

//delete route
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
app.listen(port, () => {
    console.log(`listening to ${port}`);
}
);