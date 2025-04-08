import axios from "axios";
import {useEffect, useState} from "react";
import Post from "./Post.jsx";

const PostList=()=>{
    const [posts,setPosts] = useState([]);
    
    const fetchPosts = async () => {
        const response = await axios.get("http://localhost:3002/posts");
        setPosts(response.data);
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="text-slate-300">
            POST list
            {posts.map(post => <Post key={post.id} post={post}/> )}
        </div>
    );
}
export default PostList;
