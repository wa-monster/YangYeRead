<template>
	<view class="content">
		<view class="search-box">
			<input class="input-search" type="text" v-model="searchKey" placeholder="输入关键词"><span class="btn-search" @click="search">搜索</span>
		</view>

		<view :key="index" v-for="(item,index) in pageData"  class="block" >
			<!-- <view class="title"><span>{{item.title.titleName}}</span></view> -->
			<view class="block_img">
				<navigator :hover-stay-time="50" :url="item.block_img.bookLink">
					<image class="img" :src="item.block_img.bookImg" :onerror="item.block_img.errImg"/>
				</navigator>
			</view>
			<view class="block_txt">
			    <h2>
			    	<navigator :hover-stay-time="50" :url="item.block_txt.href">{{item.block_txt.name}}</navigator>
			    </h2>
			    <p>{{item.block_txt.author}}</p>
			    <view class="p brief">
					<navigator :hover-stay-time="50" :url="item.block_txt.href"> 
						{{item.block_txt.brief}}
					</navigator>
				</view>
			</view>
			<view class="ul">
				<view class="li" v-for="(liItem,liIndex) in item.book_li" :key="liIndex">
					<navigator :hover-stay-time="50" :url="liItem.bookHref" class="a">
						{{liItem.bookName}}
					</navigator>{{liItem.bookAuthor}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				pageData:[],
				searchKey:'',
			}
		},
		async onLoad() {
			await this.loadData()
		},
		methods: {
			loadData(){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:`${this.$baseUrl}/home`,
						method:'GET',
						success:(res)=>{
							console.log(res)
							let data = res.data
							this.pageData = data
							resolve()
						},
						fail:(err)=>{
							reject(err)
						}
					})
				})
			},
			search(){
				console.log('1231231231')
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
	.content{
		padding-bottom: 40px;
	}

	.block{
		display: flex;
		// justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		.block_img{
			flex: 0 0 10px;
			margin: 10rpx;
			.img{
				width: 80px;
				height: 100px;
			}
		}
		.block_txt{
			
			padding: 10px;
			flex: 1 1 60%;
			.p.brief{
				font-size: .7rem;
				color: #ccc;
			}
		}
		.ul{
			flex: 0 1 90%;
			margin: 0 5%;
			font-size: 10px;
			padding: 0;
			.li{
				padding: 10px 0 10px 10px;
				border-bottom: 1px solid #ccc;
				font-size: .7rem;
				.a{
					font-size: 1rem;
					color: blue;
					display: inline-block;
				}
			}
			
			
		}
	}

</style>
	