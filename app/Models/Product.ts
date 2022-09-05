import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public customerId: number
  @column({})
  public productName: string
  @column({})
  public productId: number
  @column({})
  public quantity: string
}
