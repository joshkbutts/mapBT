import express from 'express'
import { Marker, User } from '../../../models/index.js'
const markersRouter = new express.Router()

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

export default markersRouter