import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true})); 
app.use(cors());

const port = 4002;
const moderatePost= async (comment)=>{
    const {text} = comment;
    const status=(text.includes('orange'))?'rejected':'approved';
    comment.status= status;
    setTimeout(async () => {
        await axios.post("http://eventbus-srv:4005/events", {
            type: "commentModerated",
            data: comment
        });
    }, 5000);
}
//event lsitner
app.post('/events',(req, res) => {
    const {type, data} = req.body;
    if(type==="commentCreated"){
        try{
            moderatePost(data);
        }catch(error){
            console.log(error);
        }
    }
    res.send("ok");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))