import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3002;
const posts = [];
let id = 0;

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
})
app.post('/posts', async (req, res) => {
    posts.push({
        id: ++id,
        text: req.body.text,
    });

    await axios.post("http://localhost:3005/events", {
        type: "postCreated",
        data: { id, text: req.body.text }
    });

    res.status(200).send({
        success: true,
        menubar: "post added"
    });
})


//event listner
app.post('/events',(req, res) => {
    console.log(req.body);
    res.send("ok");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))