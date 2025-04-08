import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true})); 
app.use(cors());

const port = 3005;
app.post('/events', (req, res) => {
    const event = req.body;
    axios.post("http://localhost:3003/events", event);//query
    axios.post("http://localhost:3002/events", event);//posts
    axios.post("http://localhost:3001/events", event);//comments

    res.send("Ok");
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))