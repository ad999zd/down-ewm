<template>
    <div class="putin-type"  @click="HandleBody">
        <p class="type-title">请选择卡券投放方式：</p>
        <div class="put-type">
            <div class="type-box" :class="item.key==indexNum?'addborder':''" v-for="item in titleData" @click="putInBox(item.key)">
                <div class="choose-radio">
                    <input name="shoplis" type="radio" :checked="item.key==indexNum">
                    <label class="lab">
                        <div></div>
                    </label>
                </div>
                <div class="choose-text">
                    <p class="tit">{{item.value}}</p>
                    <p class="text">{{item.description}}</p>
                </div>
            </div>
            <div id="couponscodesqr" class="content mt20" style="display:none"></div>
            <div id="shopcodesqr" class="content mt20" style="display:none"></div>
        </div>
        <div class="btn-box">
            <div class="cancel">取消</div>
            <div class="next">下一步</div>
        </div>
        <chooseShop :FaddShopShow="chooseShop" @shopSee="isSee" @checkShop="checkshopList"></chooseShop>
    </div>
</template>
<script>
import chooseShop from './chooseshop.vue';
import jszip from '../../assets/js/jszip.js';
import fileSaver from '../../assets/js/FileSaver.js';
import $ from 'jquery';
import qrcode from 'jquery-qrcode';
import qs from 'qs';
export default {
    components: {chooseShop},
    data(){
        return {
            titleData:[
                {
                    value: "下载二维码",
                    description: "下载优惠券二维码，通过打印张贴或者其他渠道发放，该二维码365天内（20180808前）有效，过期将无法使用；", 
                    key: 2
                },

                {
                    description:"分门店制作领取优惠券的二维码，方便统计各门店领取效果，通过打印张贴或者其他渠道发放，该二维码365天内（20180808前）有效；",
                    key:3,
                    value:"门店二维码"
                },
                ],
            indexNum:1,
            chooseShop:false,
            couponsUrlDatas:{},
            shopUrlDatas:[],
            putInId:null,
            putInTitle:"",

        }
    },

    created(){
        
    },
    mounted() {
        this.putInId = this.$route.query.id;
    },
    methods:{
        HandleBody(e){
            let strName = e.target.getAttribute('class');
        },
        putInBox(val){
            this.indexNum = val;
            if(val==3){
                this.chooseShop = true;
            }
            if(val==2){
                // this.getSaveAjax(this.putInId,2,"");
                this.getAjax(2);
            }
        },
        isSee(){
            this.chooseShop = false;
        },
        checkshopList(val){
            // this.getSaveAjax(this.putInId,3,val);
            this.getAjax(3);
        },
        /***************/
        couponsCreatqr:function(){
            $('#couponscodesqr').qrcode({width: 200, height: 200, text:this.couponsUrlDatas.qrcode_url});
        },
        shopCreatqr:function(){
            this.shopUrlDatas.forEach((item,i)=>{
                $('#shopcodesqr').qrcode({width: 200, height: 200, text:item.qrcode_url});
            })
        },
        exportCanvasAsPNG:function(canvas, fileName){
            var MIME_TYPE = "image/png";
            var dlLink = document.createElement('a');
            dlLink.download = fileName;
            dlLink.href = canvas.toDataURL("image/png");
            dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.href].join(':');
            document.body.appendChild(dlLink);
            dlLink.click();
            document.body.removeChild(dlLink);
        },
        convertCanvasToImage:function(canvas){
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return canvas.toDataURL().replace('data:image/png;base64,', '');
        },
        // getSaveAjax:function(id,type,content){
        //     let ewmData = qs.stringify({
        //         "template_id":91,
        //         "batch_type":type,
        //         "batch_content":content
        //     })
        //     this.axios.post("/api/batch/save",ewmData)
        //     .then((res)=>{
        //         // console.info("save",res);
        //         if(res.data.code==0){
                    
        //             if(type==2){
        //                 $("#couponscodesqr").html("");
        //                 this.couponsUrlDatas = res.data.data;
        //                 this.couponsCreatqr();
        //                 this.exportCanvasAsPNG($("#couponscodesqr").find("canvas")[0],this.couponsUrlDatas.qrcode_filename);    
        //             }
        //             if(type==3){
        //                 $("#shopcodesqr").html("");
        //                 this.shopUrlDatas = res.data.data.qrcode;
        //                 this.shopCreatqr();
        //                 let img=[];
        //                 let dom = $("#shopcodesqr").find("canvas");
        //                 dom.map((tip,i)=>{
        //                     img.push(this.convertCanvasToImage(dom[tip]));
        //                 })
        //                 let zip = new JSZip();
        //                 this.shopUrlDatas.map((flag,i)=>{
        //                     zip.file(flag.qrcode_filename+".png",img[i],{base64: true})
        //                 })
        //                 zip.generateAsync({type: "blob"})
        //                     .then((content)=> {
        //                         fileSaver(content, res.data.data.zip_filename+".zip");
        //                     });
        //             }
        //         }else{
        //             alert("下载失败");
        //             console.log("batch/init is error");
        //         }
        //     })
        // },
        getAjax(type){
            if(type==2){
                $("#couponscodesqr").html("");
                this.couponsUrlDatas = {
                    qrcode_filename:"csun-bc-20170808",
                    qrcode_url:"http://wx.kudipets.com/slark/coupon/gets?batch_code=CODE59893A72AF28B&store_id=&valid_day=365&timestamp=1502165618&batch_type=2"
                };
                this.couponsCreatqr();
                this.exportCanvasAsPNG($("#couponscodesqr").find("canvas")[0],this.couponsUrlDatas.qrcode_filename);
            }
            if(type==3){
                $("#shopcodesqr").html("");
                this.shopUrlDatas = [
                    {
                        qrcode_filename:"酷迪珠江医院-307832574",
                        qrcode_url:"http://wx.kudipets.com/slark/coupon/gets?batch_code=CODE59893C30CDE4C&store_id=307832574&valid_day=365&timestamp=1502166064&batch_type=3",
                        store_id:"307832574"
                    },
                    {
                        qrcode_filename:"酷迪珠江帝景宠物店-A00002",
                        qrcode_url:"http://wx.kudipets.com/slark/coupon/gets?batch_code=CODE59893C30CDE4C&store_id=A00002&valid_day=365&timestamp=1502166064&batch_type=3",
                        store_id:"A00002"
                    }
                ];
                let zip_name = "csun-bc-20170808"
                this.shopCreatqr();
                let img=[];
                let dom = $("#shopcodesqr").find("canvas");
                dom.map((tip,i)=>{
                    img.push(this.convertCanvasToImage(dom[tip]));
                })
                let zip = new JSZip();
                this.shopUrlDatas.map((flag,i)=>{
                    zip.file(flag.qrcode_filename+".png",img[i],{base64: true})
                })
                zip.generateAsync({type: "blob"})
                    .then((content)=> {
                        fileSaver(content, zip_name+".zip");
                    });
            }
        }

    }

}
</script>

<style lang="scss" scoped>
$mcolor: #00B3D5;
$mline: #ddd;
$fff: #fff;
$fontcolor: #333;
$fontsize: 12px;
    .putin-type{
        width: 100%;
        height:inherit;
        margin-top:20px;
        .type-title{
            font-size:12px;
            color:#666666;
        }
        .put-type{
            width: 100%;
            margin-top:30px;
            padding-bottom:30px;
            border-bottom:1px solid #ddd;
            height:inherit;
            overflow:auto;
            .type-box{
                width:450px;
                border: 1px solid #ddd;
                padding: 15px;
                margin:0 auto;
                margin-bottom:15px;
                box-sizing:border-box;
                display:flex;
                align-items:center;
                border-radius:2px;
            }
            .type-box:hover{
                border:1px solid #00b3d5;
            }
            .addborder{
                border:1px solid #00b3d5;
            }
            .choose-text,
            .choose-radio{
                display:inline-block;
            }
            .choose-radio{
                width: 35px;
                line-height:10px;
                input[type="radio"]{
                    position: relative;
                    z-index: 2;
                    left:8px;
                    padding-left:10px;
                    -webkit-appearance:normal;
                }
                input[type="radio"]+.lab{
                    display: inline-block;
                    position:relative;
                    margin: 0;
                    left: -8px;
                    top: -1px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    z-index: 1;
                }
                input[type="radio"]:checked+.lab{
                    border:1px solid #00b3d5;
                    div{
                        width: 6px;
                        height: 6px;
                        border-radius: 3px;
                        background-color: #00b3d5;
                        margin:0 auto;
                        margin-top: 2px;
                    }
                }
                input[type="radio"]:checked{
                    opacity: 0;
                }
            }
            .choose-text{
                width:385px;
                .tit{
                    margin-bottom:10px;
                    font-size:12px;
                    color:#666666;
                }
                .text{
                    font-size:12px;
                    color:#999999;
                }
            }
        }
        .btn-box{
            float: right;
            margin-top:20px;
            div{
                display:inline-block;
                border-radius:2px;
                width:70px;
                height:24px;
                line-height:24px;
                text-align:center;
                cursor: pointer;
            }
            .cancel{
                border:1px solid #dddddd;
                margin-right:20px;
                font-size:12px;
                color:#999999;
            }
            .next{
                background:#00b3d5;
                border:1px solid #00b3d5;
                font-size:12px;
                color:#ffffff;
            }
            .next:hover{
                background:#34c5e0;
                border:1px solid #34c5e0;
            }
            .cancel:hover{
                background:#f4f4f4;
            }
        }
    }
.put-type::-webkit-scrollbar{
    background-color: rgba(121,121,121,0.1);
    width:8px;
    border-radius: 5px;
}
.put-type::-webkit-scrollbar-thumb {
    background-color:rgba(0,0,0,0.2);
    width:10px;
    border-radius: 5px
}
</style>
