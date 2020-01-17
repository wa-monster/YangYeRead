<template>
	<view class="content">
		<view class="search-box">
			<input class="input-search"  type="text" v-model="key" placeholder="输入关键词"><span class="btn-search" @click="searchData">搜索</span>
		</view>
		<view class="search-html" v-html='serachData'>
			
		</view>
		<div class="search-result-page">
		        <div class="search-result-page-main">
		                
		                <a href="/search.php?q=123&amp;p=0" title="上一页">上一页</a>
		                <a href="/search.php?q=123&amp;p=2" title="下一页" class="current">下一页</a> 
		                
		                当前第1页 总共2页  
		        </div>
		    </div>
	</view>
</template>

<script>
	import {req} from '../../util/request.js'
	
	export default {
		data(){
			return {
				key:'',
				baseUrl:'http://localhost:3000/api',
				serachData:'',
			}
		},
		onLoad(option) {
			this.key = option.key
			console.log(option)
			console.log(encodeURI)
			// this.searchData()
		},
		methods:{
			searchData(){
				return new Promise((resolve,reject)=>{
					req({
						url:`${this.baseUrl}/search?key=${encodeURI(this.key)}`,
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
		& /deep/ .search-result-page{
			padding-bottom: 40px;
		}
	}
	
</style>
