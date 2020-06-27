import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueCarousel from 'vue-carousel'
import Catalog from "../views/Catalog"
import SearchingPage from "../views/SearchingPage"
import Product from "../components/Product"
import Contact from "../views/Contact"
import News from "../views/News"
import SingleArticle from "../views/SingleArticle"

Vue.use(VueRouter)
Vue.use(VueCarousel)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
      meta: {
        title: 'Catalogue'
      }
    },
    {
      path: '/search',
      name: 'searchingPage',
      component: SearchingPage,
      meta: {
        title: 'Recherche'
      }
    },
    {
      path: '/brands/:id/products',
      name: 'brandProducts',
      component: Catalog,
      meta: {
        title: 'Catalogue'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: {
        title: 'News'
      }
    },
    {
      path: '/news/:id',
      name: 'singleArticle',
      component: SingleArticle
    },
    {
      path: '/products/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        title: 'Contact'
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
