<template lang="html">
    <div class="category-page">
        <v-header></v-header>
        <v-about header-title="热门列表"></v-about>
        <ul class="category-info-list">
            <li class="category-info" >
                <Card style="width:350px">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        热门文章
                    </p>
                    <a href="#" slot="extra" @click.prevent="changeLimit">
                        <Icon type="ios-loop-strong"></Icon>
                        换一换
                    </a>
                        <ul class="sort-content">
                            <li class="sort-list" v-for="item in dataListInfo">
                                <router-link :to="{ path: '/article/'+item.article_id }">
                                    <div class="sort-hack">
                                        <div class="sort-msg">
                                            <span>{{item.title}}</span>
                                            <p>{{item.summary}}</p>
                                            <!-- <div class="sort-other">
                                                <span>{{dataList.title}}</span>
                                                <span>{{item.create_time}}</span>
                                            </div> -->
                                        </div>
                                        <div> </div>
                                        <div class="sort-img"><img :src="item.pic" :alt="item.title"></div>
                                        
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                </Card>
            </li>
            <li class="category-info" >
                <Card style="width:350px">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        最新文集
                    </p>
                    <a href="#" slot="extra" @click.prevent.self="changeLimit">
                        <Icon type="ios-loop-strong"></Icon>
                        换一换
                    </a>
                    <ul>
                        <li class="film-list" v-for="item in dataList">
                            <div class="film-left">
                                <img :src="item.pic" alt="">
                            </div>
                            <div class="film-right">
                                <span>{{ item.title }}</span>
                            </div>
                           <!--  <Card style="width:320px">
                                <div style="text-align:center">
                                    <img :src="item.pic">
                                    <h3>{{item.title}}</h3> 
                                </div>
                            </Card> -->
                        </li>
                    </ul>
                </Card>
            </li>
        </ul>
    </div>
</template>

<script>
import vHeader from './header.vue'
import vAbout from './about/aboutHeader.vue'
export default {
    components: {
        vHeader,
        vAbout
    },
    created() {
        this.getArticleList()
        this.getCategory()
    },
    data(){
        return {
            randomMovieList: [],
            dataListInfo:[],
            dataList: [
                
            ]
        }
    },
    methods: {
        getCategory() {
            this.$http.get('/api/category_info')
                .then((res)=>{
                    if(res.status==200){
                        this.dataList = res.data
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
        },
        getArticleList() {
            this.$http.get('/api/article_info')
                .then((res)=>{
                    if(res.status==200){
                        this.dataListInfo = res.data
                        // console.log(res.data)
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
        },
        changeLimit () {
            function getArrayItems(arr, num) {
                const temp_array = [];
                for (let index in arr) {
                    temp_array.push(arr[index]);
                }
                const return_array = [];
                for (let i = 0; i<num; i++) {
                    if (temp_array.length>0) {
                        const arrIndex = Math.floor(Math.random()*temp_array.length);
                        return_array[i] = temp_array[arrIndex];
                        temp_array.splice(arrIndex, 1);
                    } else {
                        break;
                    }
                }
                return return_array;
            }
            this.randomMovieList = getArrayItems(this.dataList, 5);
        }
    },
    mounted () {
        this.changeLimit();
    }
}
</script>

<style lang="less">
.film-list {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
    .film-left {
        img {
            width: 40px;
            height: 40px;
        }
    }
}
.category-page {
    width: 100%;
    background-color: #f1f1f1;
    .category-info-list {
        margin-top: 2px;
        .category-info {
            position: relative;
            border-bottom: 10px solid #f1f1f1;
            .category-msg {
                position: absolute;
                bottom: 30px;
                left: 5%;
                color: #fff;
                div {
                    font-size: 26px;
                    font-weight: bold;
                }
            }
            .category-img {
                img {
                    border-radius: 5px;
                    width: 96%;
                    height: 250px;
                }
            }
        }
    }
}
.sort-list {
    width: 100%;
    height: 70px;
    .sort-hack {
        diaplsy:flex;
        justify-content:space-between;
        align-items: center;
        .sort-msg {
            float: left;
            display: inline-block;
            p{
                display:inline-block;
            }
        }
        .sort-img {
            overflow: hidden;
            float: right;
            line-height: 50px;
            width: 50px;
            height: 50px;
            img {
                width: 50px;
                height: 50px;
                line-height: 50px;
            }
        }
    }
}
</style>
