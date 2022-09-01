/*import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hello from 'App/Models/Hello'
//import Database from '@ioc:Adonis/Lucid/Database'
import Joint from '../../Models/Joint';
export default class TabsController {
  public async insert({ request }: HttpContextContract) {
    let tab = new Hello()
    tab.id = request.input('id')
    tab.name = request.input('name')
    tab.email = request.input('email')
    tab.save()
    return 'Successfully Inserted' + tab
  }
  public async select() {
    return await Hello.all()
  }
  public async update() {
    const user = await Hello.findByOrFail('id', 1)
    user.email = 'MUKTHI@gmail.com'
    await user.save()
    return Hello.all()
  }
  public async delete() {
    const user = await Hello.findByOrFail('id', 2)
    user.delete()
    await user.save()
    return Hello.all()
  }
}
*/
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hello from 'App/Models/Hello'
import Joint from 'App/Models/Joint'
import Database from '@ioc:Adonis/Lucid/Database'
export default class TabsController {
  public async insert({ request }: HttpContextContract) {
    let tab = new Joint()
    tab.id = request.input('id')
    tab.phnum = request.input('phnum')
    tab.save()
    return 'Successfully Inserted' + tab
  }
  public async delete() {
    const user = await Joint.findByOrFail('id', 5)
    user.delete()
    await user.save()
    return Joint.all()
  }
  public async update() {
    const user = await Hello.findByOrFail('name', 'tharun')
    user.id = 2
    await user.save()
    return Hello.all()
  }
  public async join() {
    const tablejoin = await Database.from('hellos')
      .join('joints', 'joints.id', '=', 'hellos.id')
      .select('hellos.id')
      .select('hellos.name')
      .select('hellos.email')
      .select('joints.phnum')
    return tablejoin
  }
}
