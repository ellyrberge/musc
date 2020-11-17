'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaylistsSchema extends Schema {
  up () {
    this.create('playlists', (table) => {
      table.increments()
      table.string('playlistName').notNullable()
      table.integer('songID').unsigned().references('id').inTable('songs')
      table.timestamps()
    })
  }

  down () {
    this.drop('playlists')
  }
}

module.exports = PlaylistsSchema
