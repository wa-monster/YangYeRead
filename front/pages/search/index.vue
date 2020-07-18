<template>
	<view class="content">
		
		<view class="search-box">
			<input class="input-search"  type="text" v-model="key" placeholder="输入关键词"><span class="btn-search" @click="searchData">搜索</span>
		</view>
		
		<view class="search-html">
			<view class="result-item result-game-item" v-for="(item,index) in ListsData" :key="index">
			   <view class="result-game-item-pic">
			        <navigator :hover-stay-time="50" cpos="img" :url="item.item_pic.bookLink" class="result-game-item-pic-link" target="_blank" style="width:110px;height:150px;">
			            <image :src="item.item_pic.bookImg" class="result-game-item-pic-link-img" >
			        </navigator>
			    </view>
			    <view class="result-game-item-detail"> 
			        <p class="result-item-title result-game-item-title">
			            <navigator :hover-stay-time="50" cpos="title" :url="item.item_detail.title.src" :title="item.item_detail.title.name" class="result-game-item-title-link" target="_blank">
			                <text>{{item.item_detail.title.name}}</text>
			            </navigator>
			        </p>
			        <p class="result-game-item-desc">{{item.item_detail.itemBreif}}</p>
			        <div class="result-game-item-info">
			            <p class="result-game-item-info-tag">
			                <span class="result-game-item-info-tag-title preBold">{{item.item_detail.info_item.auther[0]}}</span>
			                <span>{{item.item_detail.info_item.auther[1]}}</span>
			            </p>
			            <p class="result-game-item-info-tag">
			                <span class="result-game-item-info-tag-title preBold">{{item.item_detail.info_item.type[0]}}</span>
			                <span class="result-game-item-info-tag-title">{{item.item_detail.info_item.type[1]}}</span>
			            </p>
			            <p class="result-game-item-info-tag">
			                <span class="result-game-item-info-tag-title preBold">{{item.item_detail.info_item.time[0]}}</span>
			                <span class="result-game-item-info-tag-title">{{item.item_detail.info_item.time[1]}}</span>
			            </p>
			            <p class="result-game-item-info-tag">
			                <span class="result-game-item-info-tag-title preBold">{{item.item_detail.info_item.new[0]}}</span>
			                <navigator :hover-stay-time="50" :url="item.item_detail.info_item.new[2]"  class="result-game-item-info-tag-item" >{{item.item_detail.info_item.new[1]}}</navigator>
			            </p>
			        </div>
			    </view>			
			</view>
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
	import uniPagination from '@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue'
	
	export default {
		components: {uniPagination},
		data(){
			return {
				key:'',
				ListsData:[],
				currentPage:1,
				total:0,
				aa:''
			}
		},
		onLoad(option) {
			this.key = option.key
			this.currentPage = 1
			this.searchData()
		},
		methods:{
			aad(){
				console.log(this.aa)
			},
			searchData(params){
				return new Promise((resolve,reject)=>{
					this.$xhr({
						url:`${this.$baseUrl}/search`,
						method:"get",
						data:{
							key:this.key,
							page:this.currentPage
						}
					}).then(res=>{
						this.ListsData = res.data.html
						this.total = res.data.total
						console.log(res.data.html)
						resolve(res)
					}).catch(err=>{
						uni.showToast({
						    title: '请求出错',
						    duration: 2000
						});
						reject(err)
						throw err
					})
				})
			},
			changePage({type,current}){
				this.currentPage = current
				this.searchData()
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
</script>

<style lang="scss">
	.search-html{
		padding: 20px;
		.result-item{
			display: flex;
			justify-content:center;
			margin: 10px 0;
			.result-game-item-pic{
				width: $pic-width !important;
				height: $pic-height  !important;
				flex:0 1 80px;
				.result-game-item-pic-link{
					.result-game-item-pic-link-img{
						width: 80px;
						height: 100px;
						// margin-top: 20px;
					}
				}
			}
			.result-game-item-detail{
				flex: 1;
				.result-item-title{
					height: 1.5rem;
					line-height: 1rem;
					font-weight: bold;
					font-size: 1rem;
				}
			}
		}
		
	}
	.result-game-item-desc{
		font-size: .7rem;
	}
	.result-game-item-info{
		font-size: .7rem;
	}
	.search-result-page{
		padding: 40px 18px;
	}
</style>
