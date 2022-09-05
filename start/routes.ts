import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.group(() => {
    Route.post('/insert', 'CustomersController.insert')
    Route.get('/select', 'CustomersController.select')
    Route.post('/update', 'CustomersController.update')
    Route.post('/delete', 'CustomersController.delete')
  }).prefix('/customers')
  Route.group(() => {
    Route.post('/insert', 'ProductsController.insert1')
    Route.get('/select', 'ProductsController.select1')
    Route.post('/update', 'ProductsController.update1')
    Route.post('/delete', 'ProductsController.delete1')
    Route.get('/join', 'ProductsController.joining')
    Route.get('/getbyid/:id', 'ProductsController.read_product_by_id')
  }).prefix('/products')
}).middleware('auth')
