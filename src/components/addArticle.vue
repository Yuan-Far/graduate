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
    	<div class="addInfoTitle">
    		<input type="text" placeholder="请输入标题">
    	</div>
        <markdown-editor :configs="configs" ref="markdownEditor"></markdown-editor>
    </div>
</template>
<script type="text/javascript">
import { markdownEditor } from 'vue-simplemde'
export default {
    data() {
    	return {
    		configs: {
    			renderingConfig: {
	          		codeSyntaxHighlighting: false, // 开启代码高亮
	        	},
	        	previewRender: function(plainText) {
		          	return customMarkdownParser(plainText) // 返回HTML自定义解析器
		        }
    		}
    	}
    },
    methods: {
        back() {
            history.go(-1)
        },
        release() {
        	console.log(this.configs.previewRender(this.$refs.markdownEditor.simplemde.value()));
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
	}
	.markdown-editor {
		.CodeMirror {
			width: 100%;
			min-height: 566px !important;
			text-align: left !important;
		}
		.editor-toolbar {
			position: fixed !important;
			z-index: 9;
			width: 100%;
			border: none !important;
			border-top: 1px solid #eee;
			background: #f1f1f1;
			bottom: 0;
			a {
				width: 28px !important;
				height: 28px !important;
			}
		}
		.editor-statusbar {
			display: none;
		}
	}
</style>