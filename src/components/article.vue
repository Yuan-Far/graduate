<template lang="html">
    <div class="article-page">
        <v-about header-title="详情"></v-about>
        <Back-top :bottom="60"></Back-top>
        <div class="no" v-if="this.dataList==undefined">
            <img src="../assets/images/no.png" alt="">
        </div>
        <div class="_hack_artile"  v-else>
            <div class="article-content">
                <div class="article-msg">
                    <div class="category-msg">
                        <div class="category-title">{{dataList.title}}</div>
                    </div>
                    <div class="category-img"><img :src="dataList.pic" :alt="dataList.title"></div>
                </div>
                <div class="article-summary">
                    {{dataList.summary}}
                </div>
                <div class="article-info" v-html="dataList.content">
                    
                </div>
            </div>
            <div>--end--</div>
            <v-bottom :article-info="dataList.article_id" :article-title="dataList.title"></v-bottom>
        </div>

    </div>

</template>

<script>
import vAbout from './about/aboutHeader.vue'
import vBottom from './articleBottom.vue'
export default {
    components: {
        vAbout,
        vBottom
    },
    created(){   
        this.getArticleDetail()
    },
    data() {
        return {
            article_id:'',
            dataList: {}  
        }     
    },
    methods:{
        unescape(str) {
            var elem = document.createElement('div')
            elem.innerHTML = str
            return elem.innerText || elem.textContent
        },
        getArticleDetail() {
            let article_id = this.$route.params.article_id
            this.$http.get('/api/article_msg/'+ article_id)
                .then((res)=>{
                    if(res.status===200){
                        this.dataList = res.data[0]
                    }else {
                        this.$Message.error('文章详情获取失败')
                    }
                },(err)=>{
                    this.$Message.error('文章详情获取失败')
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="less" >
    .article-page {
        width: 100%;
        .no { 
            img{
                width: 92%;
            }
        }
        .article-title {
            height: 50px;
            background: #428DFF;
            line-height: 50px;
            .article-wrapper {
                margin: 0 4%;
                display: flex;
                justify-content: space-between;
                color: #fff;  
                i {
                    line-height: 50px;
                    display: inline-block;
                    font-size: 26px;
                }
                p {
                    font-size: 18px;
                }
            }
        }
        .article-content {
            width: 92%;
            margin: 1rem auto;
            color: #222;
            padding-bottom:25px;
            border-bottom: 1px solid #eee;
            .article-msg {
                position: relative;
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
                        width: 100%;
                        height: 250px;
                    }
                }
            }
            .article-summary {
                text-indent: 2em;
                margin: 1rem 0;
                padding: 0 1rem;
                font-size: 16px;
                background-color: #f1f1f1;
            }
            .article-info{
                font-size:16px;
                text-align: left;
                text-indent: 2em;
            }
        }
        
    }
    ._hack_artile {
        margin-bottom:50px;
        
    }
</style>
