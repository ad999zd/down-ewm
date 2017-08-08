<template>
	<div id='littpageLeft'>
		<div class='logo'>
			<img src="../../assets/images/block/littlogo.png" alt="">
		</div>
		<div class='menu' >
            <template v-for='(item,index) in pageLeftDate' >
                <router-link :to="item.to">
                    <p @click='slideshow(index)' :class="{'onshow':index==i}">
                            <span class="menuicon">
                                <img v-bind:src="item.img" alt="">
                            </span>
                    </p>
                </router-link>
            </template>
		</div>
	</div>
</template>
<script>
import coupon from '../../assets/images/block/coupon.png';
import writoff from '../../assets/images/block/writeoff.png';
import stat from '../../assets/images/block/stat.png';
import charts from '../../assets/images/block/charts.png';
import member from '../../assets/images/block/member.png';
import middle from '../../middleView.js';
export default {
	// props:['FleftselectIndex'],
    components: {middle},
	data(){
		return {
			pageLeftDate:[],
			i:null,
			setSee:false,
			limitData:[],
		}
	},
	created(){
    	this.getLimitAjax();
    },
    mounted(){
    	middle.$on("indexnum",(s)=>{
            this.i = s;
        })
        middle.$on("setShownum",(d)=>{
            this.setSee = d;
            this.i = null
        })
    },
    methods:{
    	slideshow(i){
    		this.i=i
    		this.setSee = false
            middle.$emit("littInum",this.i);
    	},
    	clickSet(){
    		this.setSee = true
    		this.i = null
            middle.$emit("littSetShownum",this.setSee);
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
#littpageLeft{
width: 50px;
height: 100%;
background: #223033;

.logo{
	width: 100%;
	height: 52px;
	background-color: #fff;
	text-align: center;
	line-height: 52px;
	background-color: #00b3d5;
	img{
		width: 38px;
		height: 32px;
	}
}
.menu{
	width: 100%;
	margin-top: 10px;

	p{
		font-size:12px;
		color:#999999;
		letter-spacing:0px;
		text-align:left;
		height: 32px;
		line-height: 32px;
		padding-left: 14px;
		border-left: 3px solid #223033;
	}
	.menuicon{
		img{
			width: 16px;
			height: 16px;
			margin-right: 8px;
		}
	}
	
	p:hover{
		background-color:#2B3C40;
	}
}
.onshow{
	background-color:#3A5459;
	border-left: 3px solid #00b3d5!important;
}
}
</style>
