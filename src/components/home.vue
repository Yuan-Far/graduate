<template lang="html">
	<div class="home-page">
        <v-header></v-header>
        <div class="slide-pic">
            <Carousel autoplay v-model="value">
                <Carousel-item>
                    <div class="demo-carousel">
                        <img src="../assets/images/1.jpg" alt="">
                    </div>
                </Carousel-item>
                <Carousel-item>
                    <div class="demo-carousel">
                        <img src="../assets/images/2.jpg" alt="">
                    </div>
                </Carousel-item>
                <Carousel-item>
                    <div class="demo-carousel">
                        <img src="../assets/images/3.jpg" alt="">
                    </div>
                </Carousel-item>
                <Carousel-item>
                    <div class="demo-carousel">
                        <img src="../assets/images/4.jpg" alt="">
                    </div>
                </Carousel-item>
            </Carousel>
        </div>
        
        <ul class="article-info-list">
            <li class="article-info" v-for="item in dataList">
                <router-link to="/article">
                    <div class="article-userinfo">
                        <div class="article-author">
                            <span>{{item.author}}</span>
                        </div>
                        <div class="article-category">
                            <span> {{item.category}} </span>
                        </div>
                    </div>
                    <div class="article-msg">
                        <div class="article-title">{{item.title}}</div>
                        <div class="article-summary">{{item.summary}}</div>
                        <div class="article-img"><img src="../assets/images/code_icon.png" :alt="item.title"></div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import vHeader from './header.vue'
export default {
    components: {
        vHeader
    },
    data(){
        return {
            value:0,
            dataList: [
                {
                    'title': "这是一个标题",
                    'summary': "这是一段简介",
                    'author': "Yuan",
                    'category': "Code",
                    'pic': "assets/images/code_icon.png",
                },
                {
                    'title': "这是一个标题",
                    'summary': "这是一段简介",
                    'author': "Yuan",
                    'category': "Code",
                    'pic': "../conf-test/src/assets/images/code_icon.png",
                }
            ]
        }
    },
    methods: {}
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
