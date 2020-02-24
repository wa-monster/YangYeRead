const router = require('koa-router')()
const spider = require('./spider')
const writeFileFn = require('../../util/mkdir')
const path = require('path')
const cheerio = require('cheerio')



const { indexData, searchData, briefData, contentData } = require('../../control')
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
  let ListData = indexData($)

  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  ctx.body = ListData
})

//搜索
router.get('/search', async(ctx, next)=>{
  let { key, page } = ctx.query
  let url = `https://m.biquge.com.cn/search.php?q=${key}&p=${page}`
  
  let html = await spider(url)
  //cheerio
  let $ = cheerio.load(html)
  let data =  searchData($)
  //写入
  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/search.html'))
  ctx.body = data 
})


//简介和目录
let contorlBrief = async (ctx, next) => {
  let { bookId ,catlog } = ctx.params
  let html
  if(catlog !== false){
    html = await spider(`${url}/book/${bookId}/${catlog}`)
  }else{
    html = await spider(`${url}/book/${bookId}/`)
  }
  let $ = cheerio.load(html)
  let body = briefData($)

  // chapter.attr('style','display:block')

  // let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  ctx.body = body 

}

//内容
let contorlCatlog = async (ctx, next) => {
  let { bookId ,catlog } = ctx.params

  let html = await spider(`${url}/book/${bookId}/${catlog}`)
  let $ = cheerio.load(html)
  let body = contentData($)
  let info = await writeFileFn(html, path.join(global.dirName + '/public/txt/a/index.html'))
  ctx.body = body
}
//简介,目录和内容
let isCatlogOrBrief  = (ctx, next)=>{
  let { catlog } = ctx.params
  if(catlog){
    if(catlog.indexOf('index') !== -1){
      //目录
      return contorlBrief(ctx, next)
    }else{
      //内容
      return contorlCatlog(ctx, next)
    }
  }else{
    //简介
    return contorlBrief(ctx, next)
  }
}

//简介
router.get('/book/:bookId', isCatlogOrBrief)

//目录和内容
router.get('/book/:bookId/:catlog', isCatlogOrBrief)

module.exports = router