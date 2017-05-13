<template lang="html">
    <div class="list-content">
    <v-header></v-header>

    <div class="add-info-title">
        <div class="about-title">
            <div class="about-wrapper">
                <i class="fa fa-angle-left fa-fw" @click="back()"></i>     
                <div>  </div>           
                <p class="about-name" @click="modal = true"> 新建 </p>
                
            </div>
        </div>
    </div>
    <Modal
        v-model="modal"
        @on-ok="ok"
        @on-cancel="cancel"
        title="新建文集">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
    </Modal>
    <!-- <div class="article-create">
        <i class="ivu-icon ivu-icon-plus"></i>
    </div> -->
</div>
</template>

<script>
import vAbout from './aboutHeader.vue'
import vHeader from '../header.vue'
export default {
    components: {
        vAbout,
        vHeader
    },
    data(){
        return {
            'modal': false
        }
    },
    methods: {
        back() {
            history.go(-1)
        },
        ok () {
            this.$Message.info('创建成功');
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
</style>
