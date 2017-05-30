<template lang="html">
<div class="bug-content">
    <v-about header-title="Bug反馈"></v-about>
    <div class="person-info">
        <div class="person-name">
            <span class="pic-title">昵称</span>
            <input class="input-info" type="text" v-model="title" placeholder="请输入标题">
        </div>
        <div class="person-name">
            <span class="pic-title">昵称</span>
            <input class="input-info" type="text" v-model="nickname" placeholder="请输入昵称">
        </div>
        <div class="person-email">
            <span class="pic-title">内容</span>
            <input class="input-info" type="text" v-model="info" placeholder="请输入bug内容">
        </div>
        <div class="person-summary">
            <span class="pic-title">邮箱</span>
            <input class="input-info" type="text" v-model="email" placeholder="请输入您的邮箱">
        </div>
        <div class="bug-submit-info" @click="createbug">提交</div>
    </div>
</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
export default {
    components: {
        vAbout
    },
    data () {
        return {
            'nickname': '',
            'info': '',
            'email': '',
            'title': ''
        }
    },
    methods: {
        createbug() {
            let obj = {
                author: this.nickname,
                content: this.info,
                email: this.email,
                title: this.title
            }
            this.$http.post('/api/bug_feedback', obj)
                .then((res)=>{
                    if(res.data.code===1){
                        this.$Message.info('反馈成功')
                    }else{
                        this.$Message.error('反馈失败')
                    }
                },(err)=> {
                    this.$Message.error('ERR')
                })
        }
    }
}
</script>

<style lang="less">
.input-info {
    border:none;
    outline:none;
}
.bug-submit-info {
    width: 100px;
    height:50px;
    margin-top: 50px;
    line-height: 50px;
    margin: 0 auto;
    color: #fff;
    background:#428DFF;
}
.bug-content {
    width: 100%;
    background: #fff;
    .person-info {
        width: 100%;
        background: #fff;
        .person-msg {
            background: #fff;
            width: 100%;
            padding: 0 20%;
            height: 80px;
            line-height: 80px;
            display: flex;
            justify-content: space-between;
            .person-edit {
                margin-top: 10px;
                line-height: 40px;
                color: #fff;
                background: #999;
                display: inline-block;
                width: 60px;
                height: 40px;
            }
            .person-submit {
                margin-top: 10px;
                line-height: 40px;
                color: #fff;
                background: #369BFF;
                display: inline-block;
                width: 60px;
                height: 40px;
            }
        }
        .person-name,.person-email,.person-summary {
            background: #fff;
            width: 100%;
            padding: 0 4%;
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #333;
            display: flex;
            font-size: 16px;
            justify-content: space-between;

        }
    
        .person-pic {
            font-size: 16px;
            background: #fff;
            width: 100%;
            padding: 0 4%;
            margin-top: 10px;
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            .pic-upload {

                margin-top: 10px;
                img {
                    width: 60px;
                    height: 60px;
                }
            }
        }
    }
}
</style>
