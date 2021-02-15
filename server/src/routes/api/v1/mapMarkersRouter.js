import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import uploadImage from '../../../services/uploadImage.js'
import { Marker } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

const mapMarkersRouter = new express.Router({ mergeParams: true })

mapMarkersRouter.post('/', uploadImage.single('image'), async (req, res) => {
  try {
    const { body } = req
    const formInput = await cleanUserInput(body)
    const formData = {
      ...formInput,
      image: req.file.location,
      userId: req.user.id
    }
    const marker = await Marker.query().insertAndFetch(formData)
    marker.user = await marker.$relatedQuery('user')
    return res.status(201).json({ marker })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default mapMarkersRouter