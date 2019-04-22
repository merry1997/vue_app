<template>
    <div class="photoinfo-container">
        <h3 class="title">{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <template>
            <vue-preview :slides="thumbs" @close="handleClose"></vue-preview>
        </template>
        <!-- 图片内容区 -->
        <div class="content" v-html="photoInfo.content"></div>
        <!-- 评论组件 -->
        <comment :id="id" :parent="parent" ></comment>
    </div>
</template>
<script>
// 导入评论子组件
import comment from "./../subcomponents/comment.vue";
export default {
    data () {
        return {
            id: this.$route.params.id,
            photoInfo: [],
            thumbs:[], // 略缩图数组
            parent: this.$route.matched[0].path
        }
    },
    created () {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo(){
            // 获取图片详情的页面
            this.$http.get("PhotoInfo",{params:{ id: this.id }}).then(result => {
                this.photoInfo = result.body[0];
            });
        },
        getThumbs(){
            // 获取略图
            this.$http.get("Thumbs",{params:{ id: this.id }}).then(result => {
                this.thumbs = result.body;
            });
        },
        handleClose () {
            console.log('监听关闭预览');
        }
    },
    components: {
        comment
    }
}
</script>

<style lang="scss">
.photoinfo-container{
    padding: 0 15px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: #26a2ff;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    figure{
        text-align: center;
        img{
            width: 100%;
            border-radius: 5px;
            box-shadow: 0 0 10px 0 rgba( 0, 0, 0, 0.5)
        }
    }
    .content{
        text-indent: 2em;
    }
}
</style>

