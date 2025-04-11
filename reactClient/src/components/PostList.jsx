import axios from "axios";
import {useEffect, useState} from "react";
import Post from "./Post.jsx";

const PostList=()=>{
    const [posts,setPosts] = useState([]);
    
    const fetchPosts = async () => {
        const response = await axios.get(`${import.meta.env.VITE_QS_URL}/posts`);
        setPosts(response.data);
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="text-slate-300">
            POST list
            {Object.keys(posts).map(id => <Post key={id} post={posts[id]}/> )}
        </div>
    );
}
export default PostList;
