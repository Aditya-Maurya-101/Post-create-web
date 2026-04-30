import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const [fileName, setFileName] = useState('📷 Choose Image')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    try {
      await axios.post("http://localhost:3000/create-post", formData)
      navigate('/feed')
    } catch (error) {
      console.log(error)
      alert("Post not created. Please try again.")
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(`📷 ${file.name}`)
    } else {
      setFileName('📷 Choose Image')
    }
  }

  const neo = {
    background: "#e9eef3",
    boxShadow: "12px 12px 24px #cfd6dd, -12px -12px 24px #ffffff"
  }

  const insetNeo = {
    background: "#e9eef3",
    boxShadow: "inset 6px 6px 12px #cfd6dd, inset -6px -6px 12px #ffffff"
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#dde5eb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          ...neo,
          width: "100%",
          maxWidth: "520px",
          borderRadius: "35px",
          padding: "35px",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: "2.3rem",
            fontWeight: "600",
            color: "#4b5563",
            marginBottom: "8px"
          }}
        >
          Create Post
        </h1>

        <p
          style={{
            color: "#7b8794",
            marginBottom: "28px",
            fontSize: "1rem"
          }}
        >
          Upload image & write a caption
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px"
          }}
        >
          {/* Upload Box */}
          <label
            style={{
              ...insetNeo,
              borderRadius: "22px",
              padding: "22px",
              textAlign: "center",
              cursor: "pointer",
              color: "#4b5563",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            {fileName}
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          {/* Caption */}
          <input
            type="text"
            name="caption"
            placeholder="Enter caption..."
            required
            style={{
              ...insetNeo,
              border: "none",
              outline: "none",
              padding: "18px 20px",
              borderRadius: "18px",
              fontSize: "1rem",
              color: "#374151"
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            style={{
              border: "none",
              padding: "18px",
              borderRadius: "50px",
              background: "linear-gradient(135deg,#2d8cff,#3c2fff)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "8px 8px 18px rgba(59,130,246,.35)"
            }}
          >
            Create Post
          </button>

          {/* Feed Button */}
          <button
            type="button"
            onClick={() => navigate('/feed')}
            style={{
              ...neo,
              border: "none",
              padding: "16px",
              borderRadius: "18px",
              color: "#4b5563",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Go to Feed
          </button>
        </form>

        {/* Bottom Stats UI */}
        <div
          style={{
            marginTop: "28px",
            ...neo,
            borderRadius: "22px",
            padding: "20px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "14px",
              color: "#6b7280",
              fontWeight: "500"
            }}
          >
            <span>Upload Progress</span>
            <span>71%</span>
          </div>

          <div
            style={{
              ...insetNeo,
              height: "12px",
              borderRadius: "20px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: "71%",
                height: "100%",
                borderRadius: "20px",
                background:
                  "linear-gradient(90deg,#2d8cff,#3c2fff)"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatePost