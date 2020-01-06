/**
*创建文件并写入内容
*
* */ 

const fs = require('fs')
const path = require('path')

//判断是否存在文件或目录
const isFileOrDir = (dirname = '/index.html') => {
  console.log('判断',dirname)
  return new Promise((resolve, reject) => {
    fs.stat(dirname, (error, stats) => {
      if (error) {
        console.log('判断失败')
        resolve(false)
        console.log(error)
        return
      } else {
        console.log('判断成功')
        resolve(true)
        console.log('文件：' + stats.isFile())
        // console.log('目录:' + stats.isDirectory())
      }
    })
  })
}
//创建文件或者目录
const mkFile = (dirname = '/index.html') => {
  return new Promise((resolve) => {
    fs.mkdir(dirname, (error) => {
      if (error) {
        console.log('创建目录失败')
        console.log(error)
        resolve(false)
        return
      } else {
        console.log('创建目录成功')
        resolve(true)
      }
    })
  })
}
//写入，覆盖文件内容，不存在文件就创建
const writeFile = (htmlStr, dirname = '/index.html') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dirname, htmlStr, (error) => {
      if (error) {
        console.log(error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

//递归创建
const mkdirFn = async (dirname) =>{
  let isExists = await isFileOrDir(dirname)
  console.log(!isExists)
  if (!isExists) {
    await mkdirFn(path.dirname(dirname))
  }else{
    return true
  }
  console.log(dirname)
  isMkFile = await mkFile(dirname)

}

//建立文件并写入内容
const writeFileFn = async (htmlStr,dirname='/index.html') => {
  await mkdirFn(path.dirname(dirname))
  return writeFile(htmlStr, dirname) ? '写入文件成功' : '写入文件失败'
}

module.exports = writeFileFn