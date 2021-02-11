import React, { useState } from 'react'

const NewTravelForm = ({ postTravel }) => {
  const [newMarker, setNewMarker] = useState({
    title: '',
    description: ''
  })

  const handleInputChange = event => {
    setNewMarker({
      ...newMarker,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    postTravel(newMarker)
    setNewMarker({
      title: '',
      description: ''
    })
  }

  return (
    <div className='form user-tile text-center'>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor='title'>
            <input
              className='input'
              name='title'
              placeholder='Where did you go?'
              id='right-label'
              value={newMarker.title}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor='description'>
            <input
              className='input'
              name='description'
              placeholder='How was it?'
              value={newMarker.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        
        <div>
          <input
            type='submit'
            value='Add Destination!'
          />
        </div>
      </form>
    </div>
  )
}

export default NewTravelForm