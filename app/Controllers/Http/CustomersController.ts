import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from '../../Models/Customer'
export default class CustomersController {
  public async insert({ request }: HttpContextContract) {
    let tab = new Customer()
    tab.customerId = request.input('customerId')
    tab.customerName = request.input('customerName')
    tab.mailId = request.input('mailId')
    tab.save()
    return 'Successfully Inserted'
  }
  public async select() {
    return await Customer.all()
  }
  public async update() {
    const user = await Customer.findByOrFail('customerId', 1)
    user.mailId = 'MUKTHI@gmail.com'
    await user.save()
    return Customer.all()
  }
  public async delete() {
    const user = await Customer.findByOrFail('customerName', 6)
    user.delete()
    await user.save()
    return Customer.all()
  }
}
