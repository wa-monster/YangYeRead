const router = require('koa-router')()
const spider = require('./spider')
const writeFileFn = require('../../util/mkdir')
const path = require('path')
const cheerio = require('cheerio')

const url = "https://m.biquge.com.cn"

router.get('/da', async (ctx, next)=>{
  ctx.body={
    name:'123',
    url:'33333'
  }
})
//首页
router.get('/home', async(ctx, next)=>{
  
  let html = await spider(url)
  // console.log(html.length)
  let $ = cheerio.load(html)

  $('a').each(function(index,item){
    let href = $(item).attr('href')
    let i = href.lastIndexOf("\/");
    let code = href.substring(i + 1, href.length)
    $(item).attr('href', `/pages/brief/index?id=${code}`)
  })
  
  let ListHtml = [] 
  $('.article .block').each(function(index,item){
    
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
  $('a').each(function (index, item) {
    let href = $(item).attr('href')
    href = href.substring(0, href.length-1)
    let i = href.lastIndexOf("\/");
    let code = href.substring(i + 1, href.length)
    $(item).attr('href', `/pages/brief/index?id=${code}`)
  })
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
  let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/search.html'))
  ctx.body = {
    html:$(resultList).html(),
    total: Number(elementTotal)*10
  }
})
//简介
router.get('/book/:bookId', async (ctx, next) => {
  let { bookId } = ctx.params
  ctx.body = {
    b: ctx.params
  }
})

module.exports = router