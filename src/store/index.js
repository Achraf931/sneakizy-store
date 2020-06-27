import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products/index'
import brands from './modules/brands/index'
import news from './modules/news/index'
import notifications from './modules/notifications/index'
import loader from './modules/loader/index'
import admin from './modules/admin/index'

import axios from 'axios'
axios.defaults.baseURL = 'https://sneakizy.herokuapp.com'
axios.defaults.headers.common['Content-Type'] = 'application/json'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    brands,
    news,
    notifications,
    loader,
    admin
  }
})
