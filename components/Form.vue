<template>
  <div>
   <md-button class="md-primary" @click.native="$router.push('/')" >Back</md-button>
     <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
              <div class="md-title">Users</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="first-name"> Name</label>
                    <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                    <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                  </md-field>
                   <md-field :class="getValidationClass('joTitle')">
                                      <label for="first-name"> About client</label>
                                      <md-input name="job-title" id="first-name" autocomplete="given-name" v-model="form.jobTitle" :disabled="sending" />
                                      <span class="md-error" v-if="!$v.form.jobTitle.required">The job title is required</span>
                                      <span class="md-error" v-else-if="!$v.form.jobTitle.minlength">Invalid job title</span>
                                    </md-field>
                </div>


              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('gender')">
                    <label for="gender">Gender</label>
                    <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                      <md-option></md-option>
                      <md-option value="Male">Male</md-option>
                      <md-option value="Female">Female</md-option>
                    </md-select>
                    <span class="md-error">The gender is required</span>
                  </md-field>
                  <md-field :class="getValidationClass('bundle')">
                                      <label for="gender">Packet bundle</label>
                                      <md-select name="bundle" id="bundle" v-model="form.bundle" md-dense :disabled="sending">
                                        <md-option></md-option>
                                        <md-option value="Basic">Basic</md-option>
                                        <md-option value="Standart">Standart</md-option>
                                         <md-option value="Vip">Vip</md-option>
                                      </md-select>
                                      <span class="md-error">Month is required</span>
                                    </md-field>
                                     <md-field :class="getValidationClass('month')">
                                                        <label for="gender">How much month</label>
                                                        <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                                                          <md-option></md-option>
                                                          <md-option value="1">1 Moth</md-option>
                                                          <md-option value="2">2 Month</md-option>
                                                           <md-option value="3">3 Month</md-option>
                                                        </md-select>
                                                        <span class="md-error">The gender is required</span>
                                                      </md-field>



              </div>
</div>
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>

               <md-field :class="getValidationClass('selectedDate')">
               <label for="first-name"> Select Date</label>
               <md-datepicker v-model="form.selectedDate" md-immediately :disabled="sending" />
               <span class="md-error" v-if="!$v.form.selectedDate.required">The select dateis required</span>

               </md-field>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
            </md-card-actions>
          </md-card>

          <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormCreate',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        joTitle : null,
        gender: null,
        bundle :null,
         email: null,
         selectedDate: null,
         month: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        jobTitle: {
                  required
                },
        gender: {
          required
        },
        email: {
          required,
          email
        },
         selectedDate :{
                required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.gender = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName}`
          this.userSaved = true
          this.sending = false
          this.$store.commit('add',this.form)
          this.clearForm()
        }, 1500),
         window.setTimeout(() => {
                          this.$router.push('/users')
                        }, 1000)

      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>