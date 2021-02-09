import express from 'express'
import { User, Marker } from '../../../models/index.js'

const mapRouter = new express.Router()

mapRouter.get("/", async (req, res) => {
  try {
    const maps = await User.query()
    return res.status(200).json({ maps })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

mapRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const map = await User.query().findById(id)
    map.markers = await map.$relatedQuery("markers")
    return res.status(200).json({ map })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default mapRouter