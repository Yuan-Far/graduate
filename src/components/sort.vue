<template lang="html">
    <div class="sort-page">
        <v-about  header-title="全站文集"></v-about>
        <v-header></v-header>
        <Modal
            v-model="modal1"
            title="新建文集"
            @on-ok="ok"
            @on-cancel="cancel">
            <input type="text" placeholder="文集名">
        </Modal>
        <ul class="sort-content">
            <li class="sort-list" v-for="item in dataList.data">
                <router-link to="/article">
                    <div class="sort-hack">
                        <div class="sort-img"><img :src="item.pic" :alt="item.title"></div>
                        <div class="sort-msg">
                            <p>{{item.title}}</p>
                            <p>{{item.summary}}</p>
                            <!-- <div class="sort-other">
                                <span>{{dataList.title}}</span>
                                <span>{{item.create_time}}</span>
                            </div> -->
                        </div>
                    </div>
                </router-link>
            </li> 
        </ul>
    </div>
</template>

<script>
import vAbout from './about/aboutHeader.vue'
import vHeader from './header.vue'
export default {
    name:'v-sort',
    components: {
        vAbout,
        vHeader
    },
    data() {
        return {
            dataList: {
                'title': "Code",
                'data': [
                    {
                        'title': "青春",
                        'author': "Yuan",
                        'pic': "/static/img/test.2455921.png",
                        'summary': "this is a summary",
                        'create_time': "2017-05-05"
                    },
                    {
                        'title': "简介",
                        'author': "Yuan",
                        'pic': "/static/img/test.2455921.png",
                        'summary': "this is a summary",
                        'create_time': "2017-05-05"
                    }
                ]
            }  
        }     
    }
}
</script>

<style lang="less">
.sort-page {
    width:100%;
    .sort-wrapper{
        height:50px;
        line-height:50px;
        color: #fff;
        background: #428DFF;
        span{
            float: left;
            font-size:1.75rem;
            display:inline-block;
        }
        i{
            font-size:1.75rem;
            padding: 0 1rem;
        }
    }
    .sort-content {
        width: 100%;
        color: #000;
        .sort-list {
            line-height: 70px;
            border-bottom: 1px solid #e1e1e1;
            margin-top: 10px;
            padding-bottom: 10px;
            width: 100%;     
            height: 70px;
            .sort-hack {
                width: 92%;
                .sort-img {
                    margin: 0 10px;
                    img {
                        line-height: 70px;
                        float: left;
                        width: 50px;
                        height: 50px;
                    }
                }
                .sort-msg {
                    overflow: hidden;
                    line-height: 16px;
                    padding-left: 10px;
                    p:nth-child(1){
                        font-size: 18px;
                        color:#000;
                    }
                    p {
                        display: flex;
                        justify-content: space-between;
                        color: #999;
                        margin: 10px 0;
                        font-size: 16px;
                    }
                    .sort-other {
                        display: flex;
                        justify-content: space-between;
                        span:nth-child(1) {
                            color: #0549a6;
                        }
                    }
                }
            }
        }
    }
}
</style>
