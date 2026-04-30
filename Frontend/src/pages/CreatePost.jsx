import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$|\s+$/g, '')

const CreatePost = () => {
  const navigate = useNavigate()
  const [fileName, setFileName] = useState('📷 Choose Image')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadProgress(0)

    const formData = new FormData(e.target)

    try {
      await axios.post(`${API_URL}/create-post`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percent)
        }
      })

      e.target.reset()
      setFileName('📷 Choose Image')
      setUploadProgress(100)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setUploadProgress(0)
      }, 2000)
    } catch (error) {
      console.log(error)
      alert('Post not created. Please try again.')
    } finally {
      setIsSubmitting(false)
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
            gap: "22px",
            position: "relative"
          }}
        >
          {/* Upload Box */}
          <label
            style={{
              ...insetNeo,
              borderRadius: "22px",
              padding: "22px",
              textAlign: "center",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              color: isSubmitting ? "#9ca3af" : "#4b5563",
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
              disabled={isSubmitting}
              style={{ display: "none" }}
            />
          </label>

          {/* Caption */}
          <input
            type="text"
            name="caption"
            placeholder="Enter caption..."
            required
            disabled={isSubmitting}
            style={{
              ...insetNeo,
              border: "none",
              outline: "none",
              padding: "18px 20px",
              borderRadius: "18px",
              fontSize: "1rem",
              color: "#374151",
              background: isSubmitting ? "#e5e7eb" : "#dde5eb"
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              border: "none",
              padding: "18px",
              borderRadius: "50px",
              background: isSubmitting
                ? "linear-gradient(135deg,#7da8ff,#8b82ff)"
                : "linear-gradient(135deg,#2d8cff,#3c2fff)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.85 : 1,
              boxShadow: "8px 8px 18px rgba(59,130,246,.35)"
            }}
          >
            {isSubmitting ? `Uploading ${uploadProgress}%` : 'Create Post'}
          </button>

          {/* Feed Button */}
          <button
            type="button"
            onClick={() => navigate('/feed')}
            disabled={isSubmitting}
            style={{
              ...neo,
              border: "none",
              padding: "16px",
              borderRadius: "18px",
              color: "#4b5563",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            Go to Feed
          </button>

          {showSuccess && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.85)',
                borderRadius: '28px',
                zIndex: 10
              }}
            >
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: '#ecfdf5',
                  border: '3px solid #34d399',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 20px 50px rgba(16,185,129,0.18)'
                }}
              >
                <span
                  style={{
                    fontSize: '4rem',
                    color: '#10b981',
                    lineHeight: 1
                  }}
                >
                  ✓
                </span>
              </div>
            </div>
          )}
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
            <span>{uploadProgress > 0 ? `${uploadProgress}%` : 'Ready'}</span>
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
                width: `${uploadProgress}%`,
                minWidth: uploadProgress > 0 ? `${uploadProgress}%` : '4%',
                transition: 'width 0.3s ease',
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