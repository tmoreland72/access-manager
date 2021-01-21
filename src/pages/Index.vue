<template>
   <q-page class="flex flex-center bg-primary">
      <div class="column items-center q-gutter-lg text-secondary">
         <q-icon name="policy" size="220px" />
         <span class="q-ml-sm text-h2">Access Manager</span>
         <span class="q-ml-sm text-h3 text-weight-thin">for RapidIdentity</span>
         <div class="q-mt-xl">
            <q-btn
               color="secondary"
               label="get started"
               :to="{ name: 'login' }"
               size="xl"
            />
         </div>
      </div>
   </q-page>
</template>

<script>
   export default {
      name: 'PageIndex',
   }
</script>
