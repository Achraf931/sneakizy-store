import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import Ionic from '@ionic/vue'
import vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faBars, faShoppingBasket, faSearch, faTruck, faStopwatch, faLock, faHeart, faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft, faEllipsisH, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes, faBars, faShoppingBasket, faSearch, faTruck, faStopwatch, faLock, faHeart, faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft, faEllipsisH, faPlus, faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(vuelidate)

Vue.config.productionTip = false

Vue.use(Ionic)
Vue.prototype.bus = new Vue()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
