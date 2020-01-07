const router = require('koa-router')()
const http = require('http')
const spider = require('./spider')
const writeFileFn = require('../../util/mkdir')
const path = require('path')
const cheerio = require('cheerio')


router.get('/a', async (ctx, next)=>{
  ctx.body="sdasdasdas"
})
router.get('/serach', async(ctx, next)=>{
  let html = await spider()
  console.log(html.length)
  let $ = cheerio.load(html)
  let aList = $('.nav a')
  aList.each(function(index,item){
    console.log($(item).text())
  })
  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  // console.log(info)
  ctx.body = '123'
})


module.exports = router