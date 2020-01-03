const router = require('koa-router')()
const http = require('http')
const spider = require('./spider')
const fs = require('fs')

//判断是否存在文件或目录
const isFileOrDir = ()=>{
  return new Promise((resolve,reject)=>{
    fs.stat(global.dirName + '/public/txt', (error, stats) => {
      if (error) {
        console.log('判断失败')
        resolve(false)
        console.log(error)
        return 
      }else{
        resolve(true)
      }
      console.log('文件：' + stats.isFile())
      console.log('目录:' + stats.isDirectory())
    })
  })
}
//创建文件或者目录
const mkFile = ()=>{
  return new Promise((resolve,reject)=>{
    fs.mkdir(global.dirName + '/piblic/txt',(error)=>{
      if(error){
        console.log('mkFile失败')
        console.log(error)
        resolve(false)
        return 
      }else{
        console.log('创建成功')
        resolve(true)
      }
    })
  })
}
//写入，覆盖文件内容，不存在文件就创建
const writeFile = (str)=>{
  return new Promise((resolve,reject)=>{
    fs.writeFile(global.dirName + '/public/txt/index.html', str, (error)=>{
      if(error){
        console.log('writeFile失败')
        console.log(error)
        resolve(false)
        return 
      }
      resolve(true)
      console.log(str)
      console.log('写入成功')
    })
  })
}

const writeFileFn = async (str)=>{
  let isExists = await isFileOrDir()
  if(isExists){
    return writeFile(str)
  }else{
    return mkFile()
  }
}


router.get('/a', async (ctx, next)=>{
  let ccc = await writeFileFn('ddddddddddddddddddddddddddddddd')
  ctx.body="sdasdasdas"
})
router.get('/serach', async(ctx, next)=>{
  let html = await spider()
  let ccc = await writeFileFn(html)
  ctx.body = html
})


module.exports = router