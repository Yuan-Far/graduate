<template lang="html">
    <div class="content">
        <v-header></v-header>
        <div class="head_wrapper">
            <p>我的</p>
        </div>
        <div class="mask _hack">
            <router-link to="/personInfo">
                <div class="login_module">
                    <div class="login_left">
                        <img :src="list.pic">
                    </div>
                    <div class="login_middle">
                        <p>{{username}}</p>
                    </div>
                    <div class="login_right">
                        <i class="fa fa-angle-right"></i>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="mask _mask">
            <div v-for="item in dataAbout">
                <router-link :to="item.link">
                    <div class="about_list">
                        <div class="about_left">
                            <i class="fa" :class="item.icon"></i>
                        </div>
                        <div class="about_middle">
                            <p>{{item.label}}</p>
                        </div>
                        <div class="about_right">
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <!-- <div class="mask _mask">
            <div v-for="item in dataAbout">
                <router-link to="/bug">
                    <div class="about_list">
                        <div class="about_left">
                            <i class="fa" :class="item.icon"></i>
                        </div>
                        <div class="about_middle">
                            <p>{{item.label}}</p>
                        </div>
                        <div class="about_right">
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div> -->
        <div class="mask _mask2">
            <div class="logout" @click="logout">
                退出登录
            </div>
        </div>
        <div class="copyright">
            <span>Version 0.0.1</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import jwt from 'jwt-decode'
import vHeader from './header.vue'
export default {
    name: 'v-menu',
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
    components: {
        vHeader
    },
    data() {
        return {
            username:'',
            list: {},
            user_id: '',
            dataAbout: [{
                'link': '/aboutCollection',
                'icon': 'fa-heart',
                'label': '我的收藏'
            }, {
                'link': '/aboutArticle',
                'icon': 'fa-file-text-o',
                'label': '我的文章'
            }, {
                'link': '/aboutList',
                'icon': 'fa-reorder',
                'label': '我的文集'
            }, {
                'link': '/aboutBug',
                'icon': 'fa-bug',
                'label': 'Bug反馈'
            }, {
                'link': '/aboutInfo',
                'icon': 'fa-info-circle',
                'label': '关于'
            }]
        }
    },
    methods: {
        isShow() {
            this.$store.commit('UPDATE_MENUSHOW');
        },
        logout() {
            this.$http.post('/auth/logout')
                .then((res)=>{
                    if(res.data.code===1){
                        window.sessionStorage.removeItem('Yuan-Token')
                        this.$Message.info('退出登陆成功');
                        this.$router.push('/login')
                    }else{
                        this.$Message.error('退出登陆失败')
                    }
                },(err)=> {
                    this.$Message.error('Err')
                })
            
            
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
             this.$http.get('/auth/user/'+this.user_id)
                .then((res)=>{
                    if(res.data.code==1){
                        this.list = res.data.data
                        this.$Message.info('用户信息获取成功')
                    }else {
                        this.$Message.error('用户信息获取失败')
                    }
                },(err)=>{
                    this.$Message.error('用户信息获取失败')
                    console.log(err)
                })
        }
    },
    computed: {
        ...mapState([
            'menuShow'
        ])
    }
}
</script>

<style lang="less">
    @borderColor: #eee;
    @fontColor: #fff;
    .content{
        margin: 50px 0;
        overflow: hidden;
    }
    .head_wrapper{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: #428DFF;
        border-bottom:1px solid @borderColor;
        p{
            color:#fff;
            font-size: 1.45rem;
            display:inline-block;
            vertical-align: bottom;
        }
    }
    .mask{
        background: #fff;
        font-size:1.15rem;
        width: 100%;
        border-top: 1px solid @borderColor;
        border-bottom: 1px solid @borderColor;
        margin-bottom: 1rem;
    }
    ._hack{
        margin-top: .75rem !important;
    }
    ._mask{
        border-bottom: none;
    }
    ._mask2{
        border: none;
        margin-top: 2rem;
        background: none;
    }
    .logout{
        width: 80%;
        margin: 0 auto;
        background: #EA4335;
        height: 48px;
        line-height: 48px;
        color: #fff;
        border-radius: 5px;
    }
    .about_list{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid @borderColor;
        i{
            color: #888;
            font-size: 1.5rem;
        }
    }
    .login_module{
        width: 96%;
        margin: 0 2%;
        height: 6rem;
    }
    .login_left{
        width: 28%;
        float: left;
        height: 6rem;
        img{
            border: 2px solid @borderColor;
            border-radius: 50%;
            margin: 1rem 0;
            width: 4rem;
            height: 4rem;
        }
    }
    .about_left{
        width: 20%;
        float: left;
        height: 50px;
        i{
            line-height: 50px;
        }
    }
    .login_middle{
        padding-left:2%;
        width: 55%;
        height: 6rem;
        display: inline-block;
        line-height: 6rem;
        p{
            color: #333;
            text-align: left;
        }
    }
    .about_middle{
        width: 65%;
        height: 50px;
        display: inline-block;
        line-height: 50px;
        p{
            color: #333;
            text-align: left;
        }
    }
    .login_right{
        width: 12%;
        float: right;
        height: 6rem;
        line-height: 6rem;
        i{
            color: #222;
        }
    }
    .about_right{
        width: 15%;
        float: right;
        height: 50px;
        line-height: 50px;;
    }
    .copyright{
        margin-bottom: .5rem;
    }
</style>
