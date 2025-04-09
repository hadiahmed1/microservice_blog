import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true})); 
app.use(cors());

const port = 3004;

//event lsitner
app.post('/events',(req, res) => {
    // console.log(req.body);
    res.send("ok");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))