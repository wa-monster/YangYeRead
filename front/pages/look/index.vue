<template>
	<view class="look">
		<view class="name">
			<text id="_bqgmb_h1">{{name}}</text>
		</view>
		<view class="title" id="nr_title">{{title}}</view>
		<view class="btn">
			<view class="span" v-for="(item,index) in preAndNext" :key="index">
				<navigator :hover-stay-time="50" class="a" :url="item.src">{{item.text}}</navigator>
			</view>
		</view>
		<view id="nr" class="content" v-html="contentData">
				<!--  text class="content_text" v-for="(content,index) in contentData" :key="index" v-html="content"> 
				</text> -->
		</view>
		<view  class="btn">
			<view class="span" v-for="(item,index) in preAndNext" :key="index">
				<navigator :hover-stay-time="50" class="a" :url="item.src">{{item.text}}</navigator>
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
				contentData:'',
				name:'',
				preAndNext:'',
				title:''
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
						console.log(data)
						// let briefData = '<div class="block">' + res.data.b + '</div>' 
						
						this.contentData = data.nrArr
						this.preAndNext = data.nrPageData
						this.title = data.title
						this.name = data.name
						// this.ddd = res.data.l
					}).catch(err=>{
						throw err
					})
				})
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
