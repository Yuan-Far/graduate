<template>
	<div class="article-bottom">
        <div class="bottom-icon">
        	<i v-bind:class="[showClass? iconTrue:iconFalse]" class="fa fa-fw" @click="isShow"></i>
        	<i class="fa fa-tasks fa-fw"></i>
        </div>
        <div class="bottom-like">
        	<span>喜欢 {{count}}</span>
        </div>
    </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
import jwt from 'jwt-decode'
	export default {
		props: ['articleInfo','articleTitle'],
		data () {
			return {
				'iconTrue': 'fa-heart',
				'iconFalse': 'fa-heart-o',
				'user_id': '',
				'favor':'',
				'info':'',
				'count':'',
				'dataList': {
					'count': 44
				}
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
	        this.getCollectionInfo()
	        this.getCount()
	    },
		methods: {
			getCollectionInfo() {
				let obj = {
					article_id: this.$route.params.article_id
				}
	            this.$http.get('/api/collection_info/'+obj.article_id)
	                .then((res)=>{
	                    if(res.data.code==1){
	                        this.favor = res.data
	                        // console.log(res.data)
	                        this.$Message.info('文章信息获取成功')
	                    }else {
	                        this.$Message.error('文章信息获取失败')
	                    }
	                },(err)=>{
	                    this.$Message.error('文章信息获取失败')
	                    console.log(err)
	                })
			},
			getCount(){
				let obj = {
					user_id: this.user_id
				}
	            this.$http.get('/api/collection_user/'+obj.user_id)
	                .then((res)=>{
	                    if(res.data.code==1){
	                        this.count = res.data.result.length
	                        // console.log(res.data.result)
	                        this.$Message.info('文章信息获取成功')
	                    }else {
	                        this.$Message.error('文章信息获取失败')
	                    }
	                },(err)=>{
	                    this.$Message.error('文章信息获取失败')
	                    console.log(err)
	                })
			},
			isShow () {
				this.$store.commit('UPDATE_CLASSSHOW');
				if(this.showClass){
					console.log(this.articleInfo)
					let obj = {
						user_id: this.user_id,
						article_id: this.articleInfo,
						title: this.articleTitle
					}
		            this.$http.post('/api/collection_article', obj)
		                .then((res)=>{
		                    if(res.data.code===1){
		                        this.dataList = res.data
		                        console.log(this.dataList)
		                        this.$Message.info('文章收藏成功')
		                    }else {
		                        this.$Message.error('文章收藏失败')
		                    }
		                },(err)=>{
		                    this.$Message.error('文章收藏失败')
		                    console.log(err)
		                })
				} else{
					let obj = {
						user_id: this.user_id,
						article_id: this.articleInfo
					}
		            this.$http.delete('/api/cancel_article/'+obj.user_id+'/'+obj.article_id)
		                .then((res)=>{
		                    if(res.data.code===1){
		                        this.dataList = res.data[0]
		                        this.$Message.info('取消收藏成功')
		                    }else {
		                        this.$Message.error('取消收藏失败')
		                    }
		                },(err)=>{
		                    this.$Message.error('取消收藏失败')
		                    console.log(err)
		                })
				}
			},

			getUserInfo() {
	            const token = window.sessionStorage.getItem('Yuan-Token')
	            if(token !=null && token!='null'){
	                const decode = jwt(token);
	                // console.log(decode)
	                return decode;
	            }else {
	                return null
	            }
	        }
		},
		computed: {
			...mapState([
	            'showClass'
	        ])
		}
	}
</script>
<style lang="less">
 	
	.article-bottom {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: fixed;
        border-top: 1px solid #eee;
        bottom: 0;
        height: 50px;
        background: #fff;
        text-align: center;
       
		.bottom-icon {
	        width: 50%;
	        text-align: left;
	        i {
	        	font-size: 26px;
	        	line-height: 50px;
	        	margin: 0 .5em;
	        }
	    }
	    .bottom-like {
	    	display: inline-block;
	    	color: #333;
	    	span {
	    		line-height: 50px;
	    		font-size: 16px;
	    		margin-right: 2em;
	    	}
	    }
	}
</style>