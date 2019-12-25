const router = require('koa-router')()

router.get('/a', async (ctx, next)=>{
  ctx.body="sdasdasdas"
})


module.exports = router