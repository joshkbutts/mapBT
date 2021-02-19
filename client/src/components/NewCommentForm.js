import React, {useState} from 'react'

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

  return(
    <div>
      <h4 className='subheader'>
        add a comment
      </h4>

      <form onSubmit={handleSubmit}>

        <label htmlFor='commentText'>
          <input
          className='input'
          name='commentText'
          placeholder='Enter your comment here'
          value={newComment.commentText}
          onChange={handleInputChange}
          />
        </label>

        <div className='row'>
          <div className='text-center'>
            <input
              className='button success'
              type='submit'
              value='Add Comment!'
            />
            <input
              className='button alert'
              type='button'
              value="Clear"
              onClick={clearForm}
            />
          </div>
        </div>

      </form>

      
    </div>
  )
} 

export default NewCommentForm