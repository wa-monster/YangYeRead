<template>
	<view class="content">
		<view class="search-box">
			<input type="text" v-model="searchKey" placeholder="输入关键词"><span class="btn-search" @click="search">搜索</span>
		</view>
		<div :key="index" v-for="(item,index) in pageData" v-html="item" class="block" >
		</div>

	</view>
</template>

<script>
	export default {
			data() {
				return {
					title: 'Hello',
					baseUrl:'http://localhost:3000',
					pageData:[],
					url:"window.location='/search.php?q='+encodeURI($('#keyword').val());",
					searchKey:'',
				}
			},
			async onLoad() {
				// await this.loadData()
				console.log(this.pageData)
			},
			methods: {
				loadData(){
					return new Promise((resolve,reject)=>{
						uni.request({
							url:this.baseUrl+'/api/home',
							method:'GET',
							success:(res)=>{
								console.log(res)
								console.log(this.pageData)
								this.pageData = res.data
								resolve()
							},
							fail:(err)=>{
								reject(err)
							}
						})
					})
				},
				search(){
					if(this.searchKey !== ''){
						uni.navigateTo({
							url:`/pages/search/index?key=${this.searchKey}`,
						})
					}
				}
			}
		}
	</script>
	
	<style lang="scss">
		.search-box{
			border: 1px  solid #C0C0C0;
			width: 90%;
			margin: 10px 5%;
			overflow: hidden;
		}
		.block{
			display: flex;
			// justify-content: center;
			align-items: flex-start;
			flex-wrap: wrap;
			//超链接样式修改
			& /deep/ a{
				text-decoration: none;
				color: #808080;
			}
			& /deep/ .block_img{
				flex: 0 1 80px;
				margin: 10rpx;
			}
			& /deep/ .block_txt{
				
				padding: 10px;
				flex: 1 1 60%;
				h2{
					font-size: 16px;
				}
				p{
					a{
						color: #505050;
					}
					font-size: 12px;
				}
			}
			& /deep/ ul{
				text-decoration: none;
				flex: 0 1 90%;
				margin: 0 5%;
				font-size: 10px;
				list-style-type: none;
				padding: 0;
				li{
					padding: 10px 0 10px 10px;
					border-bottom: 1px solid #ccc;
					a{
						font-size: 16px;
						color: blue;
					}
				}
				
				
			}
		}
		
	</style>
	