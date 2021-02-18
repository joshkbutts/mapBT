const Model = require('./Model')

class Comment extends Model {
  static get tableName() {
    return 'comments'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['commentText'],
      properties: {
        commentText: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const { User, Marker } = require('./index')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.userId',
          to: 'users.id'
        }
      },
      marker: {
        relation: Model.BelongsToOneRelation,
        modelClass: Marker,
        join: {
          from: 'comments.markerId',
          to: 'markers.id'
        }
      }
    }
  }
}

module.exports = Comment