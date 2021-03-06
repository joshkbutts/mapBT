const Model = require('./Model')

class Marker extends Model {
  static get tableName() {
    return 'markers'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['lat', 'lng', 'description'],
      properties: {
        lat: { type: ['string', 'integer'] },
        lng: { type: ['string', 'integer'] },
        title: { type: 'string' },
        description: { type: 'string' },
        image: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const { User, Comment } = require('./index')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'markers.userId',
          to: 'users.id'
        }
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'markers.id',
          to: 'comments.markerId'
        }
      }
    }
  }
}

module.exports = Marker