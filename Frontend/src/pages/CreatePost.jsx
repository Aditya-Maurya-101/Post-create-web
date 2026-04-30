import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    try {
      await axios.post("https://post-web-21mt.onrender.com/create-post", formData)

      navigate('/feed')
    } catch (error) {
      console.log(error)
      alert("Post not created. Please try again.")
    }
  }

  return (
    <section className='create-post-section'>
      <div className="create-post-card">
        <h1>Create Post</h1>
        <h5>Upload your image and write a caption.</h5>

        <form onSubmit={handleSubmit}>
          <label className="file-box">
            <span>Choose Image</span>
            <input type="file" name="image" accept="image/*" required />
          </label>

          <input
            type="text"
            name="caption"
            placeholder='Enter caption'
            required
          />

          <button type="submit">Create Post</button>

          <button type="button" onClick={() => navigate('/feed')}>
            Go to Feed
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost