import express from 'express'
import { Comment, Marker, User } from '../../../models/index.js'
import objection from 'objection'

const commentsRouter = new express.Router()

commentsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const marker = await Marker.query().findById(id)
    const comments = await marker.$relatedQuery('comments')
    for (const comment of comments) {
      comment.user = await comment.$relatedQuery('user')
    }
    return res.status(200).json({ comments })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default commentsRouter