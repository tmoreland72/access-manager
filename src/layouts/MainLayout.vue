<template>
   <q-layout view="hHh Lpr lFf">
      <q-header bordered>
         <q-toolbar style="height: 64px;">
            <q-btn
               flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="leftDrawerOpen = !leftDrawerOpen"
            />

            <q-toolbar-title>
               <div class="row items-center text-secondary">
                  <q-icon name="policy" size="xl" />
                  <span class="q-ml-sm text-h4">Access Manager</span>
               </div>
            </q-toolbar-title>
         </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
         <q-list>
            <q-item-label header>Authorization Engine</q-item-label>
            <!-- Resources Manager -->
            <q-item clickable :to="{ name: 'resource-manager' }">
               <q-item-section avatar>
                  <q-icon color="secondary" name="widgets" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>Resource Manager</q-item-label>
                  <q-item-label caption>Resource Definitions for Rules</q-item-label>
               </q-item-section>
            </q-item>

            <!-- Actions Manager -->
            <q-item clickable :to="{ name: 'actions-manager' }">
               <q-item-section avatar>
                  <q-icon color="secondary" name="touch_app" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>Action Manager</q-item-label>
                  <q-item-label caption>Action Definitions for Rules</q-item-label>
               </q-item-section>
            </q-item>

            <!-- Rules Manager -->
            <q-item clickable :to="{ name: 'rule-manager' }">
               <q-item-section avatar>
                  <q-icon color="secondary" name="rule_folder" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>Rule Manager</q-item-label>
                  <q-item-label caption>Authorization Rules</q-item-label>
               </q-item-section>
            </q-item>

            <q-separator />

            <q-item-label header>Metadirectory</q-item-label>
            <!-- Users -->
            <q-item clickable @click="handleLogout">
               <q-item-section avatar>
                  <q-icon color="secondary" name="person" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>Users</q-item-label>
                  <q-item-label caption>Organizational Users</q-item-label>
               </q-item-section>
            </q-item>

            <!-- Roles -->
            <q-item clickable @click="handleLogout">
               <q-item-section avatar>
                  <q-icon color="secondary" name="group" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>Roles</q-item-label>
                  <q-item-label caption>Organizational Roles</q-item-label>
               </q-item-section>
            </q-item>

            <!-- Entitlements -->
            <q-item clickable @click="handleLogout">
               <q-item-section avatar>
                  <q-icon color="secondary" name="verified" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>Entitlements</q-item-label>
                  <q-item-label caption>Organizational Entitlements</q-item-label>
               </q-item-section>
            </q-item>

            <q-separator />

            <!-- Logout -->
            <q-item clickable @click="handleLogout">
               <q-item-section avatar>
                  <q-icon name="logout" />
               </q-item-section>
               <q-item-section>
                  Logout
               </q-item-section>
            </q-item>
         </q-list>
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
   import { SessionStorage } from 'quasar'

   export default {
      name: 'MainLayout',

      data() {
         return {
            leftDrawerOpen: false,
         }
      },

      methods: {
         handleLogout() {
            SessionStorage.clear()
            delete this.$axios.defaults.headers.common['Authorization']
            this.$router.push({ name: 'login' })
         },
      },
   }
</script>
