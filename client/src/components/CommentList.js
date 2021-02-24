import React, { useState, useEffect } from 'react'
import CommentTile from './CommentTile'
import NewCommentForm from './NewCommentForm'
import MyMappClient from '../services/apiClient/MyMappClient'

const CommentList = (props) => {
  const [comments, setComments] = useState([])

  const id = props.id

  const getComments = async () => {
    const body = await MyMappClient.getComments(id)
    setComments(body.comments)
  }

  const postComment = async (newCommentData) => {
    const body = await MyMappClient.postComment(newCommentData, id)
    setComments([
      ...comments,
      body.comment
    ])
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