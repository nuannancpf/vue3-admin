import Layout from '@/layout/index.vue'

export default {
      path: '/nested',
      name: 'Nested',
      component: Layout,
      redirect: '/nested',
      // alwaysShow: true,
      meta: {
            title: '路由嵌套',
            icon: 'HelpFilled'
      },
      children: [
            {
                  path: 'menu1',
                  component: () => import('@/views/nested/menu1/index.vue'),
                  name: 'menu1',
                  meta: { title: '菜单1', icon: 'Menu' },
                  // alwaysShow: true,
                  redirect: '/nested/menu1/menu1-1',
                  children: [
                        {
                              path: 'menu1-1',
                              alwaysShow: true,
                              component: () => import('@/views/nested/menu1-1/index.vue'),
                              name: 'menu1-1',
                              meta: { title: '菜单 1-1', icon: 'Menu' }
                        },
                        {
                              path: 'menu1-2',
                              component: Layout,
                              name: 'menu1-2',
                              redirect: '/nested/menu1/menu1-2/menu1-2-1',
                              meta: { title: '菜单 1-2', icon: 'Menu' },
                              children: [
                                    {
                                          path: 'menu1-2-1',
                                          component: () => import('@/views/nested/menu1-2-1/index.vue'),
                                          name: 'menu1-2-1',
                                          alwaysShow: true,
                                          meta: { title: '菜单 1-2-1', icon: 'Menu' }
                                    },
                                    {
                                          path: 'menu1-2-2',
                                          component: () => import('@/views/nested/menu1-2-2/index.vue'),
                                          name: 'menu1-2-2',
                                          alwaysShow: true,
                                          meta: { title: '菜单 1-2-2', icon: 'Menu' }
                                    }
                              ]
                        },
                  ]
            },
            {
                  path: 'menu2',
                  component: () => import('@/views/nested/menu2/index.vue'),
                  name: 'Menu2',
                  alwaysShow: true,
                  meta: { title: 'Menu2', icon: 'Menu',  }
            },

      ]
}
