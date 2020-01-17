const https = require('https')
const zlib = require('zlib')
const iconv = require('iconv-lite')
const regular = require('../../util/regular.js')
const cheerio = require('cheerio')

//正则验证
function changeCodeFormat(data){
  $ = cheerio.load(data)
  let meta = $('meta')
  let htmlStr = data
  //检查编码格式
  let codeFormat = regular.codeRegular(meta.toString())
  if (codeFormat) {
    htmlStr = iconv.decode(data, codeFormat[1])
  }
  return htmlStr
}



//爬虫
function spider(spiderUrl){
  return new Promise((resolve,reject)=>{
    let str
    let req = https.get(spiderUrl, function (res) {
      let chunks = []
      res.on('data', function (chunk) {
        chunks.push(chunk)
      })
      //请求结束
      res.on('end', function (chunk) {
        let data = Buffer.concat(chunks)
        //解压缩
        zlib.gunzip(data, function (err, decoded) {
          // if(err){
          //   reject(err)
          // }
          if (!decoded) {
            str = changeCodeFormat(data).toString()
            resolve(str)
          } else {
            str = changeCodeFormat(decoded).toString()
            resolve(str)
          }
        })
      })
    }).on('error',(err)=>{
      console.log('出错了')
      reject(err)
    })
    req.end()
  })
}




module.exports = spider
