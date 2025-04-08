import { useState, useEffect } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";

const Post = ({ post }) => {
    const fetchComments = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3001/posts/${post.id}/comments`,
            headers: {}
        };

        const response = await axios.request(config);
        setComments(response.data || []);

    }
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetchComments();
    }, [])
    return (
        <div className="border-2 m-3 p-3">
            <h3 className="text-2xl">{post.id} : {post.text}</h3>
            <div className="flex flex-col justify-start align-baseline items-start">
                <CreateComment id={post.id} />
                Comments:
                <ol>
                    {comments.map(comment => <li>{comment.text}</li>)}
                </ol>
            </div>

        </div>
    )
}
export default Post;