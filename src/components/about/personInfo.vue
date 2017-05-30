<template lang="html">
	<div class="person-info">
        <v-about header-title="个人中心"></v-about> 
        <div class="person-pic">
            <span class="pic-title">更换头像</span>
            <div class="pic-upload">
                <img :src="dataList.pic">
            </div>
        </div>
        <div class="person-name" @click="modal_1 = true">
            <span class="pic-title">更改昵称</span>
            <div class="pic-upload">
                {{dataList.username}}
            </div>
        </div>
        <Modal
            v-model="modal_1"
            @on-ok="ok"
            @on-cancel="cancel"
            title="修改昵称">
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
            <input class="sort-name" type="text" v-model="username" :placeholder="dataList.username">
        </Modal>
        <div class="person-email" @click="modal_2 = true">
            <span class="pic-title">更换邮箱</span>
            <div class="pic-upload">
                {{dataList.email}}
            </div>
        </div>
        <Modal
            v-model="modal_2"
            @on-ok="ok_2"
            @on-cancel="cancel"
            title="修改邮箱">
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
            <input class="sort-name" type="text" v-model="email" :placeholder="dataList.email">
        </Modal>
        <div class="person-summary" @click="modal_3 = true">
            <span class="pic-title">更改简介</span>
            <div class="pic-upload">
                {{dataList.summary}}
            </div>
        </div>
        <Modal
            v-model="modal_3"
            @on-ok="ok_3"
            @on-cancel="cancel"
            title="修改简介">
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
            <input class="sort-name" type="text" v-model="summary" :placeholder="dataList.summary">
        </Modal>
	</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
import jwt from 'jwt-decode'
export default {
    components: {
        vAbout
    },
    data() {
        return {
            modal_1: false,
            modal_2: false,
            modal_3: false,
            user_id: '',
            username: '',
            summary:'',
            email: '',
            dataList: {}
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
        this.getInfo()
    },
    methods:{
        ok () {
            // this.$Message.info('创建成功');
            let obj_1 = {
                username: this.username,
            }
            this.$http.put('/auth/edit_username/'+this.user_id, obj_1)
                .then((res)=>{
                    if(res.data.code!==-1){
                        this.$Message.info('修改成功');
                    }else {
                        this.$Message.error('修改失败');
                    }
                },(err)=>{
                    this.$Message.error('修改失败');
                })
        },
        ok_2 () {
            // this.$Message.info('创建成功');
            let obj_1 = {
                email: this.email,
            }
            this.$http.put('/auth/edit_email/'+this.user_id, obj_1)
                .then((res)=>{
                    if(res.data.code!==-1){
                        this.$Message.info('修改成功');
                    }else {
                        this.$Message.error('修改失败');
                    }
                },(err)=>{
                    this.$Message.error('修改失败');
                })
        },
        ok_3 () {
            // this.$Message.info('创建成功');
            let obj_1 = {
                summary: this.summary,
            }
            this.$http.put('/auth/edit_summary/'+this.user_id, obj_1)
                .then((res)=>{
                    if(res.data.code!==-1){
                        this.$Message.info('修改成功');
                    }else {
                        this.$Message.error('修改失败');
                    }
                },(err)=>{
                    this.$Message.error('修改失败');
                })
        },
        cancel () {
            this.$Message.info('取消修改');
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
        getInfo() {
            let obj = {
                user_id: this.user_id
            }
            this.$http.get('/auth/user/'+ obj.user_id)
                .then((res)=>{
                    if(res.data.code===1){
                        this.dataList = res.data.data
                        console.log(this.dataList.username)
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
.person-info {
    width: 100%;
    background: #f1f1f1;
    .person-msg {
        background: #fff;
        width: 100%;
        padding: 0 20%;
        height: 80px;
        line-height: 80px;
        display: flex;
        justify-content: space-between;
        .person-edit {
            margin-top: 10px;
            line-height: 40px;
            color: #fff;
            background: #999;
            display: inline-block;
            width: 60px;
            height: 40px;
        }
        .person-submit {
            margin-top: 10px;
            line-height: 40px;
            color: #fff;
            background: #369BFF;
            display: inline-block;
            width: 60px;
            height: 40px;
        }
    }
    .person-name,.person-email,.person-summary {
        background: #fff;
        width: 100%;
        padding: 0 4%;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #333;
        display: flex;
        font-size: 16px;
        justify-content: space-between;
    }
    .person-pic {
        font-size: 16px;
        background: #fff;
        width: 100%;
        padding: 0 4%;
        margin-top: 10px;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #333;
        display: flex;
        justify-content: space-between;
        .pic-upload {

            margin-top: 10px;
            img {
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>
