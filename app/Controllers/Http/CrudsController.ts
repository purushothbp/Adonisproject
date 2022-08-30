import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Crud from 'App/Models/Crud'
//import Database from '@ioc:Adonis/Lucid/Database'
export default class TabsController {
  public async insert1({ request }: HttpContextContract) {
    let tab = new Crud()
    tab.id = request.input('id')
    tab.name = request.input('name')
    tab.save()
    return 'Successfully Inserted' + tab
  }
  public async read() {
    return await Crud.all()
  }
  public async update() {
    const user = await Crud.findByOrFail('id', 4)
    user.name = ''
    await user.save()
    return Crud.all()
  }

  public async delete() {
    const user = await Crud.findByOrFail('id', 4)
    user.delete()
    await user.save()
    return Crud.all()
  }
}
