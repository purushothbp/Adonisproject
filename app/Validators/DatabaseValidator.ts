import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DatabaseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number(),
    customer_name: schema.string(),
    mail_id: schema.string(),
    product_id: schema.number(),
    product_name: schema.string(),
    quantity: schema.string(),
  })
  public messages: CustomMessages = {}
}
