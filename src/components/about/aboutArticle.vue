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
            <li class="list-article" v-for="item in dataList">
                <router-link :to="{ path: '/article/'+item.article_id }">
                    <div class="article-list-left">
                        <p class="article-time">{{item.create_time}}</p>
                        <h3>{{item.title}}</h3>
                    </div>
                </router-link>
            </li>
            <p>--end--</p>
        </ul>
    </div>
</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
import vHeader from '../header.vue'
import jwt from 'jwt-decode'
export default {
    components: {
        vAbout,
        vHeader
    },
    created() {
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id;
            this.username = userInfo.name
        }else {
            this.user_id = '';
            this.username = '';
        }
        this.getArticleList()
    },
    data() {
        return {
            user_id:'',
            dataList: []
        }
    },
    methods:{
        getUserInfo() {
            const token = window.sessionStorage.getItem('Yuan-Token')
            // console.log(token)
            if(token !=null && token!='null'){
                const decode = jwt(token);
                // console.log(decode)
                return decode;
            }else {
                return null
            }
        },
         getArticleList() {
            let obj = {
                user_id: this.user_id
            }
            this.$http.get('/api/article_user/'+obj.user_id)
                .then((res)=>{
                    if(res.status==200){
                        this.dataList = res.data.result
                        // console.log(this.dataList)
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
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
.list-article {
    height: 100px;
    border-bottom:1px solid #eee;
    display: flex;
    align-item:center;
    .article-list-left {
        margin: 20px;
        p{
            color:#999;
        }
        h3{
            color: #000;
        }
    }
}
</style>
