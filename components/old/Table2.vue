<template>
<div class="md-layout">
    <md-table v-model="searched" md-sort="expire"  md-sort-order="desc" md-card  >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
         <md-button class="md-primary" @click.native="$router.push('/create')" >Create user</md-button>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${search}' Create first user`">
        <md-button class="md-primary" @click.native="$router.push('/create')" >Create user</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>

         <md-table-cell md-label="Bundle" md-sort-by="bundle">{{ item.bundle}}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
         <md-table-cell md-label="Created" >{{item.created | formatNormal }}</md-table-cell>
        <md-table-cell md-label="Expire" >{{ item.expire | formatDate }}</md-table-cell>
         <md-table-cell md-label="Status" md-sort-by="status">{{ item.status }}</md-table-cell>
          <md-table-cell md-label="Update Subscribe" >
          <md-switch v-model="item.status" @change="alert(item.expire,item.status)">2 Month +</md-switch>
           </md-table-cell>
         <md-table-cell md-label="Action" >
          <md-button class="md-primary" v-on:click="update(item.id)"> <md-icon>edit</md-icon></md-button>
          <md-button class="md-accent" v-on:click="del(item.id)"> <md-icon>delete</md-icon></md-button>
         </md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    }
  }
</script>

<script>
//old
import moment from 'moment/moment'
  const toLower = text => {
    return text.toString().toLowerCase()
  }
const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }
export default {
    name: 'TableSearch',
    data: () => ({
      search: null,
      searched: [],



    }),
    methods: {
      alert(d,s){
      if(s == true){
      var  dn =  moment(String(d)).day(62).format('YYYY.MM.DD');
      window.alert(dn)
      }
      else{
       window.alert("Status is true")
      }
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      },


      del(id){
       this.$store.commit('delet',id);

      },
      add_user(){
      this.$store.commit('add')
      }

    },

    created () {
      this.searched = this.users
    },
    computed: {
      users () {
        return this.$store.state.users
      }
      }
}
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
</style>
