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
         <md-table-cell md-label="Created" >{{item.expire | formatNormal }}</md-table-cell>
        <md-table-cell md-label="Expire" >{{ item.expire | formatDate }}</md-table-cell>
         <md-table-cell md-label="Status" md-sort-by="status">{{ item.status }}</md-table-cell>
         <md-table-cell md-label="Action" >
         <md-switch v-model="item.status">Update one month more</md-switch>
          <md-button class="md-primary" v-on:click="update(item.id)"> <md-icon>edit</md-icon></md-button>
          <md-button class="md-accent" v-on:click="del(item.id)"> <md-icon>delete</md-icon></md-button>
         </md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
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