import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hotel extends BaseModel {
  @column({})
  public id: number
  @column({})
  public name: string
  @column({})
  public no: number
  @column()
  public street: string
  @column()
  public landmark: string
  @column()
  public area: string
  @column()
  public pincode: number
}
