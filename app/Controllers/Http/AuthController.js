'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Auth */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} User */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} Post*/
const Post = use('App/Models/Post')

class AuthController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   *
   */
  async register({ request, response, auth }) {
    // debería introducir validación
    let user = await User.create(request.all())

    let token = await auth.generate(user)

    Object.assign(user, token)

    return response.json(user)
  }
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   *
   */
  async login({ request, response, auth }) {
    let { email, password } = request.all()

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)

        Object.assign(user, token)

        return response.json(user)
      }
    } catch (e) {
      console.log(e)
      return response.json({ message: 'You are not register yet!' })
    }
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   *
   */
  async getPosts({ request, response }) {
    let posts = await Post.query().with('user').fetch()

    return response.json(posts)
  }
}

module.exports = AuthController
