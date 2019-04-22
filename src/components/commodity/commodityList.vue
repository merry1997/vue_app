<template>
    <div class="commodityList">
        <mt-header title="商品列表">
            <router-link to="/" slot="left"><mt-button icon="back"></mt-button></router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <router-link :to="'/home/commodityList/commodityInfo/'+item.id" class="commodity-item" v-for="item in list" :key="item.id">
            <div class="imgBox">
                <img :src="item.imgUrl">
            </div>
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">&yen;{{ item.now }}</span>
                    <span class="old">&yen;{{ item.old }}</span>
                </p>
                <p class="sell">
                    <span>{{ item.hotSell ? "热卖中" : "贩卖中" }}</span>
                    <span>剩{{ item.Inventory }}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" plain @click.native="getMore" v-if="!end">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data () {
        return {
            list:[],
            page:1,
            end:false
        }
    },
    created () {
        this.getCommodityList();
    },
    methods: {
        getCommodityList(){
            this.$http.get("CommodityList?page="+this.page).then(result=>{
                if(result.body!="end") return this.list = result.body;
                else Toast("已全部加载"); this.end = true;
            });
        },
        getMore(){
            this.page++;
            this.getCommodityList();
        },
    }
}
</script>
<style lang="scss" scoped>
.commodityList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0 8px;
    background-color: rgb(250, 250, 250);
    .mint-header{
        width: 100%;
    }
    .commodity-item:nth-of-type(odd){
        margin: 8px 8px 0;
    }
    .commodity-item:nth-of-type(even){
        margin: 8px 8px 0 0;
    }
    .commodity-item{
        width: calc((100% - 24px) / 2);
        overflow: hidden;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: 0 0 5px 0.5px rgba(0, 0, 0, 0.1);
        .imgBox{
            width: 100%;
            height: 160px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .title{
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 5px 10px;
        }
        .info{
            p {
                margin: 0 5px;
                padding: 0 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 14px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                padding-bottom: 5px;
                span:nth-child(1){
                    border-radius: 4px;
                    padding: 0 2px;
                    color: rgb(184, 90, 90);
                    border: 1px solid rgb(184, 90, 90);
                }
            }
        }
    }
    .mint-button--danger{
        margin: 10px 10px 0;
    }
    .mint-button:after{
        background-color: red;
        color: #ef4f4f;
    }
}
</style>
