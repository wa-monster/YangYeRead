const router = require('koa-router')()
const http = require('http')
const spider = require('./spider')
const writeFileFn = require('../../util/mkdir')
const path = require('path')
const cheerio = require('cheerio')


router.get('/da', async (ctx, next)=>{
  ctx.body={
    name:'123',
    url:'33333'
  }
})
router.get('/serach', async(ctx, next)=>{
  let html = await spider()
  // console.log(html.length)
  let $ = cheerio.load(html)
  let blockList = $('.article .block')
  let ListHtml = [] 
  blockList.each(function(index,item){
    console.log($(item).text())
    ListHtml.push($(item).html())
  })
  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  console.log(ListHtml)
  ctx.body = ListHtml
})


module.exports = router