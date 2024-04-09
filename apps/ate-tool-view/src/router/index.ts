import { createRouter, createWebHashHistory } from 'vue-router'
import PanelView from '../views/PanelView.vue'
import SidebarView from '../views/SidebarView.vue'
import { routes } from '@hf/ate-tool-common'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.panel.panelA.path,
      name: routes.panel.panelA.name,
      component: PanelView
    },
    {
      path: routes.sidebar.sidebarA.path,
      name: routes.sidebar.sidebarA.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SidebarView
    }
  ]
})

export default router
