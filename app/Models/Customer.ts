import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public customer_id: number
  @column({})
  public customer_name: string
  @column({})
  public mail_id: string
}
