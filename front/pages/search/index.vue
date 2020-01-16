<template>
	<view class="content">
		12312312312312
		<view v-html='serachData'>
			
		</view>
	</view>
</template>

<script>
	import {req} from '../../util/request.js'
	
	export default {
		data(){
			return {
				key:'',
				baseUrl:'http://localhost:3000/api',
				serachData:''
			}
		},
		onLoad(option) {
			this.key = option.key
			console.log(option)
			console.log(encodeURI)
			this.searchData()
		},
		methods:{
			searchData(){
				return new Promise((resolve,reject)=>{
					req({
						url:`${this.baseUrl}/search?q=${encodeURI(this.key)}`,
						method:"get",
					}).then(res=>{
						console.log(res)
						this.serachData = res.data
						resolve(res)
					}).catch(err=>{
						reject(err)
						throw err
					})
				})
			}
		}
	}
</script>

<style>
</style>
