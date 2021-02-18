import React from 'react'

const CommentTile = (props) => {
  return (
    <div>
      <hr></hr>
      <div className='grid-x'>
        <div className='cell small-6'>
          <h4 className='subheader'>
            {props.userName} said:
        </h4>
        </div>

        <div className='cell small-4'>
          <h5 className='subheader'>
            {props.commentText}
          </h5>
        </div>
      </div>
    </div>
  )
}

export default CommentTile