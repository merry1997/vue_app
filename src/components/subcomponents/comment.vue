<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论内容（最多吐槽100字）" maxlength="120" v-model="commentCon"></textarea>
        <mt-button type="primary" size="large" @click="postAComment">发表评论</mt-button>
        <div class="cmt-list" v-for="item in comments" :key="item.floor">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{ item.floor }}楼&nbsp;&nbsp;用户：{{ item.user }}&nbsp;&nbsp;发表时间：{{ item.addTime | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content != "" ? item.content : "这个人懒呀～什么都没有写" }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="more" v-if="isMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data () {
        return {
            pageIndex: 1,
            comments: [],
            commentCon: "",
            isMore: true
        }
    },
    created () {
        console.log(this.parent)
        this.getComment();
    },
    methods: {
        postAComment(){ // 追加评论
            if(this.commentCon.trim().length === 0) return Toast("您没有输入内容哦");
            this.$http.post("postAComment",{
                    id: this.id, // 新闻id
                    content: this.commentCon, // 评论内容
                    user: "王二", // 角色
                    parent: this.parent
                }).then(result => {
                    this.commentCon = "";
                    this.isMore = true;
                    this.getComment();
                    Toast("评论已发表");
            });
        },
        getComment(){ // 加载评论列表
            this.$http.get("getComment",{params: {id: this.id, pageIndex: this.pageIndex, parent: this.parent }}).then(result => {
                if(typeof(result.body)==="number"){
                    this.isMore = false;
                    this.pageIndex  = result.body;
                    return Toast("已经是最后一页啦");
                };
                this.comments = result.body;
            });
        },
        more(){ // 加载下一页
            if(this.isMore) this.pageIndex ++;
            this.getComment();
        }
    },
    props: ["id","parent"]
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{ font-size: 16px; }
    textarea{
        font-size: 14px;
        height: 90px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-title{
            font-weight: bold;
            font-size: 13px;
            line-height: 35px;
            background: #ccc;
        }
        .cmt-body{
            line-height: 35px;
            text-indent: 2em;
            font-size: 14px;
        }
    }
}

</style>
