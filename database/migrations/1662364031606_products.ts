import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('customer_id')
      table.integer('product_id')
      table.string('product_name')
      table.string('quantity')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
