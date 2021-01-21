const routes = [
   {
      path: '/',
      component: () => import('layouts/EmptyLayout.vue'),
      children: [
         { path: '', component: () => import('pages/Index.vue') },
         { name: 'login', path: 'login', component: () => import('pages/Login.vue') },
      ],
   },

   {
      path: '/protected',
      component: () => import('layouts/MainLayout.vue'),
      children: [
         { name: 'home', path: 'home', component: () => import('pages/Home.vue') },
         { name: 'rule-manager', path: 'rule-manager', component: () => import('pages/RuleManager.vue') },
      ],
   },

   {
      path: '*',
      component: () => import('pages/Error404.vue'),
   },
]

export default routes
