import React, { useState, useEffect } from 'react'
import translateServerErrors from '../services/translateServerErrors'

const UserRecentTravelEditForm = (props) => {
  const [marker, setMarker] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState([])

  const id = props.id

  const fetchMarker = async () => {
    try {
      const response = await fetch(`/api/v1/markers/${id}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setMarker(body.marker)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchMarker()
  }, [])

  const handleInputChange = event => {
    setMarker({
      ...marker,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const resetFields = () => {
    setMarker({
      title: '',
      description: ''
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    props.editMarker(marker, id)
    resetFields()
  }

  const clearForm = (event) => {
    event.preventDefault()
    resetFields()
  }

  return (
    <div>
      <h3>Edit Travel Info</h3>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='title'>
          <input
            className='input'
            name='title'
            placeholder='Where did you go?'
            value={marker.title}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor='description'>
          <input
            className='input'
            name='description'
            placeholder='Where did you go?'
            value={marker.description}
            onChange={handleInputChange}
          />
        </label>

        <input
          type='submit'
          value='Edit Destination!'
        />
      </form>
    </div>
  )
}

export default UserRecentTravelEditForm
