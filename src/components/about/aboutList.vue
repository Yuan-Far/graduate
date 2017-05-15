<template lang="html">
    <div class="list-content">

    <div class="add-info-title">
        <div class="about-title">
            <div class="about-wrapper">
                <i class="fa fa-angle-left fa-fw" @click="back()"></i>     
                <div>  </div>           
                <p class="about-name" @click="modal = true"> 新建 </p>
                
            </div>
        </div>
    </div>
    <div class="no" v-show="dataList.length<0">
        <img src="/assets/images/no.png" alt="">
    </div>
    <ul class="user_category_list" >  
        <li class="user_list" v-for="item in dataList">
            <router-link :to="{ path: '/categoryarticle/' + item.category_id}">
                <div class="user-list-left">
                    <i class="ivu-icon ivu-icon-ios-albums"></i>
                </div>
                <div class="user-list-right">
                    <p class="user-list-title">
                        {{item.title}}
                    </p>
                    <div class="user-list-other">
                        <div class="user-list-author">{{username}}</div>
                        <!-- <div class="user-list-count">{{this.getcount(item.category_id)}}篇文章</div> -->
                    </div>
                </div>
            </router-link>
        </li>
    </ul>
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
    <!-- <div class="article-create">
        <i class="ivu-icon ivu-icon-plus"></i>
    </div> -->
</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
import jwt from 'jwt-decode'
export default {
    components: {
        vAbout
    },
    created(){
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id
            this.username = userInfo.name
        }else {
            this.user_id = ''
            this.username = ''
        }
        this.getCategoryUser()
    },
    data(){
        return {
            'modal': false,
            'dataList': [],
            'category_title': '',
            'upload_img': '',
            'user_id': '',
            'username':''
        }
    },

    methods: {
        back() {
            history.go(-1)
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
        ok () {
            // this.$Message.info('创建成功');
            let obj_1 = {
                title: this.category_title,
                pic: this.upload_img,
                user_id: this.user_id
            }
            this.$http.post('/api/create_category', obj_1)
                .then((res)=>{
                    if(res.data.code!==-1){
                        this.$Message.info('创建成功');
                    }else {
                        this.$Message.error('创建失败');
                    }
                },(err)=>{
                    this.$Message.error('创建失败');
                })
        },
        getcount(category_id){
            this.$http.get('/api/article_list/'+ category_id)
                .then((res)=>{
                    if(res.status==200){
                        this.count = res.data
                        // console.log(res.data.data)
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
        },
        getCategoryUser() {
            let obj = {
                user_id: this.user_id
            }
            this.$http.get('/api/category_user/'+ obj.user_id)
                .then((res)=>{
                    if(res.status==200){
                        this.dataList = res.data.data
                        // console.log(res.data.data)
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
        },
        cancel () {
            this.$Message.info('取消创建');
        }
    }
}
</script>

<style lang="less">
.add-info-title {
    z-index: 9;
    width: 100%;        
    .about-title {
        width: 100%;
        border-bottom: 2px solid #ccc;
        position: fixed;
        top:0;
        left:0;
        z-index: 9;
        height: 50px;
        background: #fff;
        line-height: 50px;
        .about-wrapper {
            margin: 0 4%;
            display: flex;
            justify-content: space-between;
            color: #fff;  
            i {
                line-height: 50px;
                color: #ccc;
                display: inline-block;
                font-size: 26px;
            }
            p {
                font-size: 18px;
                color: #428DFF;
            }
        }
    }
}
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
    }
}
.user_category_list {
    margin-top:50px;
    .user_list {
        border-bottom: 1px solid #eee;
        width: 100%;
        height: 70px;
        // line-height: 70px;
        padding: 10px;
        .user-list-left {
            float: left;
            line-height: 50px;
            width: 50px;
            height: 50px;
            background: #eee;
            overflow: hidden;
            padding: 10px 0;
            margin-left:15px;
            margin-right:15px;
            i{
                font-size: 28px;
                color: #999;
            }
        }
        .user-list-right {
            overflow:hidden;
            text-align: left;
            p {
                color: #000;
                font-size: 18px;
            }
            .user-list-other {
                line-height: 40px;
                div{
                    display: inline-block;
                    margin-right:25px;
                }
            }
        }
    }
}
.sort-name {
    width: 92%;
    border: none;
    border-bottom: 2px solid #428DFF;
    background: transparent;
    outline: none;
    margin: 10px; 
}
</style>
