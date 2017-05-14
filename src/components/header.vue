<template>
    <div>
        
        <div class="nav">
            <ul class="nav_list" ref="listNav">
                <li class="list" v-for="item in dataList">
                    <router-link :to="item.link">
                        <i class="fa fa-fw" :class="item.icon"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'v-header',
    data() {
        return {
            dataList: [{
                'link': '/home',
                'icon': 'fa-fire'
            }, {
                'link': '/sort',
                'icon': 'fa-home'
            }, {
                'link': '/aboutArticle',
                'icon': 'fa-paper-plane'
            }, {
                'link': '/about',
                'icon': 'fa-user'
            }],
        }
    },
    methods: {
        isShow() {
            this.$store.commit('UPDATE_MENUSHOW');
            // console.log("test")
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
html {
    font-size: 14px;
    background-color: #fff;
}
show {
    transform: translateX(200px);
}
#app {
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0;
}
.slide {
    transition: all .25s ease-in-out;
}
.slide-enter-active,.slide-leave-active{
    transition: all .25s ease-in-out;
}
.aside_list{
    width:100%;
    height:50px;
    line-height:50px;
    color: #666;
    span{
        float: left;
        font-size:1.75rem;
        display:inline-block;
    }
    span:nth-child(2){
        padding-left: 1em;
    }
    i{
        font-size:1.75rem;
        padding: 0 1rem;
    }
}
.nav,.login_box{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    border-top: 1px solid #eee;
}
.nav {
    border: none;
    height: 50px;
    background: #fff;
    border-top: 1px solid #eee;
}

.nav_list {
    .router-link-active i {
        color: #428DFF;
    }
    list-style-type: none;
    padding: 0;
    font-size: 0;
}
.fade-enter-active, .fade-leave-active{
    transition: all .2s ease;
}
.list {
    display: inline-block;
    vertical-align: middle;
    width: 24%;
    padding: 0 .5%;
}
.list i {
    line-height: 50px;
    color: #bbb;
    font-size: 1.85rem;
}
</style>