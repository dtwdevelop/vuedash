/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');
window.Vue = require('vue');
//import VueMaterial from 'vue-material';
import VueMaterial from 'vue-material' ;
import 'vuetify/dist/vuetify.min.css'
//import 'vue-material/dist/vue-material.min.css';
//import 'vue-material/dist/theme/default-dark.css';
import moment from 'moment' ;
import VueRouter from 'vue-router';
import TableSearch  from  './components/Table.vue';
import FormCreate from  './components/Form.vue';
import Login from  './components/Login.vue';
//import Dialog from  './components/Dialog.vue'
import  store  from  './state' ;
import Vuetify from 'vuetify'


Vue.use(VueRouter);
Vue.use(Vuetify);




Vue.filter('formatDate', function(value) {
    if (value) {

        return moment(String(value)).day(31).format('YYYY.MM.DD');

    }
});

Vue.filter('formatNormal', function(value) {
    if (value) {

        return moment(String(value)).format('YYYY/MM/DD');

    }
});



// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

//Vue.component('icon-component', require('./components/Icon.vue').default);
Vue.component('app-component', require('./components/App.vue').default);
//Vue.component('dialog', Dialog);

const routes = [
    { path: '/users', component: TableSearch },
    { path: '/', component: TableSearch },
    { path: '/create', component: FormCreate },
    { path: '/login', component: Login},
    {path: '*' , TableSearch}

]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
const router = new VueRouter({
    mode: 'history',
    routes // сокращённая запись для `routes: routes`
})
const app = new Vue({
    router,
    store,
}).$mount('#app');
