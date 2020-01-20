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
  let { key, page } = ctx.query
  console.log(ctx.query)
  let url = `https://m.biquge.com.cn/search.php?q=${key}&p=${page}`
  
  let html = await spider(url)
  //cheerio
  let $ = cheerio.load(html)

  let mainText = $('.search-result-page-main').text()
  let elementTotal = mainText.split('总共')[1]
  elementTotal = elementTotal.match(/\d+/g)

  //去除搜索
  $('.search').remove()
  //去除分页
  
  $('.search-result-page').remove()
  let resultList = $('body')
  
  let ListHtml = [] 
  //写入
  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/search.html'))
  ctx.body = {
    html:$(resultList).html(),
    total: Number(elementTotal)*10
  }
})


module.exports = router