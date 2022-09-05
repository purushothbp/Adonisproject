import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('customer_id')
      table.string('customer_name')
      table.string('mail_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
