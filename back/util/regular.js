const codeRegular = function(str){
  let regular = /\<meta[\s\S]*?charset=["']?(.*?)["']/
  return str.match(regular)
}


module.exports = {
  codeRegular,
  
}