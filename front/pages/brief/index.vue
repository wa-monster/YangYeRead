<template>
	<view>
		<view class="search-box">
			<input class="input-search" type="text" v-model="searchKey" placeholder="输入关键词"><span class="btn-search" @click="search">搜索</span>
		</view>
	</view>
</template>

<script>
	console.log(xhr)
	export default {
		data(){
			return {
				searchKey:'',
				id:''
			}
		},
		onLoad(option){
			this.id = option.id
			console.log(option)
			this.currentPage = 1
			this.loadData()
		},
		methods:{
			search(){
				if(this.searchKey !== ''){
					uni.navigateTo({
						url:`/pages/search/index?key=${this.searchKey}`,
					})
				}
			},
			loadData(){
				return new Promise((resolve,reject)=>{
					xhr({
						url:`${baseUrl}/book/${this.id}`,
						method:"get",
					}).then(res=>{
						console.log(res)
					}).catch(err=>{
						throw err
					})
				})

			}
		}
	}
</script>

<style>
</style>
