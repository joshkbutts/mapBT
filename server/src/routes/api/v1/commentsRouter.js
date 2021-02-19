import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Comment, Marker, User } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

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

commentsRouter.post('/:id', async (req, res) => {
  try {
    const { body } = req
    const formInput = await cleanUserInput(body)
    const formData = {
      ...formInput,
      userId: req.user.id,
      markerId: req.params.id
    }
    const comment = await Comment.query().insertAndFetch(formData)
    comment.user = await comment.$relatedQuery('user')
    return res.status(201).json({ comment })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default commentsRouter