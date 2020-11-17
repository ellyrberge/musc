'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SongsSchema extends Schema {
  up () {
    this.create('songs', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('image').notNullable()
      table.string('artist').notNullable()
      table.string('musicSrc').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('songs')
  }
}

module.exports = SongsSchema
