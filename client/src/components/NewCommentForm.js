import React, { useState } from 'react'

const NewCommentForm = (props) => {
  const [newComment, setNewComment] = useState({
    commentText: ''
  })

  const handleInputChange = event => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewComment({
      commentText: ''
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.postComment(newComment)
    clearForm()
  }

  return (
    <div className='comment-form'> 
      <form onSubmit={handleSubmit}>

        <div className='grid-x text-center'>
          <div className='cell small-12'>
            <label htmlFor='commentText'>
              <input
                id='comment-box'
                className='input'
                name='commentText'
                placeholder='Add a comment...'
                value={newComment.commentText}
                onChange={handleInputChange}
                rows="3"
                cols="20"
              />
            </label>
          </div>


        </div>
      </form>
    </div>
  )
}

export default NewCommentForm