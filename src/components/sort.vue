<template lang="html">
    <div class="sort-page">
        <v-about  header-title="全站文集"></v-about>
        <v-header></v-header>
        <!-- <router-link to="/addCategory"> -->
            <!-- <div class="article-create">
                <i class="ivu-icon ivu-icon-plus" @click="modal = true"></i>
            </div> -->
        <!-- </router-link> -->
        <Modal
            v-model="modal"
            @on-ok="ok"
            @on-cancel="cancel"
            title="新建文集">
            <!-- <Upload
                multiple
                type="drag"
                v-model="upload_img"
                action="/api/upload_img">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击这里上传</p>
                </div>
            </Upload> -->
            <input class="sort-name" v-model="category_title" type="text" placeholder="请输入文集名">
        </Modal>
        <ul class="sort-content">
            <li class="sort-list" v-for="item in dataList">
                <router-link :to="{ path: '/categoryarticle/' + item.category_id}">
                    <div class="sort-hack">
                        <div class="sort-img"><img :src="item.pic" :alt="item.title"></div>
                        <div class="sort-msg">
                            <p>{{item.title}}</p>
                            <p>{{item.summary}}</p>
                            <!-- <div class="sort-other">
                                <span>{{dataList.title}}</span>
                                <span>{{item.create_time}}</span>
                            </div> -->
                        </div>
                    </div>
                </router-link>
            </li> 
        </ul>
    </div>
</template>

<script>
import vAbout from './about/aboutHeader.vue'
import vHeader from './header.vue'
import jwt from 'jwt-decode'
export default {
    name:'v-sort',
    created() {
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id
        }else {
            this.user_id = '';
        }
        this.getCategoryList()
    },
    components: {
        vAbout,
        vHeader
    },
    data() {
        return {
            'modal': false,
            'category_title': '',
            'upload_img': '',
            'user_id': '',
            'dataList': {
                'title': "Code",
                'dataList': []
            }  
        }     
    },
    methods: {
        back() {
            history.go(-1)
        },
        ok () {
            // this.$Message.info('创建成功');
            let obj = {
                title: this.category_title,
                pic: this.upload_img,
                user_id: this.user_id
            }
            this.$http.post('/api/create_category', obj)
                .then((res)=>{
                    if(res.data.code===1){
                        this.$Message.info('创建成功');
                    }else {
                        this.$Message.error('创建失败');
                    }
                },(err)=>{
                    this.$Message.error('创建失败');
                })
        },
        cancel () {
            this.$Message.info('取消创建');
        },
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
        getCategoryList() {
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
        }
    }
}
</script>

<style lang="less">
.sort-page {
    .article-create {
    position: fixed;
    bottom: 75px;
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
    width:100%;
    .sort-wrapper{
        height:50px;
        line-height:50px;
        color: #fff;
        background: #428DFF;
        span{
            float: left;
            font-size:1.75rem;
            display:inline-block;
        }
        i{
            font-size:1.75rem;
            padding: 0 1rem;
        }
    }
    .sort-content {
        margin-bottom:50px;
        width: 100%;
        color: #000;
        .sort-list {
            line-height: 70px;
            border-bottom: 1px solid #e1e1e1;
            margin-top: 10px;
            padding-bottom: 10px;
            width: 100%;     
            height: 70px;
            .sort-hack {
                width: 92%;
                .sort-img {
                    margin: 0 10px;
                    img {
                        line-height: 70px;
                        float: left;
                        width: 50px;
                        height: 50px;
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
