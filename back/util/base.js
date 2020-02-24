//图片
exports.resolveImg = function(imgEl,klass){
  let itemPic = $(imgEl).find(klass)
  let pic = {
    bookLink: `/pages/brief/index?id=${$(itemPic).find('a').attr('href').substr(6)}`,
    bookImg: $(itemPic).find('img').attr('src'),
    errImg: 'https://www.biquge.com.cn//images/nocover.jpg',
  }
  return pic
}
