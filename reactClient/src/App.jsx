import CreatePost from './components/CreatePost.jsx';
import PostList from './components/PostList.jsx';
import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-900 h-full p-56">
        <h1 className="text-red-300">Blog</h1>
        <CreatePost />
        <PostList />
      </div>

    </>
  )
}

export default App
