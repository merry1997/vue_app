<template>
    <div id="commodityInfo">
        <mt-header title="商品详情">
            <router-link to="/home/commodityList" slot="left"><mt-button icon="back"></mt-button></router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <figure>
            <img :src="info.imgUrl" class="mainDiagram">
        </figure>
        <h3 class="title">{{ info.title }}</h3>
        <p class="details">{{ info.Details }}</p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: this.$route.params.id,
            info: {}
        }
    },
    created () {
        console.log(this.id);
        this.getCommodityInfo();
    },
    methods: {
        getCommodityInfo(){
            this.$http.get("CommodityInfo",{ params: { id: this.id } }).then(result => {
                this.info = result.body;
                console.log(result.body)
            })
        },
    }
}
</script>
<style lang="scss" scoped>
#commodityInfo{
    figure{
        margin: 0px;
    }
    .mainDiagram{
        width: 100%;
    }
    .title,.details{
        text-indent: 2em;
    }
    button:enabled:active{
        background-color: transparent;
        opacity: 0.5;
    }
}
</style>

