import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from '../../Models/Customer'
import DatabaseValidator from '../../Validators/DatabaseValidator'
export default class CustomersController {
  public async insert({ request }: HttpContextContract) {
    const payload = await request.validate(DatabaseValidator)
    let tab = new Customer()
    tab.customer_id = payload['customer_id']
    tab.customer_name = payload['customer_name']
    tab.mail_id = payload['mail_id']
    tab.save()
    return 'Successfully Inserted'
  }
  public async select() {
    return await Customer.all()
  }
  public async update() {
    const user = await Customer.findByOrFail('customer_id', 1)
    user.mail_id = 'MUKTHI@gmail.com'
    await user.save()
    return Customer.all()
  }
  public async delete() {
    const user = await Customer.findByOrFail('customer_name', 6)
    user.delete()
    await user.save()
    return Customer.all()
  }
}
