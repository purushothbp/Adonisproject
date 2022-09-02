import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.post('/insert', 'CustomersController.insert')
  Route.get('/select', 'CustomersController.select')
  Route.post('/update', 'CustomersController.update')
  Route.post('/delete', 'CustomersController.delete')
  Route.post('/insert1', 'ProductssController.insert1')
  Route.get('/select1', 'ProductsController.select1')
  Route.post('/update1', 'ProductsController.update1')
  Route.post('/delete1', 'ProductsController.delete1')
})
