const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/da', async (ctx, next) => {
  ctx.body = {
    name: '123',
    url: '33333'
  }
})


router.use('/api', require('./api/index').routes())

module.exports = router
