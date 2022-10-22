import axios from 'axios';
import { createApp } from 'vue'
import VueAxios from 'vue-axios';
import App from './App.vue'
import WordPair from './components/WordPair.vue';
import WordAdd from './components/WordAdd.vue';
import Popup from './components/Popup.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const app = createApp(App);

app.component('word-pair', WordPair);
app.component('word-add', WordAdd);
app.component('popup', Popup);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
