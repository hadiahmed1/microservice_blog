import { useState, useEffect } from "react";
import CreateComment from "./CreateComment";

const Post = ({ post }) => {
    const fetchComments = async () => {
        setComments(post.comments)
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
                    {comments.map(comment => <li key={comment.id} >{comment.text}</li>)}
                </ol>
            </div>

        </div>
    )
}
export default Post;