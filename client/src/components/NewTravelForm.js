import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const NewTravelForm = (props) => {
  const [newMarker, setNewMarker] = useState({
    title: '',
    description: '',
    image: {}
  })

  const [uploadedImage, setUploadedImage] = useState({
    preview: ''
  })

  const handleInputChange = event => {
    setNewMarker({
      ...newMarker,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleImageUpload = (acceptedImage) => {
    setNewMarker({
      ...newMarker,
      image: acceptedImage[0]
    })

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0])
    })
  }

  const clearForm = () => {
    setNewMarker({
      title: '',
      description: '',
      image: {}
    })
    setUploadedImage({
      preview: ''
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const body = new FormData()
    body.append('title', newMarker.title)
    body.append('description', newMarker.description)
    body.append('image', newMarker.image)
    body.append('lat', props.selectedArea.lat)
    body.append('lng', props.selectedArea.lng)
    props.postTravel(body)
    clearForm()
  }

  return (
    <div className='form form-tile text-center callout'>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor='title' className='right inline'>
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

        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className='subheader'>Upload a Picture! Drag 'n' drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>

        <img src={uploadedImage.preview} />
        
        <div className='row'>
          <div className='text-center'>
            <input
              className='add-travel-btn'
              type='submit'
              value='Add Destination!'
            />
            <input
              className='clear-travel-btn'
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

export default NewTravelForm