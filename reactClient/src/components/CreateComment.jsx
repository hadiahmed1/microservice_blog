import axios from "axios";
import { useState } from "react";

const CreateComment = ({id}) => {
    const submitPost = async () => {
        console.log(text)
        let data = JSON.stringify({
            "text": text
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:3001/posts/${id}/comments`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config)
        console.log('response', response);
        setText("");
    }
    const [text, setText] = useState("");
    return (
        <div>
            <h2 className="form-control text-slate-300">ADD POST:</h2>
            <form pre>
                <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="enter comment" />
                <button type="button" onClick={() => submitPost()} className="bg-slate-300">Submit</button>
            </form>
        </div>
    );
}

export default CreateComment;