const https = require('https')
const cheerio = require('cheerio')
const zlib = require('zlib')
const router = require('koa-router')()

let url1 = "https://www.biquge.com.cn/"


router.get('/spider',async (ctx)=>{
  let sss;
  let req = https.get(url1, function (res) {
    let chunks = []
    res.on('data', function (chunk) {
      console.log(chunk)
      chunks.push(chunk)
    })
    res.on('end', function (chunk) {
      console.log('完成')
      let data = Buffer.concat(chunks)
      console.log(data)
      zlib.gunzip(data, function (err, decoded) {
        if (!decoded) {
          sss = data.toString()
          res.json(sss)
        } else {
          sss = decoded.toString()
          res.json(sss)
        }
        
      })
    })
  })
  req.end()
  console.log(sss)
   ctx.body = sss

})


function spider (){
  return new Promise((resolve,reject)=>{
    let str
    let req = https.get(url1, function (res) {
      let chunks = []
      res.on('data', function (chunk) {
        console.log(chunk)
        chunks.push(chunk)
      })
      res.on('end', function (chunk) {
        console.log('完成')
        let data = Buffer.concat(chunks)
        zlib.gunzip(data, function (err, decoded) {
          if (!decoded) {
            str = data.toString()
            resolve(str)
          } else {
            str = decoded.toString()
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


  // console.log(sss)


module.exports = spider
