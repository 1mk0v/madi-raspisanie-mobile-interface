import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faMagnifyingGlass, faUser, faUsers, faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import './registerServiceWorker'


library.add(faMagnifyingGlass, faUser, faUsers, faDoorClosed)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
