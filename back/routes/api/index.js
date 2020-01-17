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
//首页
router.get('/home', async(ctx, next)=>{
  let url = "https://m.biquge.com.cn/"
  let html = await spider(url)
  // console.log(html.length)
  let $ = cheerio.load(html)
  let blockList = $('.article .block')
  let ListHtml = [] 
  blockList.each(function(index,item){
    ListHtml.push($(item).html())
  })
  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  ctx.body = ListHtml
})

//搜索
router.get('/search', async(ctx, next)=>{
  let { key } = ctx.query
  let url = `https://m.biquge.com.cn/search.php?q=${key}`
  let html = await spider(url)
  //cheerio
  let $ = cheerio.load(html)
  $('.search').remove()
  let resultList = $('body')
  
  let ListHtml = [] 
  //写入
  let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/search.html'))
  console.log(info)
  ctx.body = $(resultList).html()
})


module.exports = router