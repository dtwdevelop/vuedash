/**
 * Created by hider on 23/03/2019.
 */
window.Vue = require('vue');
import Vuex from 'vuex' ;
import moment from 'moment';
Vue.use(Vuex);
 export  default    new Vuex.Store({
    state:{
        users : [
            {
                id: 0,
                name: "Boss",
                email: "admin@admin.com",
                type : 1,
                status : true,
                created : "13-04-2019",
                expire : "10-09-2020",
                bundle: "Vip"
            },
            {
                id: 1,
                name: "User",
                email: "admin@admin.com",
                type : 1,
                status : true,
                created : "11-04-2019",
                expire : "12-04-2019",
                bundle: "Vip"
            },



        ],
        su: {
                username: "mintol",
                pass : "mintol",
                active:   false
            }

    },
    mutations: {
        delete(state,p) {
            // изменяем состояние
            var index  = state.users.findIndex(d => d.id == p)
            if(index  != 0 ) state.users.splice(index ,1)

        },

        add(state,u){

            let expire = null
            const id = state.users.length + 1;
            console.log(u.type)
              switch(u.type){
                  case 1: {
                      expire = moment().add(1, 'days').format("MM-DD-YYYY");
                      break;
                  }
                  case 2: {
                      expire =  moment().add(6, 'months').format("MM-DD-YYYY");
                      break;
                  }
                  case 3: {
                      expire = moment().add(365, 'days').format("MM-DD-YYYY");

                      break;
                  }
              }

           
            state.users.push({
                id: id,
                name: u.name,
                email: u.email,
                status : u.status,
                created : moment().format("MM-DD-YYYY"),
                expire : expire,
                bundle: u.bundle
            })
        },
        add_active(state,u){
            state.su.active  = u
        }
    }
});
