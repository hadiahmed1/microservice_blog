import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
    const submitPost = async () => {
        console.log(text)
        let data = JSON.stringify({
            "text": text
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_POST_URL}/posts`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response =await axios.request(config)
        console.log('response', response);
        setText("");
    }
    const [text, setText] = useState("");
    return (
        <div>
            <h2 className="form-control text-slate-300">ADD POST:</h2>
            <form>
                <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="enter post" />
                <button type="button" onClick={() => submitPost()} className="bg-slate-300">Submit</button>
            </form>
        </div>
    );
}

export default CreatePost;