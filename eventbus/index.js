import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 4005;

const events = [];
try {
    app.post('/events',async (req, res) => {
        const event = req.body;
        console.log(event)
        events.push(event);
        axios.post("http://posts-clusterip-srv:4000/events", event).catch(error=>console.log(error+" in posts"));//posts
        axios.post("http://comments-srv:4001/events", event).catch(error=>console.log(error+" in comments"));//comments
        axios.post("http://moderation-np-srv:4002/events", event).catch(error=>console.log(error+" in moderation"));//moderation
        const qr=axios.post("http://queryservice-cip-srv:4003/events", event).catch(error=>console.log(error+" in query"));//query
        console.log("qr=",qr.data);
        res.send("Ok");
    });
    app.get('/events', (req, res) => {
        console.log("events requested");
        res.send(events);
    })
} catch (error) {
    console.log(error);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))