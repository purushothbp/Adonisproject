import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tablename = 'forms'

  public async up() {
    this.schema.createTable(this.tablename, (table) => {
      table.string('name')
      table.string('email')
      table.integer('mobile')
      table.string('gender')
      table.string('city')
      table.string('interests')
    })
  }

  public async down() {
    this.schema.dropTable(this.tablename)
  }
}
