import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/calci', 'ArithapisController.cal')
  Route.get('/calci', 'ArithapisController.cal')
  Route.put('/calci', 'ArithapisController.cal')
  Route.patch('/calci', 'ArithapisController.cal')
}).middleware('Arithmiddle')
