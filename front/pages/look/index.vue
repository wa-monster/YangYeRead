<template>
	<view class="look">
		<view class="name">
			<text id="_bqgmb_h1">{{name}}</text>
		</view>
		<view class="title" id="nr_title">{{title}}</view>
		<view class="btn">
			<view class="span" v-for="(item,index) in preAndNext" :key="index">
				<navigator v-if="index === 1" :hover-stay-time="50" class="a" :url="item.src">{{item.text}}</navigator>
				<text class="a" v-else  @click="getLook(item.src)">{{item.text}}</text>
			</view>
		</view>
		<view id="nr" class="content" v-html="contentData">
				<!--  text class="content_text" v-for="(content,index) in contentData" :key="index" v-html="content"> 
				</text> -->
		</view>
		<view  class="btn">
			<view class="span" v-for="(item,index) in preAndNext" :key="index">
				<navigator v-if="index === 1" :hover-stay-time="50" class="a" :url="item.src">{{item.text}}</navigator>
				<text class="a" v-else  @click="getLook(item.src)">{{item.text}}</text>
			</view>
		</view>
		这里是杨也的小说app
	</view>
</template>

<script>
	export default {
		data(){
			return {
				id:'',
				contentData:'加载中',
				name:'加载中',
				preAndNext:[
					{
						text:'加载中'
					},
					{
						text:'加载中'
					},
					{
						text:'加载中'
					}
				],
				title:'加载中'
			}
		},
		onLoad(option){
			this.id = option.id
			this.loadData()
		},
		methods:{
			loadData(){
				return new Promise((resolve,reject)=>{
					this.$xhr({
						url:`${this.$baseUrl}/book/${this.id}`,
						method:"get",
					}).then(res=>{
						let data =res.data
						// console.log(data)
						// let briefData = '<div class="block">' + res.data.b + '</div>' 
						
						this.contentData = data.nrArr
						this.preAndNext = data.nrPageData
						this.title = data.title
						this.name = data.name
						// this.ddd = res.data.l
					}).catch(err=>{
						
						uni.showToast({
						    title: '请求出错',
						    duration: 2000
						});
						throw err
					})
				})
			},
			getLook(src){
				if(src.indexOf('/pages/brief/index?id=') !== -1){
					uni.navigateTo({
						url:src,
					})
					return 
				}
				this.id = src;
				this.contentData = '加载中'
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.loadData();
			}
		}
		
	}
	
</script>

<style lang="scss">
	.look{
		background-color:#fbf6ec ;
		padding-bottom: 40px;
		.name{
			text-align: center;
			font-size: 25px;
			height: 3rem;
			line-height: 3rem;
			color: white;
			background-color: #007bb1;
		}
		.title{
			text-align: center;
			font-size: 1rem;
			line-height: 3rem;
			font-weight: bold;
			height: 3rem;
		}
		.btn{
			display: flex;
			justify-content: space-around;
			.span{
				flex: auto;
				.a{
					display: inline-block;
					border: 1px solid #ece6da;
					box-sizing: border-box;
					text-align: center;
					width: 100%;
					height: 2rem;
					line-height: 2rem;
					color: green;
					background-color: #fef0e9;
				}
			}
			
		}
		.content{
			padding: 1rem;
			min-height:90vh;
			.content_text{
				display: block;
				margin-bottom: 10px;
			}
		} 
		.content{
			p{
				font-size: 1rem;
			}
		}
	}
</style>
