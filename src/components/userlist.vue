<template>
	<div class="user-list-page">
		<v-about :header-title="list.username"></v-about>
		<div class="header-info">
			<img :src="list.pic" :alt="list.username">
			<h3>{{list.username}}</h3>
		</div>
		<div class="header-list">
			 <ul class="sort-content">
                <li class="sort-list" v-for="item in dataList">
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
            <p>--end--</p>
		</div>
	</div>
</template>
<script>
import jwt from 'jwt-decode'
import vAbout from './about/aboutHeader.vue'
import vHeader from './header.vue'
	export default {
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
	        this.getArticleList()
	    },
	    components: {
	        vAbout
	    },
		data (){
			return {
				username:'',
	            list: {},
	            user_id: '',
	            dataList: 	[]
			}
		},
		methods: {
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
	        },
		}
	}
</script>
<style lang="less">
	.header-info {
		margin-top: 25px;
		border-bottom: 1px solid #eee;
		img {
			height: 100px;
			width: 100px;
			border-radius: 50%;
			border: 2px solid #eee;
		}
	}
	.header-list {
		margin-top: 15px;
		padding: 0 15px;
		.sort-list {
			color: #000;
			padding-top: 10px;
			border-bottom: 1px solid #eee;
			.sort-msg {
				span {
					color: #000;
				}
			}
		}
	}
</style>