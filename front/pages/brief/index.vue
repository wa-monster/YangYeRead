<template>
	<view class="brief">
		<view class="search-box">
			<input class="input-search" type="text" v-model="searchKey" placeholder="输入关键词"><span class="btn-search" @click="search">搜索</span>
		</view>
		<view class="brief-content" v-if="isLoad">
			<view class="block">
				<view class="block_img2"><image class="img" :src="b.block_img2" border="0"  /></view>
				<view class="block_txt2">
					<p><navigator :hover-stay-time="50" :url="b.block_txt2.name[0]">{{b.block_txt2.name[1]}}</navigator></p>
					<p>{{b.block_txt2.author}}</p>
					<p>{{b.block_txt2.type}}</p>
					<p>{{b.block_txt2.status}}</p>
					<p>{{b.block_txt2.time}}</p>
					<p><navigator :hover-stay-time="50" :url="b.block_txt2.new[0]">{{b.block_txt2.new[1]}}</navigator></p>
				</view>
			</view>
			<view class="c_btn">
				<span class="margin_right  m_read"><navigator :hover-stay-time="50" class="btnblue" :url="m.alink">{{m.info}}</navigator></span>
				<span class="m_catlog"><navigator :hover-stay-time="50" class="btnblue" >不用管</navigator></span>
			</view>
			<view class="intro intro_brief">简介</view>
			<view class="intro_info info">{{i}}</view>
			<view class="intro notice-content">最新章节预览</view>
			<view class="chapter" >
			    <view class="li" v-for="(piece,index) in c" :key="index"><navigator :hover-stay-time="50" class="a" :hover-start-time="50" :url="piece.src">{{piece.name}}</navigator></view>
			</view>
		</view>
		<view class="catlog" v-if="isLoad">
			<!-- <view class="left"><navigator :hover-stay-time="50" :url="l.left">上一页</navigator></view> -->
			<xfl-select 
				:list="l.middleArr" 
				:initValue="l.middleArr[0].value" 
				:clearable="false"
				class="middle" 
				@change="changeSel" >
				<!-- <option v-for="(section,index) in l.middleArr " :key="index" :value="section.src">{{section.name}}</option> -->
			</xfl-select>
			<!-- <view  class="right"><navigator :hover-stay-time="50" :url="l.right">下一页</navigator></view> -->
		</view>
		<view class="bottom">
			<text>&copy;这里是简介页面噢</text>
		</view>
	</view>
</template>

<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	export default {
		data(){
			return {
				searchKey:'',
				id:'',
				b:{//基本信息
					block_txt2:{
						name:[],
						new:[]
					},
					block_img2:''
				},
				c:'',//章节
				i:'',//简介
				l:'',//分页
				m:'',//按钮
				sectionValue:'',
				isLoad:false,
			}
		},
		components:{
			xflSelect,
		},
		onLoad(option){
			this.id = option.id
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
					this.$xhr({
						url:`${this.$baseUrl}/book/${this.id}`,
						method:"get",
					}).then(res=>{
						console.log(res.data)
						this.b = res.data.b,
						this.c = res.data.c,
						this.i = res.data.i,
						this.l = res.data.l,
						this.m = res.data.m
						this.isLoad = true
						
					}).catch(err=>{
						throw err
					})
				})

			},
			changeSel(e){
				console.log(e)
				if(e.newVal !== e.oldVal){
					uni.navigateTo({
						url:e.orignItem.src
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.brief{
		padding-bottom: 20px;
	}
	.img{
		width: 80px;
		height: 100px;
	}
	.brief-content{
		.block{
			display: flex;
			.block_img2{
				width: $pic-width !important;
				// height: $pic-height  !important;
				flex:0 1 80px;
				margin: 10px;
				img{
					width: 100%;
				}
			}
			
		}
		.c_btn{
			display: flex;
			margin: 10px;
			.m_read{
				width: 7rem;
				height: 2rem;
				background-color: $blue;
				
				margin-right: 4rem;
				text-align: center;
				line-height: 2rem;
				.btnblue{
					color: $white;
				}
			}
			.m_catlog{
				width: 7rem;
				height: 2rem;
				background-color: $blue;
				text-align: center;
				line-height: 2rem;
				.btnblue{
					color: $white;
				}
			}
		}
		.info{
			text-indent: 2rem;
			margin: 10px;
		}
		.intro_brief{
			background-color: #322bf0;
			color: $white;
			padding:10px 0 10px 20px ;
		}
		.notice-content{
			background-color: #afb3bf;
			color: $white;
			padding:10px 0 10px 20px ;
		}
		.chapter{
			margin: 10px;
			padding-left: 0;
			// display: ;
			.li{
				list-style: none;
				border-bottom:2px solid rgba(0,0,0,0.3) ;
				padding-bottom: 10px;
				margin: 10px 10px;
				.a{
					display: inline-block;
					width: 100%;
				}
			}
		}
	}
	.catlog{
		padding:0 10px;
		display: flex;
		.left,.right{
			flex-basis: 3rem;
			flex-grow: 1;
			text-align: center;
			height: 2rem;
		}
		.middle{
			width: calc(100% - 6rem);
			height: 2rem;
			flex-grow: 1;
		}
	}
	.bottom{
		height: 10rem;
	}
</style>
