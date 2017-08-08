<template>
	<div id='pageLeft'>
		<div class='logo'>
			<img src="../../assets/images/block/logo.png" alt="">
		</div>
		<div class='menu'>
			<ul v-for='(item,index) in pageLeftDate' class="ulone">
				<li class="oneli" @click='slideshow(index)' :class="{'onshow':index==i}">
					<router-link :to='item.to'><span class="menuicon"><img v-bind:src="item.img" alt=""></span><span class="name">{{item.name}}</span></router-link>
					<span v-if='item.group' class="downarrow" :class="{'uparrow':index==k}"></span>
				</li>
				<ul class='ultwo'>
					<li v-for='flag in item.group' class="twoli" v-show='index==k'>
						<router-link to="/pet"></span>{{flag.ername}}</router-link>
					</li>
				</ul>
			</ul>
		</div>
	</div>
</template>
<script>
import middle from '../../middleView.js';
export default {
	components: {middle},
	data(){
		return {
			pageLeftDate:[],
			i:null,
			k:null,
			setSee:false,
			limitData:[],
		}
	},
	created(){
    	this.getLimitAjax();
    },
    mounted(){
    	/*左侧导航栏数据*/
        middle.$on("littInum",(m)=>{
            // console.log(m);
            this.i = m;
            this.setSee = false;
        })
        middle.$on("littSetShownum",(n)=>{
            // console.log(n);
            this.setSee = n;
            this.i = null;
            this.k = null;
        })
    },
    methods:{
    	slideshow(i){
    		if (this.k==i) {
    			this.k=null
    		} else {
    			this.k=i
    			this.i=i
    		}
    		this.setSee = false
    		middle.$emit("indexnum",this.i);
    	},
    	clickSet(){
    		this.setSee = true
    		this.i = null
    		middle.$emit("setShownum",this.setSee);
    	},
    	getUrlAjax:function(index){
    		if(this.limitData.includes(index)==true){
	    		this.pageLeftDate.push(this.$store.state.left_list[index]);
	    	}
    	},
    	getLimitAjax:function(){
            this.axios.get("/api/permission/index")
            .then((res)=>{
                // console.log(res);
                if(res.data.code==0){
                    this.limitData=res.data.data;
                    let coupon_pagenum = this.$store.state.limit_btn.page_coupon;
			    	let stat_pagenum = this.$store.state.limit_btn.page_stat;
			    	let member_pagenum = this.$store.state.limit_btn.page_member;
			    	let writeoff_pagenum = this.$store.state.limit_btn.page_writeoff;
			    	let trend_pagenum = this.$store.state.limit_btn.page_trend;

			    	this.getUrlAjax(coupon_pagenum);
			    	this.getUrlAjax(member_pagenum);
			    	this.getUrlAjax(writeoff_pagenum);
			    	this.getUrlAjax(trend_pagenum);
			    	this.getUrlAjax(stat_pagenum);
                }else{
                    console.log("permission/index is error");
                }
            })
        }
    }
}

</script>
<style lang="scss">
body,html{
height: 100%;
}
#pageLeft{
width: 170px;
height: 100%;
background:#223033;

.logo{
	width: 100%;
	height: 52px;
	background-color: #fff;
	text-align: center;
	line-height: 52px;
	background-color: #00b3d5;
	img{
		width: 110px;
		height: 28px;
	}
}
.menu{
	width: 100%;
	margin-top: 10px;
	.ulone{
		font-size:12px;

		letter-spacing:0px;
		text-align:left;
		box-sizing:border-box;
		.oneli{
			height: 32px;
			line-height: 32px;
			padding-left: 14px;
			position: relative;
			border-left: 3px solid #223033;
		}
		a{
			color:#8EB0B6;
			display: block;
		}
	}
	.menuicon{

		img{
			width: 16px;
			height: 16px;
			margin-right: 8px;
			box-sizing:border-box;
		}
	}
	.name{
		vertical-align: middle;
	}
	.downarrow{
		position: absolute;
		right: 20px;
		top:12px;
		display: inline-block;
		width: 9px;
		height: 6px;
		background:url('../../assets/images/block/downarrow.png') no-repeat;
		background-size: 100%;
	}
	.ultwo{
		font-size:12px;
		letter-spacing:0px;
		text-align:left;
		box-sizing:border-box;
		.twoli{
			height: 32px;
			line-height: 32px;
			padding-left: 51px;
		}
		a{
			color:#8EB0B6;
		}
	}
	li:hover{
		background-color:#2B3C40;
	}
}
.onshow{
	background-color:#3A5459;
	border-left: 3px solid #00b3d5 !important;
	.downarrow{
		position: absolute;
		right: 20px;
		top:12px;
		display: inline-block;
		width: 9px;
		height: 6px;
		background:url('../../assets/images/block/downarrow.png') no-repeat;
		background-size: 100%;
	}
	.uparrow{
		position: absolute;
		right: 20px;
		top:12px;
		display: inline-block;
		width: 9px;
		height: 6px;
		background:url('../../assets/images/block/uparrow.png') no-repeat;
		background-size: 100%;
	}
}
}
</style>
