import React, { useState, useEffect } from 'react'
import MyMappClient from '../services/apiClient/MyMappClient'

const UserRecentTravelEditForm = (props) => {
  const [marker, setMarker] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState([])

  const id = props.id

  const fetchMarker = async () => {
      const body = await MyMappClient.fetchMarker(id)
      setMarker(body.marker)
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
    <div className='form form-tile text-center callout'>
      <h3 className='subheader'>Edit Travel Info</h3>
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

        <div className='row'>
          <div className='text-center'>
            <input
              className='confirm-edit-button'
              type='submit'
              value='Edit Destination'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserRecentTravelEditForm

