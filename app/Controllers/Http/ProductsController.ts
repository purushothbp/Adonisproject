import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import DatabaseValidator from 'App/Validators/DatabaseValidator'
import Product from '../../Models/Product'
export default class TabsController {
  public async insert1({ request }: HttpContextContract) {
    const payload = await request.validate(DatabaseValidator)
    let tab = new Product()
    tab.customerId = payload['customer_id']
    tab.productName = payload['product_name']
    tab.productId = payload['product_id']
    tab.quantity = payload['quantity']
    await tab.save()
    return 'Successfully Inserted'
  }
  public async select1() {
    return await Product.all()
  }
  public async update1() {
    const user = await Product.findByOrFail('customerId', 1)
    user.productName = 'hiughiux'
    await user.save()
    return Product.all()
  }
  public async delete1() {
    const user = await Product.findByOrFail('productId', 2)
    user.delete()
    await user.save()
    return Product.all()
  }
  //joining operation
  public async joining() {
    const tablejoin = await Database.from('customers')
      .join('products', 'customers.customer_id', '=', 'products.customer_id')
      .select('customers.customer_id')
      .select('customers.customer_name')
      .select('customers.mail_id')
      .select('products.product_name')
      .select('products.quantity')
    return tablejoin
  }
  public async read_product_by_id({ request }: HttpContextContract) {
    const readid = await Product.findByOrFail('customer_id', request.params().id)
    return readid
  }
}
