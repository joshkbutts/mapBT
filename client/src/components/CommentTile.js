import React from 'react'

const CommentTile = (props) => {
  return (
    <div className='comment-tile'>
      <hr></hr>
      <div className='grid-x'>
        <div className='cell small-2 text-center'>
          <h5 className='subheader user-name-comment'>
            {props.userName}
          </h5>
        </div>

        <div className='cell small-6'>
          <h5 className='subheader'>
            {props.commentText}
          </h5>
        </div>
      </div>
    </div>
  )
}

export default CommentTile