import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('customerId')
      table.integer('productId')
      table.string('productName')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
