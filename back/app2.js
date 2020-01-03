const https = require('https')
const cheerio = require('cheerio')
const zlib = require('zlib')

let url1 = "https://www.biquge.com.cn/"

let req = https.get(url1, function (res) {
  let chunks = [],
    size = 0
  res.on('data', function (chunk) {
    console.log(chunk)
    chunks.push(chunk)
  })
  res.on('end', function (chunl) {
    console.log('完成')
    let data = Buffer.concat(chunks)
    
    zlib.gunzip(data, function (err, decoded) {
      console.log(decoded)
      if (!decoded){
        console.log(data.toString())
      }else{
        console.log(decoded.toString())
      }
    })

  })
})
req.end()