<template>
    <div class="put-in">
        <div class='create-box'>
            <div class="create-title">
               <p class='create-tit'>投放卡券</p>
            </div>
            <div class='main-box'>
                <div class="putIn-title">
                    <p class="put-tit">当前投放的卡券是：</p>
                    <p class="put-name">卡券</p>
                </div>
                <div class="putIn-type">
                    <putInType></putInType>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import putInType from './putInType.vue';
import middle from '../../middleView.js';
export default {
    components: {putInType},
    data(){
        return {

        }
    },

    created(){

    },
    mounted() {

    },
    methods:{

    }

}
</script>

<style lang="scss" scoped>
$mcolor: #00B3D5;
$mline: #ddd;
$fff: #fff;
$fontcolor: #333;
$fontsize: 12px;
    .put-in{
        padding:72px 20px 10px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .create-box{
        height: inherit;
        background: $fff;
        border:1px solid $mline;
        border-radius:4px;
        position: relative;
        overflow: hidden;
        .create-title{
            height: 50px;
            width: 100%;
            border-bottom: 1px solid $mline;
            padding-left: 20px;
            box-sizing: border-box;
            line-height:50px;
            .create-tit{
                height: 50px;
                float: left;
                margin-right: 30px;
                font-size: 14px;
                color:$fontcolor;
                line-height: 50px;
                text-align: center;
            }
        }
        .main-box{
            padding:20px;
            box-sizing: border-box;
            width: 100%;
            height: calc(100% - 55px);
           .putIn-title{
                p{
                    display:inline-block;
                }
                .put-tit{
                    font-size:12px;
                    color:#999999;
                }
                .put-name{
                    font-size:16px;
                    color:#666666;
                }
           }
           .putIn-type{
            height:inherit;
           }
        }
    }
</style>
