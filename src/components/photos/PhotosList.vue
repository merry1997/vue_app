<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0?'mui-active':'']" v-for="item in cates" :key="item.id" @click.prevent="getPhotoListById(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <ul class="photos-list">
            <router-link tag="li" v-for="item in imgList" :key="item.imgUrl" :to="'/home/photoInfo/' + item.id">
                <img v-lazy="item.imgUrl">
                <div class="info">
                    <p>{{ item.describe }}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
import mui from "./../../lib/mui/js/mui.min.js";
export default {
    data () {
        return {
            cates: [],
            imgList:[]
        }
    },
    created () {
        this.getAllCategory();
        this.getPhotoListById(0);
    },
    mounted () { // 当组件中的dom结构被渲染好并放到页面中的时候
        mui('.mui-scroll-wrapper').scroll({ deceleration: 0.0006 });
    },
    methods: {
        getAllCategory(){ // 获取所有的图片
            this.$http.get("AllCategory").then(result => {
                this.cates = result.body;
            });
        },
        getPhotoListById(cateId){
            // 根据分类id获取对应的图组
            this.$http.get("PhotoListById", {params: { id: cateId }}).then(result => {
                this.imgList = result.body;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    * { touch-action: pan-y; }
    .photos-list{
        list-style: none;
        padding: 15px 15px 0;
        margin: 0;
        li{
            position: relative;
            text-align: center;
            margin-bottom: 10px;
            background: #cccccc;
            border-radius: 8px;
            box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.5);
            img{
                border-radius: 8px;
                vertical-align: middle;
                width: 100%;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                width: 100%;
                position: absolute;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                border-bottom-right-radius: 8px;
                border-bottom-left-radius: 8px;
                max-height: 84px;
            }
            p{
                padding-top: 10px;
                color: #fff;
            }
        }
    }
</style>


