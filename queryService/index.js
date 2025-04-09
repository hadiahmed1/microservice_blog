import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true})); 
app.use(cors());

const port = 3003;
const commentsByPostID={};
let id=0;
const posts={};

app.get('/posts', (req, res) => {
    res.send(posts);
})

//event lsitner
app.post('/events',(req, res) => {
    const {type, data} = req.body;
    if(type==="postCreated"){
        const {id, text}=data;
        posts[id]={id, text,comments:[]};
    }
    else if(type==="commentCreated"){
        const {postId}=data;
        posts[postId].comments.push(data);
    }
    res.send("ok");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))