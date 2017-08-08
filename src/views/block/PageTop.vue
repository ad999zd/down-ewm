<template>
	<div id='pageTop'>
		<button @click="scaling" class="left_btn" :class="{left_showW:FshowBtn == true}"></button>
		<p>{{mes}}</p>
	</div>
</template>
<script>
export default {
	props:['FshowBtn'],
	data(){
		return {
			mes:""
		}
	},
	created(){
		// document.cookie="code=32b49299082fa5b5f79f8e6a452f1b7a";
		// document.cookie="appid=93";
	},
	mounted(){
		this.getlogInfoAjax();
	},
	methods: {
		scaling: function() {
			this.$emit('scaling');
		},
		getlogInfoAjax(){
			this.axios.get("/api/permission/log-info")
			.then((res)=>{
				console.log(res);
				if(res.data.code==0){
					this.mes = res.data.data;
				}else{
					console.log("permission/log-info is error");
				}
			})
		}
	}
}
</script>
<style lang="scss">
#pageTop{
position: absolute;
left: 0;
top: 0;
width: 100%;
min-width:1030px;
height: 52px;
background:#ffffff;
border-bottom:1px solid #eeeeee;
box-shadow:1px 0px 6px 0px rgba(0,0,0,0.20);
height:52px;
z-index:10;
.left_btn{
	margin: 0;
	padding:0;
	list-style-type: none;
	border-style: none;
	background: url('../../assets/images/block/pageleft_btn.png') no-repeat;
	background-size: 100%;
	width: 17px;
	height: 15px;
	margin: 18px 0  0 20px;
}
.left_showW{
	background: url('../../assets/images/block/pageleft_w.png') no-repeat;
	background-size: 100%;
}
p{
	float: right;
	line-height: 52px;
	padding-right: 30px;
	font-size:12px;
	color:#666666;
	box-sizing: border-box;
	span{
		margin-left: 6px;
	}
}
}

</style>
