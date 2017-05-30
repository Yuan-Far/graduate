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
            <li class="list-article" v-for="(item,index) in dataList">
                <router-link :to="{ path: '/article/'+item.article_id }">
                    <div class="article-list-left">
                        <p class="article-time">{{item.create_time}}</script></p>
                        <h3>{{item.title}}</h3>
                    </div>
                </router-link>
                <div class="article-icon">
                    <router-link :to="{ path: '/addArticle/'+item.article_id }">
                        <i class="ivu-icon ivu-icon-edit"></i>
                    </router-link>
                    <i class="ivu-icon ivu-icon-trash-a" @click="del(item.article_id)"></i>
                </div>
                <Modal 
                    v-model="modal"
                    width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>删除确认</span>
                    </p>
                    <div style="text-align:center">
                        <p>此文集删除后，将无法恢复</p>
                        <p>是否继续删除？</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
                    </div>
                </Modal>
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
            time: '',
            modal:false,
            dataList: [],
            modal_loading: false
        }
    },
    methods:{
        getUserInfo() {
            const token = window.sessionStorage.getItem('Yuan-Token')
            // console.log(token)
            if(token !=null && token!='null'){
                const decode = jwt(token);
                return decode;
            }else {
                return null
            }
        },
        del (article_id) {
            // this.modal_loading = true;
            // setTimeout(() => {
            //     this.modal_loading = false;
            //     this.modal = false;
                
            // }, 2000);
            let obj = {
                article_id: id
            }
            this.$http.delete('/api/del_article/'+obj.article_id)
                .then((res)=>{
                    if(res.data.code===1) {
                        this.$Message.success('删除成功');
                    }
                },(err)=>{
                    this.$Message.error('删除失败');
                })
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
    align-items:center;
    justify-content: space-between;
    .article-list-left {
        margin: 20px;
        text-align: left;
        p{
            color:#999;
        }
        h3{
            color: #000;
        }
    }
}
.article-icon {
    display:flex;
    align-items: center;
    line-height: 100px;
}
</style>
