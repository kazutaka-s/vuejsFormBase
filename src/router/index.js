import Vue from 'vue'
import Router from 'vue-router'
import Scene1 from '@/components/Scene1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Scene1
    }
  ]
})
