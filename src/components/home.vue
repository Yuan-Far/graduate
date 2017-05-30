<template lang="html">
	<div class="home-page">
        <v-header></v-header>
        <div class="slide-pic">
            <Carousel autoplay v-model="value">
                <Carousel-item v-for="item in dataListFive">
                    <router-link :to="{ path: '/article/'+item.article_id }">
                        <div class="demo-carousel">
                            <img :src="item.pic" :alt="item.title">
                        </div>
                    </router-link>
                </Carousel-item>
            </Carousel>
        </div>
        
        <ul class="article-info-list">
            <li class="article-info" v-for="item in dataList">
                <div class="article-userinfo">
                    <router-link :to="{ path: '/userlist/' +user_id}">
                        <div class="article-author">
                            <span>{{item.author}}</span>
                        </div>
                    </router-link>
                    <div class="article-category">
                        <!-- <span> {{item.category}} </span> -->
                    </div>
                </div>
                <router-link :to="{ path: '/article/'+item.article_id }">
                    <div class="article-msg">
                        <div class="article-title">{{item.title}}</div>
                        <div class="article-summary">{{item.summary}}</div>
                        <div class="article-img"><img :src="item.pic" :alt="item.title"></div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import vHeader from './header.vue'
import jwt from 'jwt-decode'
export default {
    components: {
        vHeader
    },
    created() {
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id;
            this.username = userInfo.name;
        }else {
            this.user_id = '';
            this.username = '';
        }
        this.getArticleList()
        this.getArticleFive()
    },
    data(){
        return {
            value:0,
            dataListFive: [],
            dataList: [],
            title:'',
            user_id: ''
        }
    },
    methods: {
        // getCategoryTitle(){
            
        //     this.$http.get('/api/category_msg'+ category_id)
        //         .then((res)=>{
        //             if(res.status==200){
        //                 this.title = res.data.title

        //                 console.log(this.title)
        //             }else {
        //                 this.$Message.error('获取信息失败')
        //             }
        //         },(err)=>{
        //             this.$Message.error('获取信息失败')
        //             console.log(err)
        //         })
        // },
        getUserInfo() {
            const token = window.sessionStorage.getItem('Yuan-Token')
            // console.log(token)
            if(token !=null && token!='null'){
                const decode = jwt(token)
                console.log(decode)
                return decode;
            }else {
                return null
            }
        },
        getArticleList() {
            this.$http.get('/api/article_info')
                .then((res)=>{
                    if(res.status==200){
                        this.dataList = res.data
                        console.log(res.dataList)
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
        },
        getArticleFive() {
            this.$http.get('/api/article_five')
                .then((res)=>{
                    if(res.status==200){
                        this.dataListFive = res.data.data
                        // console.log(res.data)
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
    .home-page {
        width: 100%;
        background: #f1f1f1;
        .demo-carousel {
            height: 250px;
            img {
                height: 250px;
                width: 100%;
            }
        }
        .article-info-list {
            border-top: 2px solid #f1f1f1;
            background: #fff;
            .article-info {
                border-bottom: 10px solid #f1f1f1;
                padding: 0 5%;
                .article-userinfo {
                    padding-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    .article-author {
                        span {
                            color: #000;
                        }
                    }
                    .article-category {
                        span {
                            color: #fff;
                            display: inline-block;
                            min-width: 50px;
                            background: #333;
                            height:24px; 
                            padding: 0 2px;
                            line-height: 24px;
                        }
                    }
                }
                .article-msg {
                    .article-title {
                        display: flex;
                        justify-content: space-between;
                        font-size: 22px;
                        color: #000;
                    }
                    .article-summary {
                        display: flex;
                        justify-content: space-between;
                        color: #ddd;
                        font-size: 18px;
                        padding: 10px 0;
                    }
                    .article-img {
                        img{
                            width: 96%;
                            height: 250px;
                        }
                    }
                }
            }
        }
    }
</style>
