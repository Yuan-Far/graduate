<template lang="html">
	<div class="person-info">
        <v-about header-title="个人中心"></v-about> 
        <div class="person-pic">
            <span class="pic-title">头像</span>
            <div class="pic-upload">
                <img src="../../assets/images/ico.png">
            </div>
        </div>
        <div class="person-name">
            <span class="pic-title">昵称</span>
            <div class="pic-upload">
                Yuan
            </div>
        </div>
        <div class="person-email">
            <span class="pic-title">邮箱</span>
            <div class="pic-upload">
                511865614@qq.com
            </div>
        </div>
        <div class="person-summary">
            <span class="pic-title">简介</span>
            <div class="pic-upload">
                但是分开卖但是看了发的思考了JFK lads就
            </div>
        </div>
        <div class="person-msg">
            <div class="person-edit">编辑</div>
            <div class="person-submit">提交</div>
        </div>
	</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
export default {
    components: {
        vAbout
    }
}
</script>

<style lang="less">
.person-info {
    width: 100%;
    background: #f1f1f1;
    .person-msg {
        background: #fff;
        width: 100%;
        padding: 0 20%;
        height: 60px;
        line-height: 60px;
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
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #333;
        display: flex;
        justify-content: space-between;
    }
    .person-pic {
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
</style>
