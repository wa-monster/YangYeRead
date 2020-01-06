const router = require('koa-router')()
const http = require('http')
const spider = require('./spider')
const writeFileFn = require('../../util/mkdir')
const path = require('path')


router.get('/a', async (ctx, next)=>{
  ctx.body="sdasdasdas"
})
router.get('/serach', async(ctx, next)=>{
  let html = await spider()
  let $ = cheerio.load(html)
  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  // console.log(info)
  ctx.body = html
})


module.exports = router