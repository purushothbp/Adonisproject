import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'
export default class TabsController {
  public async insert1({ request }: HttpContextContract) {
    let tab = new Product()
    tab.customerId = request.input('customerId')
    tab.productName = request.input('productName')
    tab.productId = request.input('productId')
    tab.save()
    return 'Successfully Inserted' + tab
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
}
