import express from 'express'
import { Marker, User } from '../../../models/index.js'
import objection from 'objection'
const { ValidationError } = objection
import cleanUserInput from '../../../services/cleanUserInput.js'

const markersRouter = new express.Router()

markersRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const marker = await Marker.query().findById(id)
    return res.status(200).json({ marker })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

markersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const marker = await Marker.query().findById(id)
    const user = await marker.$relatedQuery('user')
    await Marker.query().deleteById(id)
    const markers = await user.$relatedQuery("markers")
    return res.status(200).json({ markers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

markersRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const formInput = cleanUserInput(body)
    const { title, description, lat, lng } = formInput
    await Marker.query()
      .findById(id)
      .update({ title, description, lat, lng })
    const user = await User.query().findById(formInput.userId)
    const markers = await user.$relatedQuery('markers')
    return res.status(201).json({ markers })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default markersRouter