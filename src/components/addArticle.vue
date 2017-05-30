<template>
    <div class="addarticle-content">
    	<div class="add-info-title">
    		<div class="about-title">
	            <div class="about-wrapper">
	                <i class="fa fa-angle-left fa-fw" @click="back()"></i>     
	                <i class="ivu-icon ivu-icon-chevron-down" @click="showInfo()"></i>
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
        <div class="list-info" v-bind:class="{_hack_list:categoryClass}">
            <li class="label-list" v-for="item in dataCategoryList">
                <!-- <input style="display:none" ref="categoryid" :value="item.category_id"> -->
                <label>{{item.title}}</label>
                <input type="radio" name="info" v-model="categoryid" :value="item.category_id">
            </li>
        </div>
    	<div class="addInfoTitle">

    		<input v-if="dataInfo.title" type="text" :placeholder="dataInfo.title" v-model="article_name">
            <input v-else type="text" placeholder="请输入标题" v-model="article_name">
    	</div>
        
        <vue-html5-editor :content="dataInfo.content" @change="updateData" :height="500"></vue-html5-editor>
    </div>
</template>
<script type="text/javascript">
import jwt from 'jwt-decode'
import { mapState } from 'vuex'
export default {
	 created(){
        const userInfo = this.getUserInfo()
        if(userInfo != null){
            this.user_id = userInfo.id
            this.author = userInfo.name
        }else {
            this.user_id = ''
            this.author = ''
        }
        this.getCategoryList()
        this.getInfo()
    },
    data() {
    	return {
    		modal: false,
    		content: '',
    		article_name:'',
    		pic: '',
    		author: '',
            categoryid:'',
    		user_id: '',
            dataCategoryList: '',
            dataInfo: {}
    	}
    },
    computed: {
            ...mapState([
                'categoryClass'
            ])
        },
    methods: {
        back() {
            history.go(-1)
        },
        showInfo() {
            this.$store.commit('UPDATE_CATEGORYSHOW');
        },
        getInfo() {
            let article_id = this.$route.params.id
            // console.log(this.$route.params)
            this.$http.get('/api/article_msg/'+ article_id)
                .then((res)=>{
                    if(res.status===200){
                        this.dataInfo = res.data[0]
                        console.log(this.dataInfo.title)
                    }else {
                        this.$Message.error('文章详情获取失败')
                    }
                },(err)=>{
                    this.$Message.error('文章详情获取失败')
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
        getCategoryList() {
            this.$http.get('/api/category_info')
                .then((res)=>{
                    if(res.status==200){
                        this.dataCategoryList = res.data
                    }else {
                        this.$Message.error('获取信息失败')
                    }
                },(err)=>{
                    this.$Message.error('获取信息失败')
                    console.log(err)
                })
        },
        release() {
        	let obj = {
        		title: this.article_name,
        		pic: this.pic,
        		content: this.content,
        		author: this.author,
        		user_id: this.user_id,
                category_id: this.categoryid
        	}
            console.log(obj)
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
    ._hack_list {
        display: none;
    }
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
    .list-info {
        margin: 0 25%;
        position: absolute;
        z-index:999999;
        width: 50%;
        min-height:200px;
        background: #fff;
        border-radius: 5px;
        border: 1px solid #eee;
        .label-list {
            display: flex;
            justify-content: space-around;
            line-height: 40px;
            height:40px;
            line-height: 40px;
            list-style: none;
            width:100%;
            border-bottom: 1px solid #eee;
            input[type='radio'] {
                margin-top: 14px;
            }
        }
    }
</style>