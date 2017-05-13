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

export default [{
    path: '/',
    component: Home,
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}, {
    path: '/category',
    component: Category
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
    path: '/article',
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