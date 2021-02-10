import express, { response } from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Marker } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

const mapMarkersRouter = new express.Router({ mergeParams: true })

mapMarkersRouter.post('/', async (req, res) => {
  const {body} = req
  const formInput = cleanUserInput(body)
  const { title, description, lat, lng } = formInput
  const { userId } = req.params
  
  try {
    const marker = await Marker.query().insertAndFetch({ title, description, lat, lng, userId })
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