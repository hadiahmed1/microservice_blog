import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true})); 
app.use(cors());

const port = 4001;
const commentsByPostID={};
let id=0;

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostID[req.params.id]);
})
app.post('/posts/:id/comments',(req,res) => {
    const comments= commentsByPostID[req.params.id] || [];
    const comment= {
        id: ++id,
        postId: req.params.id,
        text: req.body.text,
        status: "pending"    
    }
    comments.push(comment);
    commentsByPostID[req.params.id] = comments;

    axios.post("http://eventbus-srv:4005/events", {
        type: "commentCreated",
        data: comment
    }).catch(error=>console.log("couldn't post event to event bus"));
    res.status(200).send({
        success: true,
        message: "comment added"
    });
})

//event lsitner
app.post('/events',(req, res) => {
    const {type, data}= req.body;
    if(type==="commentModerated"){
        const comments=commentsByPostID[data.postId];
        const comment = comments.find(comment=>comment.id = data.id);
        comment.status=data.status;
        axios.post("http://eventbus-srv:4005/events", {
            type: "commentUpdated",
            data
        }).catch(error=>console.log("couldn't post event:commentUpdated to event bus"));;
    }
    res.send("ok");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))