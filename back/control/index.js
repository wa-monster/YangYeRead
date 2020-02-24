let {resolveImg,} = require('../util/base')


//首页
exports.indexData = function($){
  let ListHtml = []

  $('.article').each(function(index,item){
    let article ={}
    let title = $(item).find('.title')
    article.title = {
      titleName: $(title).find('a').eq(0).text()
    }

    let block = $(item).find('.block')
    
    // let blockImg = $(block).find('.block_img')
    let block_img = resolveImg(block,'.block_img')
    // {
    //     bookLink: `/pages/brief/index?id=${$(blockImg).find('a').attr('href').substr(6)}`,
    //     bookImg: $(blockImg).find('img').attr('src'),
    //     errImg: 'https://www.biquge.com.cn//images/nocover.jpg',
    //   }
    let blockTxt = $(block).find('.block_txt')
   
    let block_txt = {
      name:$(blockTxt).find('h2').text(),
      author:$(blockTxt).find('p').eq(2).text(),
      brief:$(blockTxt).find('p').eq(3).text(),
      href: `/pages/brief/index?id=${$(blockTxt).find('a').eq(0).attr('href').substr(6)}`
    }
    let bookLi = $(block).find('ul li')
    let book_li = []
    $(bookLi).each(function(index,Link){
      let bookName = $(Link).find('a').text()
      let bookHref = `/pages/brief/index?id=${$(Link).find('a').attr('href').substr(6)}`
      $(Link).find('a').remove()
      let bookAuthor = $(Link).text()
      let book = {
        bookName,
        bookAuthor,
        bookHref
      }
      book_li.push(book)
    })
    article= Object.assign(article,{block_img},{block_txt},{book_li})
    
    ListHtml.push(article)
  })
  return ListHtml
}

//搜索
exports.searchData = function($){
  let ListHtml = [] 
  $('.result-game-item.result-item').each(function(index,item){
    let item_pic = resolveImg(item,'.result-game-item-pic')
    // let item_pic = {
    //     bookLink: `/pages/brief/index?id=${$(itemPic).find('a').attr('href').substr(6)}`,
    //     bookImg: $(itemPic).find('img').attr('src'),
    //     errImg: 'https://www.biquge.com.cn//images/nocover.jpg',
    //   }
    let itemDetail = $(item).find('.result-game-item-detail')
    
    let itemTitle = $(itemDetail).find('.result-item-title.result-game-item-title')
    let title ={
      src: `/pages/brief/index?id=${$(itemTitle).find('a').attr('href').substr(6)}`,
      name:$(itemTitle).find('a span').text()
    }
    let itemBreif = $(itemDetail).find('.result-game-item-desc').text()
    let infoItem = $(itemDetail).find('.result-game-item-info p')

    let info_item = {
      auther:[$(infoItem).eq(0).find('span').eq(0).text(),$(infoItem).eq(0).find('span').eq(1).text()],
      type:[$(infoItem).eq(1).find('span').eq(0).text(),$(infoItem).eq(1).find('span').eq(1).text()],
      time:[$(infoItem).eq(2).find('span').eq(0).text(),$(infoItem).eq(2).find('span').eq(1).text()],
      new:[$(infoItem).eq(3).find('span').text(),$(infoItem).eq(3).find('a').text(),`pages/look/index?id=${$(infoItem).eq(3).find('a').attr('href').substr(6)}`]
    }
    let item_detail = {
      title,
      itemBreif,
      info_item
    }
    let resultItem = {
      item_pic,
      item_detail
    }
    ListHtml.push(resultItem)
  })
  let mainText = $('.search-result-page-main').text()
  let elementTotal = mainText.split('总共')[1]
  elementTotal = elementTotal.match(/\d+/g)



  return {
    html: ListHtml,
    total: Number(elementTotal)*10
  }
}

//简介和目录
exports.briefData = function($){
  
  let blockImg = $('.block').find('.block_img2 img')
  let blockTxtP = $('.block').find('.block_txt2 p')
  let brief = {
    block_img2:$(blockImg).attr('src'),
    block_txt2:{
      name:['pages/brief/index?id=' + $('.block').find('.block_txt2 h2').find('a').attr('href'),$('.block').find('.block_txt2 h2').text()],
      author:$(blockTxtP).eq(2).text(),
      type:$(blockTxtP).eq(3).text(),
      status:$(blockTxtP).eq(4).text(),
      time:$(blockTxtP).eq(5).text(),
      new:['/pages/brief/index?id='+$(blockTxtP).eq(6).find('a').attr('href'),$(blockTxtP).eq(6).text()],
    }
  }
  let intro_info = $('.intro_info').text()

  let margin_right = {
    aLink:'/pages/look/index?id='+$('.margin_right').find('a').attr('src'),
    info:$('.margin_right').find('a').text(),
  }

  let chapter = $('.chapter').eq(1)
  let chapterArr =[]
  chapter.find('li').each(function(index,item){
    let alink = $(item).find('a')
    let li = {
      name:alink.text(),
      src:'/pages/look/index?id='+$(alink).attr('href').substr(6),
    }
    chapterArr.push(li)
  })

  let middle = $('.listpage span[class=middle]')
  let middleArr = []
  middle.find('select option').each(function(index,item){
    let option = {
      value:$(item).text(),
      src: '/pages/brief/index?id='+$(item).attr('value').substr(6)
    }
    middleArr.push(option)
  })
  // let leftId = $('.listpage span[class=left]').find('a').attr('href')
  // let rightId = $('.listpage span[class=right]').find('a').attr('href')
  // let left =  leftId ? 'pages/brief/index?id='+ leftId.substr(6) : 'pages/brief/index'
  // let right = '/pages/brief/index?id='+rightId.substr(6)
  return {
    "b": brief,
    "i": intro_info,
    "m": margin_right,
    "c": chapterArr,
    "l": {
      // left,
      middleArr,
      // right,
    }
  }
}


//内容
exports.contentData = function($){

  //截取内容区
  let name = $('#_bqgmb_h1').text()

  let title = $('.nr_title').text()
  let nrPage = $('.nr_page').eq(0).find('td')
  let nrPageData = []
  nrPage.each(function(index,item){
    let alink = $(item).find('a')
    let href = alink.attr('href')
    let src
    if(index === 1){
        src = '/pages/brief/index?id='+href.substr(6)
    }else{
      src = '/pages/look/index?id='+href.substr(6)
    }
    let obj = {
      text:alink.text(),
      src
    }
    nrPageData.push(obj)
  })

  let nrArr = $('.nr_nr').find('div').html()
  // nrArr =nrArr.split('<br>')
  // nrArr = nrArr.filter(item=>{
  //   return item.length !== 0
  // })

  return {
    name,
    title,
    nrPageData,
    nrArr
  }
} 



