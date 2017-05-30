<template lang="html">
    <div class="collection-content">
        <v-about header-title="我的收藏"></v-about>
        <div class="collection-sort">
            <div class="no" v-show="dataList.length<0">
                <img src="/assets/images/no.png" alt="">
            </div>
            <ul class="user_category_list" v-for="item in dataList">  
                <li class="user_list">
                <router-link :to="{ path: '/article/'+item.article_id }">
                    <div class="collection-list-left">
                        <i class="ivu-icon ivu-icon-ios-book"></i>
                    </div>
                    <div class="collection-list-right">
                        <p class="collection-list-title">
                            {{item.title}}
                        </p>
                        <div class="collection-list-other">
                            <div class="collection-list-author">{{username}}</div>
                            <!-- <div class="user-list-count">{{this.getcount(item.category_id)}}篇文章</div> -->
                        </div>
                    </div>
                    </router-link>
                </li>

            </ul>
            <p>--end--</p>
        </div>
    </div>
</template>

<script>
import vAbout from './aboutHeader.vue'
import jwt from 'jwt-decode'
export default {
    name: 'v-collection',
    components: {
        vAbout
    },
    data() {
        return {
            dataList:{}
        }
    },
    created(){
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id;
            this.username = userInfo.name
        }else {
            this.user_id = '';
            this.username = '';
        }
        this.getInfoList()
    },
    methods: {
    	getUserInfo() {
            const token = window.sessionStorage.getItem('Yuan-Token')
            if(token !=null && token!='null'){
                const decode = jwt(token);
                // console.log(decode)
                return decode;
            }else {
                return null
            }
        },
        getInfoList(){
			let obj = {
				user_id: this.user_id
			}
            this.$http.get('/api/collection_user/'+obj.user_id)
                .then((res)=>{
                    if(res.data.code==1){
                        this.dataList = res.data.result
                        this.$Message.info('文章信息获取成功')
                    }else {
                        this.$Message.error('文章信息获取失败')
                    }
                },(err)=>{
                    this.$Message.error('文章信息获取失败')
                    console.log(err)
                })
		}
    }
}
</script>

<style lang="less">
.user_category_list {
   
    margin-top: 50px ;
    a {
        width: 100%;
    }
}
.collection-list-left{
    float: left;
    width: 70px;
    height: 70px;
    i {
        font-size: 32px;
    }
}
.collection-list-right {
    overflow: hidden;
    position: absolute;
    right:10px;
    text-align: right;
}
</style>
