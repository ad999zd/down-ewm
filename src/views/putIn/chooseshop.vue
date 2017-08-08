
<template>
	<div class="choose-shop">
		<!-- 店铺分配 -->
        <ModalsCoupon class='protAllo' title="选择门店" :show="IsShow" :showOk="true" :fade="true" @ok="HandleOk" @cancel="HandleClose" okText="保存" cancelText="取消" :middleNum="'80px auto'">
            <div class="deletepart-modal-body">
                <input class='alloInput' type="text" placeholder="请搜索门店名称" v-model="searchVal">
                <p class="result">为您查询到<span v-if="shopData">{{shopData.length}}</span>条结果</p>
                <table border="1" class='allocationTable'>
                    <thead>
                        <tr>
                            <td>
                                <input type="checkbox" v-model="selectArr1" class="allCheckbox" @click="selectAlls" id='all'>
                                <label for="all" class="allCheckLabel"></label>
                            </td>
                            <td class="shopname">门店名称</td>
                            <td class="shopaddr">地址</td>
                        </tr>
                    </thead>
                    <tbody class="scroll-body">
                        <tr class="usertr" v-for="(item,index) in shopData">
                            <td>
                                <input type="checkbox" :id="'list_'+index" class="check-li" @click='singleCheck(item.shop_id,index,item)' :checked="shopChecked[index]">
                                <label :for="'list_'+index" class="check-li check-label"></label>
                            </td>
                            <td class="shopname">{{item.shop_name}}</td>
                            <td class="shopaddr">{{item.shop_address}}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="shopData=='' " class="searchNoData">暂无查询数据</p>
            </div>
        </ModalsCoupon>
	</div>
</template>

<script>
import ModalsCoupon from '../../components/ModalsCoupon.vue'
export default {
    components:{ModalsCoupon},
    props:["FaddShopShow"],
    data(){
        return {
            IsShow:false,
            selectArr: [], //分配用户弹窗checked选中
            selectArr1:false,
            allUserNum: 100,
            shopData:[
                {
                    brand_id:"4",
                    brand_name:"高立维",
                    shop_address:"北京市 北京 ",
                    shop_id:"307832574",
                    shop_name:"酷迪珠江医院"
                },
                {
                    brand_id:"4",
                    brand_name:"高立维",
                    shop_address:"北京市 北京 ",
                    shop_id:"A00002",
                    shop_name:"酷迪珠江帝景宠物店"
                }
            ] ,
            selectArrData:[],
            shopChecked:[],
            limitShopList:[],
            allShopData:[],
            searchVal:"",
        }
    },
    watch:{
        FaddShopShow(){
            this.IsShow = this.FaddShopShow
        },
        searchVal(val){
            let allshopName = []
            let searchData = []
            this.shopChecked.map((flag,i)=>{
                this.shopChecked[i]= 0;
            })
            this.selectArrData=[];
            this.limitShopList=[];
            this.allShopData.map((item,i)=>{
                allshopName.push(item.shop_name);
            })
            allshopName.forEach((tip,index)=>{
                if(tip.indexOf(val)!=-1){
                    searchData.push(this.allShopData[index]);
                }
            })
            this.shopData = searchData;
        }
    },
    created(){

    },
    mounted() {
        // this.getStatusAjax();
    },
    methods:{
        HandleOk(){
            this.$emit("checkShop",this.selectArrData);
            this.IsShow = false;
            this.$emit("shopSee",false);
        },
        HandleClose(){
            this.IsShow = false;
            this.$emit("shopSee",false);
        },
        selectAlls(event){
            // let _this = this;
            if (!event.target.checked) {
                this.shopData.forEach((item, i)=> {
                    this.shopChecked[i]=0
                });
                //console.log(this.shopChecked);
            } else { //实现全选
                this.shopData.forEach((item, i)=> {
                    this.shopChecked[i]=1
                    if(Array.indexOf(this.selectArrData,item.shop_id)==-1){
                        this.selectArrData.push(item.shop_id);
                        this.limitShopList.push(item);
                    }
                });
                //console.log(this.shopChecked)
            }
             // console.log(this.selectArrData);
        },
        singleCheck(id,i,item){
            this.shopChecked[i]==0?this.shopChecked[i]=1:this.shopChecked[i]=0
            //console.log(this.shopChecked);
            Array.indexOf(this.shopChecked,0)==-1?this.selectArr1 = true:this.selectArr1 = false;

            if(this.selectArrData ==""){
                this.selectArrData.push(id);
                this.limitShopList.push(item);
            }else{
                if(Array.indexOf(this.selectArrData,id)==-1){
                    this.selectArrData.push(id);
                    this.limitShopList.push(item);
                }else{
                    this.selectArrData.splice(Array.indexOf(this.selectArrData,id),1);
                    this.limitShopList.splice(Array.indexOf(this.selectArrData,id),1);
                }
            }
             // console.log(this.selectArrData);
        },
        // getStatusAjax:function(){
        //     this.axios.get('/api/shop/list')
        //     .then((res)=>{
        //         // console.log(res);
        //         if(res.data.code==0){
        //             this.shopData = res.data.data;
        //             this.allShopData = res.data.data;
        //             this.shopData.forEach((item,i)=>{
        //                 this.shopChecked.push(0)
        //             })
        //         }else{
        //             console.log("template/kit is error")
        //         }
        //     })
        // }
    }

}
</script>

<style lang="scss" scoped>
	.choose-shop{
       
	}
    /* 选择门店 */
.alloInput{
    background:#ffffff;
    border:1px solid #eeeeee;
    border-radius:2px;
    width:338px;
    height:22px;
    font-size:12px;
    padding-left: 30px;
    margin: 10px 0;
    background:url('../../assets/images/block/search.png') no-repeat;
    background-size: 16px 16px;
    background-position: 10px 3px;
}
.result{
    float: right;
    margin-top: 15px;
    color: #999;
    font-size: 12px;
    span{
        color:#666;
        font-weight: 600;
    }
}
.searchNoData{
    text-align: center;
    margin-top: 40px;
}
.allocationTable{
    display:inline-block;
    border:none;
    width: 620px;
    border-collapse:collapse;
    tr{
        height: 30px; 
        td{
            border:1px solid #eee;
        }
    }
    thead{
        tr{
            background-color: #f8f8f8;
        }
    }
    tbody,
    thead{
        display:block;
        td:first-child{
            width: 40px;
            text-align:center;
            padding:0
        }
        td{
            padding-left:35px;
        }
        .shopname{
            width:234px;
        }
        .shopaddr{
            width:270px;
        }
    }
    tbody{
        max-height:296px;
        overflow:auto;
    }
    input[type="checkbox"]{
        display: none;
    }
    label{
        position: relative;
        padding-left:20px;
    }
    label:before{
        content:'';
        position: absolute;
        left:2px;
        top:1px;
        width:12px;
        height: 12px;
        border:1px solid #ddd;
    }
    input:checked+label:before{
        content:'\2713';
        font-size:12px;
        text-align: center;
        color:#fff;
        line-height: 12px;
        background:#00b3d5;
    }
}
.scroll-body::-webkit-scrollbar{
    background-color: rgba(121,121,121,0.1);
    width:8px;
    border-radius: 5px;
}
.scroll-body::-webkit-scrollbar-thumb {
    background-color:rgba(0,0,0,0.2);
    width:10px;
    border-radius: 5px
}
</style>