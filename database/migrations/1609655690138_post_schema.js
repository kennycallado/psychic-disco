'use strict'

/** @typedef {import('knex/types/knex').TableBuilder} knex */

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts',
    /**
     * 
     * @param {knex} table 
     */
    (table) => {
      table.increments()
      table.string('title')
      table.string('Description')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('user.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
