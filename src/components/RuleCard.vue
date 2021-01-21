<template>
   <q-card class="q-mt-lg q-pb-lg shadow-7" square>
      <!-- Rule Header -->
      <template>
         <q-card-section class="bg-grey-9 text-white">
            <div class="text-overline">Rule {{ index + 1 }} of {{ ruleCount }}</div>
            <div class="row justify-between">
               <q-item-label class="text-h5 text-weight-medium">{{
                  rule.description
               }}</q-item-label>

               <div class="row q-gutter-sm">
                  <q-btn color="secondary" icon="delete" round @click="handleDeleteRule">
                     <q-tooltip>Delete rule</q-tooltip>
                  </q-btn>
                  <q-btn
                     v-if="index !== 0"
                     color="primary"
                     icon="arrow_upward"
                     round
                     @click="handleMoveRule"
                  >
                     <q-tooltip>Move up</q-tooltip>
                  </q-btn>
               </div>
            </div>
            <q-item-label>
               <q-toggle
                  color="secondary"
                  v-model="rule.permit"
                  :label="rule.permit ? 'Permit' : 'Deny'"
                  @input="handlePermitToggle"
               />
            </q-item-label>
         </q-card-section>
      </template>

      <!-- Resources -->
      <template v-if="expanded">
         <q-card-section class="bg-grey-5 text-grey-9">
            <div>
               <div class="text-h6 text-weight-light">Resources</div>
            </div>
         </q-card-section>
         <q-card-section>
            <div>
               <q-btn
                  color="positive"
                  icon="add"
                  label="add resource"
                  size="sm"
                  @click="handleAddResource"
               />
            </div>
            <div class="q-mt-md">
               <template v-if="rule.resource.length">
                  <q-list bordered separator>
                     <q-item v-for="resource in rule.resource" :key="resource">
                        <q-item-section>
                           <q-item-label>{{ resource }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn
                              color="negative"
                              dense
                              icon="remove"
                              round
                              size="sm"
                              @click="handleRemoveResource"
                           />
                        </q-item-section>
                     </q-item>
                  </q-list>
               </template>
               <template v-else>
                  <q-item-label>No resources defined</q-item-label>
               </template>
            </div>
         </q-card-section>
      </template>

      <!-- Identity -->
      <template v-if="expanded">
         <q-card-section class="bg-grey-5 text-grey-9">
            <div>
               <div class="text-h6 text-weight-light">Identity</div>
            </div>
         </q-card-section>
         <q-card-section>
            <div class="text-body1">Usernames</div>
            <div class="q-mt-sm">
               <q-btn color="positive" icon="add" label="add username" size="sm" />
            </div>
            <div class="q-mt-md">
               <template v-if="rule.perpetrator.username.length">
                  <q-list bordered separator>
                     <q-item
                        v-for="username in rule.perpetrator.username"
                        :key="username"
                     >
                        <q-item-section>
                           <q-item-label>{{ username }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="negative" dense icon="remove" round size="sm" />
                        </q-item-section>
                     </q-item>
                  </q-list>
               </template>
               <template v-else>
                  <q-item-label class="q-ml-xl text-caption text-grey-5"
                     >No usernames defined</q-item-label
                  >
               </template>
            </div>
         </q-card-section>
         <q-card-section>
            <div class="text-body1">Roles</div>
            <div class="q-mt-sm">
               <q-btn color="positive" icon="add" label="add role" size="sm" />
            </div>
            <div class="q-mt-md">
               <template v-if="rule.perpetrator.roles.length">
                  <q-list bordered separator>
                     <q-item v-for="role in rule.perpetrator.roles" :key="role">
                        <q-item-section>
                           <q-item-label>{{ role }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="negative" dense icon="remove" round size="sm" />
                        </q-item-section>
                     </q-item>
                  </q-list>
               </template>
               <template v-else>
                  <q-item-label class="q-ml-xl text-caption text-grey-5"
                     >No roles defined</q-item-label
                  >
               </template>
            </div>
         </q-card-section>
         <q-card-section>
            <div class="text-body1">Entitlements</div>
            <div class="q-mt-sm">
               <q-btn color="positive" icon="add" label="add entitlement" size="sm" />
            </div>
            <div class="q-mt-md">
               <template v-if="rule.perpetrator.entitlements.length">
                  <q-list bordered separator>
                     <q-item
                        v-for="entitlement in rule.perpetrator.entitlements"
                        :key="entitlement"
                     >
                        <q-item-section>
                           <q-item-label>{{ entitlement }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="negative" dense icon="remove" round size="sm" />
                        </q-item-section>
                     </q-item>
                  </q-list>
               </template>
               <template v-else>
                  <q-item-label class="q-ml-xl text-caption text-grey-5"
                     >No entitlements defined</q-item-label
                  >
               </template>
            </div>
         </q-card-section>
         <q-card-section>
            <div class="text-body1">Attributes</div>
            <div class="q-mt-sm">
               <q-btn color="positive" icon="add" label="add attribute" size="sm" />
            </div>
            <div class="q-mt-md">
               <template v-if="Object.keys(rule.perpetrator.attributes).length">
                  <q-list bordered separator>
                     <q-item
                        v-for="attribute in Object.keys(rule.perpetrator.attributes)"
                        :key="attribute"
                     >
                        <q-item-section>
                           <q-item-label>{{ attribute }}</q-item-label>
                        </q-item-section>
                        <q-item-section>
                           <q-item-label>{{
                              rule.perpetrator.attributes[attribute]
                           }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="negative" dense icon="remove" round size="sm" />
                        </q-item-section>
                     </q-item>
                  </q-list>
               </template>
               <template v-else>
                  <q-item-label class="q-ml-xl text-caption text-grey-5"
                     >No attributes defined</q-item-label
                  >
               </template>
            </div>
         </q-card-section>
      </template>

      <!-- Actions -->
      <template v-if="expanded">
         <q-card-section class="bg-grey-5 text-grey-9">
            <div>
               <div class="text-h6 text-weight-light">Actions</div>
            </div>
         </q-card-section>
         <q-card-section>
            <div>
               <q-btn color="positive" icon="add" label="add action" size="sm" />
            </div>
            <div class="q-mt-md">
               <template v-if="rule.action.length">
                  <q-list bordered separator>
                     <q-item v-for="action in rule.action" :key="action">
                        <q-item-section>
                           <q-item-label>{{ action }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="negative" dense icon="remove" round size="sm" />
                        </q-item-section>
                     </q-item>
                  </q-list>
               </template>
               <template v-else>
                  <q-item-label>No actions defined</q-item-label>
               </template>
            </div>
         </q-card-section>
      </template>
   </q-card>
</template>

<script>
   import { Notify } from 'quasar'

   export default {
      name: 'RuleCard',

      props: {
         rule: {
            type: Object,
            required: true,
         },
         index: {
            type: Number,
            required: true,
         },
         expanded: {
            type: Boolean,
            default: true,
         },
         ruleCount: {
            type: Number,
            required: true,
         },
         deleteRule: {
            type: Function,
            required: true,
         },
         createRule: {
            type: Function,
            required: true,
         },
      },

      data() {
         return {
            tab: 'resource',
         }
      },

      methods: {
         async handleDeleteRule() {
            try {
               let result = await this.deleteRule(this.index)
               if (!result) {
                  Notify.create({ type: 'negative', message: 'Delete Failed' })
               } else {
                  Notify.create('Delete Completed')
               }
            } catch (err) {
               console.error('RuleCard', 'handleDeleteRule', err.message)
               Notify.create({ type: 'negative', message: 'Delete Failed' })
            } finally {
               this.$emit('refresh')
            }
         },

         async handleMoveRule() {
            try {
               let result = await this.deleteRule(this.index)

               let rule = { ...this.rule }
               rule.index = this.index - 1
               result = await this.createRule(rule)
               Notify.create('Move Completed')
            } catch (err) {
               console.error('RuleCard', 'handleDeleteRule', err.message)
               Notify.create({ type: 'negative', message: 'Delete Failed' })
            } finally {
               this.$emit('refresh')
            }
         },

         async handlePermitToggle(rule) {
            try {
               let result = await this.deleteRule(this.index)

               let rule = { ...this.rule }
               rule.index = this.index
               console.log('toggle', rule)
               result = await this.createRule(rule)
               Notify.create('Permission Toggle Completed')
            } catch (err) {
               console.error('RuleCard', 'handleDeleteRule', err.message)
               Notify.create({ type: 'negative', message: 'Delete Failed' })
            } finally {
               this.$emit('refresh')
            }
         },

         async handleAddResource() {},

         async handleRemoveResource() {},
      },
   }
</script>

<style></style>
