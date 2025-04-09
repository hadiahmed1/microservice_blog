import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true})); 
app.use(cors());

const port = 3001;
const commentsByPostID={};
let id=0;

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostID[req.params.id]);
})
app.post('/posts/:id/comments',async (req,res) => {
    const comments= commentsByPostID[req.params.id] || [];
    const comment= {
        id: ++id,
        postId: req.params.id,
        text: req.body.text,    
    }
    comments.push(comment);
    commentsByPostID[req.params.id] = comments;
    res.status(200).send({
        success: true,
        message: "comment added"
    });

    await axios.post("http://localhost:3005/events", {
        type: "commentCreated",
        data: comment
    });
})

//event lsitner
app.post('/events',(req, res) => {
    // console.log(req.body);
    res.send("ok");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))