<template>
    <div class="addarticle-content">
    	<div class="add-info-title">
    		<div class="about-title">
	            <div class="about-wrapper">
	                <i class="fa fa-angle-left fa-fw" @click="back()"></i>     
	                <div>  </div>           
	                <p class="about-name" @click="release()"> 发布 </p>
	                
	            </div>
	        </div>
    	</div>
    	<!-- <Modal
            v-model="modal"
            @on-ok="ok"
            @on-cancel="cancel"
            title="新建文集">
            <input class="sort-name" v-model="category_title" type="text" placeholder="请输入文集名">
        </Modal> -->
    	<div class="addInfoTitle">
    		<input type="text" placeholder="请输入标题" v-model="article_name">
    	</div>
        <vue-html5-editor :content="content" @change="updateData" :height="500"></vue-html5-editor>
    </div>
</template>
<script type="text/javascript">
import jwt from 'jwt-decode'
export default {
	 created(){
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id
            this.author = userInfo.author
        }else {
            this.user_id = ''
            this.author = ''
        }
    },
    data() {
    	return {
    		modal: false,
    		content: '',
    		article_name:'',
    		pic: '',
    		author: '',
    		user_id: ''
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
        toCategory() {

        },
        release() {
        	let obj = {
        		title: this.article_name,
        		pic: this.pic,
        		content: this.content,
        		author: this.author,
        		user_id: this.user_id
        	}
        	this.$http.post('/api/create_article', obj)
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
        updateData: function (data) {
            // sync content to component
            this.content = data
        }
    }
}
</script>
<style lang="less">
	.addarticle-content {
		.addInfoTitle{
			margin-top: 50px;
			input {
				border: none;
				background: transparent;
				height: 50px;
				width:100%;
				outline: none;
				padding-left: 2em;
			}
		}
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
		.content{
			margin-top:0 !important;
		} 
	}
</style>