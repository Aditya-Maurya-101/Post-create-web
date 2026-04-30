import React, { useState, useEffect } from 'react'
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      caption: "Beautiful sunset at the beach!"
    }
  ])

  /* Soft Shadow */
  const neo = {
    background: "#dde5eb",
    boxShadow: "5px 5px 10px #ccd3da, -5px -5px 10px #f7fbff"
  }

  const insetNeo = {
    background: "#dde5eb",
    boxShadow: "inset 3px 3px 8px #ccd3da, inset -3px -3px 8px #f7fbff"
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`)
      setPosts(posts.filter((post) => post._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios.get(`${API_URL}/posts`).then((res) => {
      setPosts(res.data.posts)
    })
  }, [])

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#dde5eb",
        padding: "35px 20px"
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto 30px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            ...neo,
            padding: "18px 28px",
            borderRadius: "24px"
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              color: "#4b5563"
            }}
          >
            Feed Posts
          </h1>
        </div>

        <div
          style={{
            ...neo,
            padding: "16px 25px",
            borderRadius: "24px",
            color: "#6b7280",
            fontWeight: "600"
          }}
        >
          Total Posts: {posts.length}
        </div>
      </div>

      {/* Grid */}
      <div
        className="feed-grid"
        style={{
          maxWidth: "1300px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "28px"
        }}
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="feed-card"
            style={{
              ...neo,
              borderRadius: "28px",
              padding: "18px"
            }}
          >
            {/* Image Box Auto Height */}
            <div
              style={{
                ...insetNeo,
                borderRadius: "22px",
                padding: "10px",
                marginBottom: "18px"
              }}
            >
              <img
                src={post.image}
                alt={post.caption}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px",
                  objectFit: "contain",
                  borderRadius: "18px",
                  display: "block"
                }}
              />
            </div>

            {/* Caption */}
            <div
              style={{
                ...neo,
                borderRadius: "18px",
                padding: "16px",
                marginBottom: "18px"
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#4b5563",
                  fontSize: "1rem",
                  lineHeight: "1.5"
                }}
              >
                {post.caption}
              </p>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center"
              }}
            >
              <button
                onClick={() => handleDelete(post._id)}
                style={{
                  flex: 1,
                  border: "none",
                  padding: "14px",
                  borderRadius: "50px",
                  background:
                    "linear-gradient(135deg,#ff4b4b,#ff1f5a)",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "4px 4px 10px rgba(255,75,75,.18)"
                }}
              >
                Delete
              </button>

              <div
                style={{
                  ...neo,
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#3b82f6",
                  fontSize: "1.2rem",
                  fontWeight: "700"
                }}
              >
                ♥
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>
        {`
          @media (max-width:768px){
            .feed-grid{
              gap:22px !important;
            }

            .feed-card{
              margin-bottom:12px;
            }
          }
        `}
      </style>
    </section>
  )
}

export default Feed