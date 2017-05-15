<template lang="html">
<div class="article">
    <!-- <v-header></v-header> -->
    <v-about header-title="我的文章"></v-about>
    <router-link to="/addArticle">
        <div class="article-create">
            <i class="ivu-icon ivu-icon-plus"></i>
        </div>
    </router-link>
    <div class="article-list-info">
        <ul>
            <li class="list-article">
                <div class="article-list-left">
                    <p class="article-title">test document</p>
                </div>
                <div class="article-list-right">
                    <!-- <img :src="item.pic" :alt="item.title"> -->
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
import vHeader from '../header.vue'
export default {
    components: {
        vAbout,
        vHeader
    },
    data() {
        return {
            dataList: []
        }
    }
}
</script>

<style lang="less">
.article-create {
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    background: #6DACF4;
    box-shadow: 4px 4px 4px rgba(0,0,0,.4);
    i {
        color: #fff;
        line-height: 60px;
        font-size: 32px;
        // box-shadow: 2px 2px 2px rgba(0,0,0,.4);
    }
}
</style>
