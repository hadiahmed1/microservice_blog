import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3005;

const events = [];
try {
    app.post('/events',async (req, res) => {
        const event = req.body;
        events.push(event);
        axios.post("http://localhost:3003/events", event).catch(error=>console.log(error+" in query"));//query
        axios.post("http://localhost:3002/events", event).catch(error=>console.log(error+" in posts"));//posts
        axios.post("http://localhost:3001/events", event).catch(error=>console.log(error+" in comments"));//comments
        axios.post("http://localhost:3004/events", event).catch(error=>console.log(error+" in moderation"));//moderation
        res.send("Ok");
    });
    app.get('/events', (req, res) => {
        res.send(events);
    })
} catch (error) {
    console.log(error);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))