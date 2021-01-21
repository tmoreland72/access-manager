<template>
   <q-page padding class="q-px-xl bg-grey-8">
      <div class="q-gutter-md">
         <!-- Heading -->
         <div class="text-h4 text-weight-light text-white">Rules Manager</div>

         <!-- Actions -->
         <div class="row q-gutter-md">
            <q-btn
               color="secondary"
               label="Insert Rule (top)"
               @click="handleCreateRule(0)"
            />
            <q-btn
               color="secondary"
               label="Append Rule (bottom)"
               @click="handleCreateRule"
            />
            <q-btn color="secondary" label="Refresh" @click="handleRefresh" />
            <q-btn
               color="accent"
               outline
               :label="expanded ? 'Collapse All' : 'Expand All'"
               @click="handleToggleExpanded"
            />
         </div>

         <!-- Cards -->
         <div class="q-mt-lg">
            <template v-if="rules.length">
               <div v-for="(rule, index) in rules" :key="index">
                  <rule-card
                     :rule="rule"
                     :index="index"
                     :expanded="expanded"
                     :ruleCount="rules.length"
                     :createRule="createRule"
                     :deleteRule="deleteRule"
                     @refresh="fetchRules"
                  />
                  <div v-if="index < rules.length - 1" class="q-mt-lg column">
                     <q-btn
                        color="secondary"
                        icon="add"
                        label="Insert Rule"
                        @click="handleCreateRule(index + 1)"
                     />
                  </div>
               </div>
            </template>
            <template v-else>
               Put empty component here
            </template>
         </div>
      </div>
   </q-page>
</template>

<script>
   import { date, Notify } from 'quasar'

   export default {
      name: 'RuleManager',

      data() {
         return {
            rules: [],
            expanded: false,
         }
      },

      methods: {
         async fetchRules() {
            let result = await this.$axios.get('/restpoints/authz/rules')
            this.rules = result.data.rules
         },

         async createRule(rule) {
            console.group('createRule')
            console.log(rule)
            try {
               let result = await this.$axios.post(`/restpoints/authz/rules`, rule)
               if (result.status !== 200) {
                  return false
               }
               return true
            } catch (err) {
               console.error('RuleCard', 'createRule', err.message)
               return false
            } finally {
               console.groupEnd()
            }
         },

         async deleteRule(index) {
            console.group('deleteRule')
            console.log(index)
            try {
               let result = await this.$axios.delete(`/restpoints/authz/rules/${index}`)
               if (result.status !== 200) {
                  return false
               }
               console.log('resolve')
               return true
            } catch (err) {
               console.error('RuleCard', 'deleteRule', err.message)
               return false
            } finally {
               console.groupEnd()
            }
         },

         async handleCreateRule(index) {
            try {
               const timestamp = date.formatDate(new Date(), 'YYYYMMDDHHmmss.SSS')
               const rule = {
                  description: timestamp,
                  permit: false,
                  resource: [],
                  perpetrator: {
                     username: [],
                     roles: [],
                     entitlements: [],
                     attributes: {},
                  },
                  perpretrator_device: {},
                  action: [],
               }
               console.log('index', typeof index)
               if (typeof index === 'number') {
                  rule.index = index
               } else {
                  rule.index = this.rules.length
               }

               let result = await this.createRule(rule)
               if (!result) {
                  Notify.create({ type: 'negative', message: 'Create Failed' })
               } else {
                  await this.fetchRules()
                  Notify.create('Create Succeded')
               }
            } catch (err) {
               console.error('RuleCard', 'handleCreateRule', err.message)
               Notify.create({ type: 'negative', message: 'Create Failed' })
            }
         },

         handleRefresh() {
            this.fetchRules()
         },

         handleToggleExpanded() {
            this.expanded = !this.expanded
         },
      },

      components: {
         RuleCard: () => import('components/RuleCard.vue'),
      },

      async mounted() {
         await this.fetchRules()
      },
   }
</script>

<style></style>
