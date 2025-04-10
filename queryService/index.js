import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3003;
const commentsByPostID = {};
let id = 0;
const posts = {};

const handleEvent = (type, data) => {
    if (type === "postCreated") {
        const { id, text } = data;
        posts[id] = { id, text, comments: [] };
    }
    else if (type === "commentCreated") {
        const { postId } = data;
        if (posts[postId].comments) posts[postId].comments.push(data);
    } else if (type === "commentUpdated") {
        const { id, postId } = data;
        const index = posts[postId].comments.findIndex(e => e.id === id);
        if (index > -1) {
            posts[postId].comments.splice(index, 1, data);
        }
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
})

//event lsitner
app.post('/events', (req, res) => {
    try {
        const { type, data } = req.body;
        handleEvent(type, data);
    } catch (error) {
        console.log("error in queryService:>>", error);
    }
    res.send("ok");
})
app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`);
    try{//sync events
        const res =await axios.get('http://localhost:3005/events');
        const events=res.data;
        events.forEach(event => {
            handleEvent(event.type, event.data);
        })
    }catch(error){
        console.log(error);
    }
 
})