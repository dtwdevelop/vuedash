<template>
    <div>
        <v-toolbar flat color="dark">
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Create client</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline"></span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-layout wrap justify-center column fill-height>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                    <v-select v-model="editedItem.bundle"  :items="optionSelect.bundle" item-value="editedItem.bundle" item-text="editedItem.bundle" label="Bundles"></v-select>
                                    <v-select  v-model="editedItem.type" hint="Select package type" :items="optionSelect.type" item-value="id" item-text="text" label="How long"></v-select>
                                    <v-text-field v-if="editedItem.expire != null " v-model="editedItem.expire" label="Expire"></v-text-field>
                                    <v-checkbox v-model="editedItem.status" :label=" `Status active ` "></v-checkbox>
                                    <v-spacer></v-spacer>
                                    <v-checkbox v-model="choice" :label=" `Advanced setting ` "></v-checkbox>
                                    <v-menu v-if="choice" v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="picker" label="Select date manually" prepend-icon="event" readonly v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="picker" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card>
            <v-card-title>
                Clients
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="users" :search="search" :pagination.sync="pagination">
                <template v-slot:items="props">
                    <td class="text-xs">{{ props.item.id }}</td>
                    <td class="text-xs">{{ props.item.name }}</td>
                    <td class="text-xs">{{ props.item.email }}</td>
                    <td class="text-xs">{{ props.item.bundle }}</td>
                    <td class="text-xs">{{ props.item.created }}</td>
                    <td class="text-xs">{{ props.item.expire }}</td>
                    <td class="text-xs">
                        <v-icon v-if="props.item.expire < current_date">highlight_off</v-icon>
                        <v-icon v-if="props.item.expire > current_date">highlight_on</v-icon>
                    </td>
                    <td class="justify-center layout px-0">
                        <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                        <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                    </td>
                </template>
                <v-alert v-slot:no-results :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {

            return {
                picker: new Date().toISOString().substr(0, 10),
                modal: false,
                menu2: false,
                choice: false,
                current_date:   moment().format("MM-DD-YYYY"),


                editedIndex: -1,
                search: '',
                dialog: false,
                
                optionSelect: {

                    bundle: ["Basic", "Middle", "Vip"],
                    type: [{id:1 , text:"One day"} , {id:2 , text:"6 month "} , {id:3 ,text:"1 years"} ],
                },

                editedItem: {
                    id : '',
                    name: '',
                    email: '',
                    bundle: '',
                    type: '',
                    created: '',
                    expire: null,
                    status: false ,

                },
                pagination: {
                    'sortBy': 'expire', 'descending': false, 'rowsPerPage': 10
                },
                headers: [
                    {
                        text: 'Id',

                        sortable: false,
                        value: 'id'
                    },
                    {text: 'Name', align: 'left', value: 'name'},
                    {text: 'Email', align: 'left', value: 'email'},

                    {text: 'Bundle', align: 'left', value: 'bundle'},
                    {text: 'Created', align: 'left', value: 'created', sortable: false},
                    {text: 'Expire', align: 'left', value: 'expire'},
                    {text: 'Status', align: 'left', value: 'status'},

                ],

            }
        },
        methods: {
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndex], this.editedItem)
                } else {
                    this.$store.commit('add',this.editedItem)
                }
                this.close()
            },
            editItem(item) {
                this.editedIndex = this.users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {

                confirm('Are you sure you want to delete this item?') && this.del(item.id)
            },


            del(id) {
                this.$store.commit('delete', id);
            },

            searchOnTable() {
                this.search = toLower(this.search)
            },

            customSort(items, index, isDesc) {

                items.sort((a, b) => {

                    if (index === "expire") {
                        console.log(b.expire, a.expire)
                        if (!isDesc) {

                            return b.expire - a.expire;
                        } else {
                            return a.expire - b.expire;
                        }
                    } else {
                        if (!isDesc) {
                            return a[index] < b[index] ? -1 : 1;
                        } else {
                            return b[index] < a[index] ? -1 : 1;
                        }
                    }
                });
                return items;
            }
        },

        created() {
            this.searched = this.users

        },

        computed: {
            users() {
                return this.$store.state.users
            }


        }

    }
</script>
