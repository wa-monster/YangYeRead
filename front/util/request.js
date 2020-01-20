


export const xhr = function(options){
	return new Promise((resolve,reject)=>{
		options = Object.assign({},{url:'',method:''},options)
		uni.request({
			...options,
			success(res){
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}













