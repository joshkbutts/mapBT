import React, { useState, useEffect } from 'react'
import CommentTile from './CommentTile'
import NewCommentForm from './NewCommentForm'

const CommentList = (props) => {
  const [comments, setComments] = useState([])

  const id = props.id

  const getComments = async () => {
    try {
      const response = await fetch(`/api/v1/comments/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const body = await response.json()
      setComments(body.comments)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const postComment = async (newCommentData) => {
    try {
      const response = await fetch(`/api/v1/comments/${id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newCommentData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        const body = await response.json()
        setComments([
          ...comments,
          body.comment
        ])
      }
    }
    catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const allComments = comments.map(comment => {
    return (
      <CommentTile
        key={comment.id}
        userName={comment.user.userName}
        commentText={comment.commentText}
      />
    )
  })

  useEffect(() => {
    getComments()
  }, [])

  return (
    <div>
      <NewCommentForm
        postComment={postComment}
      />
      <div>
        {allComments.reverse()}
      </div>
    </div>

  )
}

export default CommentList