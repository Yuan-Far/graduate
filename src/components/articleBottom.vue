<template>
	<div class="article-bottom">
        <div class="bottom-icon">
        	<i v-bind:class="[showClass? iconTrue:iconFalse]" class="fa fa-fw" @click="isShow"></i>
        	<i class="fa fa-tasks fa-fw"></i>
        </div>
        <div class="bottom-like">
        	<span>喜欢 {{dataList.count}}</span>
        </div>
    </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
	export default {
		// props: ['infoShow'],
		data () {
			return {
				'iconTrue': 'fa-heart',
				'iconFalse': 'fa-heart-o',
				dataList: {
					'count': 44
				}
			}
		},
		methods: {
			isShow () {
				this.$store.commit('UPDATE_CLASSSHOW');
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