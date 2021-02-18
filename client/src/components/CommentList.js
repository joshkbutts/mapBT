import React, { useState, useEffect } from 'react'
import CommentTile from './CommentTile'

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
      {allComments.reverse()}
    </div>
  )
}

export default CommentList