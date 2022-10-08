import Route from '@ioc:Adonis/Core/Route'

    Route.get('/', 'HomeController.index')



Route.group(() => {

  Route.group(() => {
    Route.get('/todo', 'TodosController.index')
     Route.get('/todo/:id', 'TodosController.getById')
    Route.post('/todo', 'TodosController.store')
    Route.patch('/todo/:id', 'TodosController.update') 

  }).middleware('auth')

  Route.post('/register', 'AuthController.register')
  Route.post('/login','AuthController.login')

}).prefix('api')