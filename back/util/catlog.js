exports.resolveCatlog = function($){
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




  return chapterArr
}

exports.getMid = function($){
  let middle = $('.listpage span[class=middle]')
  let middleArr = []
  middle.find('select option').each(function(index,item){
    let option = {
      value:$(item).text(),
      src: '/catlog/'+$(item).attr('value').substr(6)
    }
    middleArr.push(option)
  })
  return middleArr
}

exports.currentCatlog = function(mid,catlog){
  if(catlog){
    let currentNum = 0
    let isFind = mid.some(item=>{
      currentNum ++
      return item.src.indexOf(catlog) !== -1
      
    })
    if(isFind){
      return currentNum - 1
    }else{
      return 'err'
    }
  }else{
    return 0
  }

}