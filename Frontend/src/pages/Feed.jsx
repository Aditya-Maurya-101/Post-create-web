import React,{useState,useEffect} from 'react'
import axios from "axios"

const Feed = () => {
    const [posts,setPosts]=useState([
        {
            id:"1",
            image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            caption:"Beautiful sunset at the beach!"
        }
    ])
    const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/post/${id}`);

    setPosts(posts.filter((post) => post._id !== id));
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  axios.get("http://localhost:3000/posts")
    .then((res) => {
      console.log(res.data)
        setPosts(res.data.posts)
    })
}, [])
    return (
    <section className='feed-section' >
     {posts.map((post)=>(
  <div key={post._id} className='post-card'>
    <img src={post.image} alt={post.caption} />
    <p>{post.caption}</p>
    <button className='delete-btn' onClick={() => handleDelete(post._id)}>
  Delete
  
</button>
  </div>

  
))}
    </section>
    
  )
}

export default Feed