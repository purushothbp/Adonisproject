import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'
export default class Product {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // eslint-disable-next-line eqeqeq
    if (appKey != request.header('appkey')) {
      response.send('Un Authorised person')
      return
    }
    await next()
  }
}
module.exports = Product
