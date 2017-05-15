<template lang="html">
    <div class="article-page">
        <v-about header-title="文集列表"></v-about>
        <div class="category-info">
        	<div>
        		<img :src="dataCategory.pic" alt="dataCategory.title">
        	</div>
        	<div>
        		<h3>{{dataCategory.title}}</h3>
        	</div>
        </div>
        <div class="no" v-if="this.dataList.length<=0">
            <img src="../assets/images/no.png" alt="">
        </div>
        <div v-else>
            <div class="sort-content-0">
                <ul class="sort-content">
		            <li class="sort-list" v-for="item in dataList">
		                <router-link :to="{ path: '/article/'+item.article_id }">
		                   	<div class="sort-hack">
		                   		<div class="sort-msg">
		                            <p>{{item.title}}</p>
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
            </div>
        </div>
    </div>

</template>

<script>
import vAbout from './about/aboutHeader.vue'
export default {
    components: {
        vAbout
    },
    created(){   
        this.getList()
        this.getInfo()
    },
    data() {
        return {
            category_id:'',
            dataList: [],
            dataCategory:{}
        }     
    },
    methods:{
    	getInfo() {
    		let category_id = this.$route.params.category_id
            this.$http.get('/api/category_msg/'+ category_id)
                .then((res)=>{
                    if(res.status===200){
                        this.dataCategory = res.data[0]
                        console.log(this.dataCategory)
                    }else {
                        this.$Message.error('文集获取失败')
                    }
                },(err)=>{
                    this.$Message.error('文集获取失败')
                    console.log(err)
                })
    	},
        getList() {
        	let category_id = this.$route.params.category_id
            this.$http.get('/api/article_category/'+ category_id)
                .then((res)=>{
                    if(res.status===200){
                        this.dataList = res.data.result
                        console.log(this.dataList)
                    }else {
                        this.$Message.error('文章列表获取失败')
                    }
                },(err)=>{
                    this.$Message.error('文章列表获取失败')
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="less" >
.category-info {
	width:90%;
	margin: 10px auto;
	img{
		width:80px;
		height:80px;
		float: left;
	}
	p{

	}
}
.sort-content-0{
	margin-top:100px;
}
    .article-page {
        width: 100%;
        .no { 
            img{
                width: 92%;
            }
        }
        .sort-content {
        // margin-bottom:50px;
        width: 100%;
        color: #000;
        .sort-list {
            // line-height: 70px;
            border-bottom: 1px solid #e1e1e1;
            margin-top: 20px;
            // padding-bottom: 10px;
            width: 100%;     
            height: 100px;
            .sort-hack {
                width: 92%;
                display: flex;
                justify-content: space-between;
                .sort-img {
                    // margin: 0 10px;
                    // float: right;
                    img {
                        width: 60px;
                        height: 60px;
                    }
                }
                .sort-msg {
                    overflow: hidden;
                    line-height: 16px;
                    padding-left: 10px;
                    p:nth-child(1){
                        font-size: 18px;
                        color:#000;
                    }
                    p {
                        display: flex;
                        justify-content: space-between;
                        color: #999;
                        margin: 10px 0;
                        font-size: 16px;
                    }
                    .sort-other {
                        display: flex;
                        justify-content: space-between;
                        span:nth-child(1) {
                            color: #0549a6;
                        }
                    }
                }
            }
        }
    }
    }
</style>
