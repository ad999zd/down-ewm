<template>
	<div id="main">
		<ewm></ewm>
	</div>
</template>
<script>
import ewm from './putIn/putInPage.vue'
export default {
    components:{
        ewm
    },
	data(){
		return {
			
		}
	},

    created(){

    },
    methods:{

    }

}
</script>
<style lange="scss">
#app{
height: 100%;
min-width: 1200px;
}
#main{
width:100%;
height: 100%;
display:flex;
background:#f8f8f8;
}
#page-main{
min-width: 1030px;
width: 100%;
position:relative;
overflow: auto;
}
#page-left{
width:170px;
}
#page-set{
width: 100px;
height: 100%;
}
</style>
