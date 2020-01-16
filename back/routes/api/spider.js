const https = require('https')
const zlib = require('zlib')
const iconv = require('icon');


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




module.exports = spider
