<template>
	<view class="content">
		<view class="search-box">
			<input class="input-search"  type="text" v-model="key" placeholder="输入关键词"><span class="btn-search" @click="searchData">搜索</span>
		</view>
		<view class="search-html" v-html='serachData'>
			
		</view>
		
		<div class="search-result-page">
			<uni-pagination 
				title="标题文字" 
				show-icon="true" 
				:total="total" 
				:current="currentPage"
				@change="changePage"
				></uni-pagination>
		</div>
	</view>
</template>

<script>
	import {req} from '../../util/request.js'
	import uniPagination from '@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue'
	
	export default {
		components: {uniPagination},
		data(){
			return {
				key:'',
				baseUrl:'http://localhost:3000/api',
				serachData:'',
				currentPage:1,
				total:0
			}
		},
		onLoad(option) {
			this.key = option.key
			console.log(option)
			this.currentPage = 1
			this.searchData()
		},
		methods:{
			searchData(params){
				return new Promise((resolve,reject)=>{
					req({
						url:`${this.baseUrl}/search`,
						method:"get",
						data:{
							key:this.key,
							page:this.currentPage
						}
					}).then(res=>{
						this.serachData = res.data.html
						this.total = res.data.total
						console.log(res.data.total)
						resolve(res)
					}).catch(err=>{
						reject(err)
						throw err
					})
				})
			},
			changePage({type,current}){
				this.currentPage = current
				this.searchData()
			}
		}
	}
</script>

<style lang="scss">
	.search-html{
		& /deep/  .result-list{
			.result-game-item-pic-link-img{
				visibility: hidden;
			}
			.result-game-item-detail{
				color: rgba(0,0,0,0);
				h2,span,a{
					color: rgba(0,0,0,0);
				}
			}
			padding: 20px;
			.result-item{
				display: flex;
				justify-content:center;
				.result-game-item-pic{
					flex:0 1 80px;
					img{
						width: 100%;
					}
				}
				.result-game-item-detail{
					flex: 1;
				}
			}
		}
		
	}
	.search-result-page{
		padding: 40px 18px;
	}
</style>
