import Home from '../components/home.vue'
import Menu from '../components/menu.vue'
import Category from '../components/category.vue'
import NotFound from '../components/404.vue'
import login from '../components/login.vue'
import personInfo from '../components/about/personInfo.vue'
import aboutInfo from '../components/about/aboutInfo.vue'
import aboutCollection from '../components/about/aboutCollection'
import aboutBug from '../components/about/aboutBug'
import aboutList from '../components/about/aboutList'
import aboutShare from '../components/about/aboutShare'
import aboutArticle from '../components/about/aboutArticle'
import register from '../components/register.vue'
import Article from '../components/article.vue'
import Sort from '../components/sort.vue'
import addArticle from '../components/addArticle.vue'
import categoryArticle from '../components/categoryarticle.vue'
import userList from '../components/userlist.vue'

export default [{
    path: '/',
    component: Home,
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}, {
    path: '/userlist/:user_id',
    component: userList
}, {
    path: '/category',
    component: Category
}, {
    path: '/categoryarticle/:category_id',
    component: categoryArticle
}, {
    path: '/addArticle/:id',
    component: addArticle
}, {
    path: '/addArticle',
    component: addArticle
}, {
    path: '/personInfo',
    component: personInfo
}, {
    path: '/sort',
    component: Sort
}, {
    path: '/article/:article_id',
    component: Article
}, {
    path: '/about',
    component: Menu
}, {
    path: '/aboutCollection',
    component: aboutCollection
}, {
    path: '/aboutArticle',
    component: aboutArticle
}, {
    path: '/aboutList',
    component: aboutList
}, {
    path: '/aboutBug',
    component: aboutBug
}, {
    path: '/aboutInfo',
    component: aboutInfo
}, {
    path: '/aboutShare',
    component: aboutShare
}, {
    path: '/login',
    component: login,
}, {
    path: '/reg',
    component: register,
}, {
    path: '*',
    component: NotFound
}]
