<template>
   <q-page class="flex flex-center bg-primary">
      <q-card class="q-pa-xl bg-grey-8 text-white" style="width: 320px; max-width: 80%;">
         <q-card-section>
            <span class="text-h4 text-weight-thin">Login</span>
         </q-card-section>
         <q-card-section>
            <q-form class="q-gutter-sm" @submit="handleLogin">
               <q-input label="Email Address" v-model="form.email" />
               <q-input label="Password" type="password" v-model="form.password" />
               <div class="q-mt-lg row justify-end">
                  <q-btn color="secondary" label="login" type="submit" />
               </div>
            </q-form>
         </q-card-section>
      </q-card>
   </q-page>
</template>

<script>
   import { Notify, SessionStorage } from 'quasar'

   export default {
      name: 'Login',

      data() {
         return {
            form: {
               email: 'tmoreland@idauto.net',
               password: 'idAuto#123',
            },
         }
      },

      methods: {
         async handleLogin() {
            try {
               let result = await this.$axios.post('/sessions', {
                  username: this.form.email,
                  password: this.form.password,
               })
               console.log(result)
               if (!result.status === 200) {
                  Notify.create({ color: 'negative', message: 'Login Failed' })
               }
               const session = result.data.session
               SessionStorage.set('session', session)
               this.$axios.defaults.headers.common[
                  'Authorization'
               ] = `Bearer ${session.token}`
               Notify.create({
                  color: 'positive',
                  message: `Welcome back, ${session.user.firstName}`,
               })
               this.$router.push({ name: 'home' })
            } catch (err) {
               console.error('Login', 'handleLogin', err.message)
            }
         },
      },
   }
</script>

<style></style>
