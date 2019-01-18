process.on('unhandledRejection', console.error)
const Koa = require('koa')
const KoaRouter = require('koa-router')
const consola = require('consola')
const app = new Koa()
app.use(require('koa-bodyparser')({ enableTypes: ['json', 'form', 'text'] }))
// app.use(async(ctx, next) => ctx.body = await next())
app.use(async (ctx, next) => {
    const result = await next()
    if (result != null) ctx.body = result
})
let port = 3000
const router = new KoaRouter()
if (process.env.PORT) port = process.env.PORT
const { MongoClient } = require('mongodb');

const { Nuxt, Builder } = require('nuxt')
const nuxt = new Nuxt(require('../nuxt.config.js'))
const builder = new Builder(nuxt)
builder.build()

MongoClient.connect("mongodb://" + (process.env.MONGODB || '127.0.0.1:27017'), { useNewUrlParser: true }).then(x => {
    let db = x.db('racing')
    router.get('/test', require('../../index')(db.collection('round'), 5))
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.use(ctx => {
        ctx.status = 200
        ctx.respond = false
        nuxt.render(ctx.req, ctx.res)
    })
    app.listen(port)
    consola.ready({
        message: `Server listening on ${port}`,
        badge: true
    })
})