'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
// creo que esta estaría mejor en PostController, sería lógico
Route.get('/posts', 'AuthController.getPosts')

Route.put('/posts/:id', 'PostController.update').middleware('auth')
Route.delete('posts/id', 'PostController.delete').middleware('auth')
Route.post('/posts', 'PostController.store').middleware('auth')
