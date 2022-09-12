import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form'
import FormvalidationValidator from '../../Validators/FormvalidationValidator'
export default class FormdataController {
  public async insert({ request }: HttpContextContract) {
    const payload = await request.validate(FormvalidationValidator)
    let table = new Form()
    table.name = payload['name']
    table.email = payload['email']
    table.gender = payload['gender']
    table.mobile = payload['mobile']
    table.city = payload['city']
    table.interests = payload['interests']
    await table.save()
    return Form.all()
  }
  public async select() {
    return await Form.all()
  }
  public async update({ request }: HttpContextContract) {
    const update = await Form.findByOrFail('id', request.params().id)
    const payload = await request.validate(FormvalidationValidator)
    update.name = payload['name']
    update.email = payload['email']
    update.gender = payload['gender']
    update.mobile = payload['mobile']
    update.city = payload['city']
    update.interests = payload['interests']
    await update.save()
  }
  public async delete({ request }: HttpContextContract) {
    const user = await Form.findByOrFail('id', request.params().id)
    user.delete()
    await user.save()
  }
}
