/**
 * Created by hider on 23/03/2019.
 */
window.Vue = require('vue');
import Vuex from 'vuex' ;
Vue.use(Vuex);
 export  default    new Vuex.Store({
    state:{
        users : [
            {
                id: 0,
                name: "Admin",
                email: "admin@admin.com",
                gender: "Male",
                title: "Main boss",
                status : true,
                expire : "2020-04-26",
                bundle: "Vip"
            },
            {
                id: 1,
                name: "Client",
                email: "admin@admin.com",
                gender: "Male",
                title: "Main boss",
                status : true,
                expire : "2019-04-26",
                bundle: "Standart"
            },

        ],
        su: {
                username: "mintol",
                pass : "mintol1987",
                active:   false
            }

    },
    mutations: {
        delet(state,p) {
            // изменяем состояние
            var index  = state.users.findIndex(d => d.id == p)
            if(index  != 0 ) state.users.splice(index ,1)

        },

        add(state,u){
            var id = state.users.length + 1;
            state.users.push({
                id: id,
                name: u.firstName,
                title: u.jobTitle,
                email: u.email,
                gender: u.gender,
                title: "Client",
                status : "Valid",
                expire : u.selectedDate,
                bundle: u.bundle
            })
        },
        add_active(state,u){
            state.su.active  = u
        }
    }
});