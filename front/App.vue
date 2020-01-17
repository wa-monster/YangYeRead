<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	a{
		text-decoration: none;
		color: #808080;
	}
	h2{
		font-size: 16px;
	}
	p{
		a{
			color: #505050;
		}
		font-size: 12px;
	}
	.search-box{
		border: 1px  solid #C0C0C0;
		width: 90%;
		margin: 10px 5%;
		overflow: hidden;
		display: flex;
		.input-search{
			padding: 2% 5%;
			flex: 1 1 85%;
			font-size: 16px;
		}
		.btn-search{
			padding: 2% 5%;
			flex: 1 1 15%;
			text-align: center;
			color: $white;
			background-color: $blue;
		}
	}
</style>
