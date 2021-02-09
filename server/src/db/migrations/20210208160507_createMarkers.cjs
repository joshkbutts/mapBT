/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('markers', (table) => {
    table.bigIncrements('id').primary()
    table.bigInteger('userId').unsigned().notNullable().index().references('users.id')
    table.string('lat').notNullable()
    table.string('lng').notNullable()
    table.string('title').notNullable()
    table.text('description')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('markers')
}
