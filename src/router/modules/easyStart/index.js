import Layout from '@/layout'

export default {
  path: '/start',
  component: Layout,
  children: [{
    path: 'easyStart',
    name: 'EasyStart',
    component: () => import('@/views/easyStart'),
    meta: { title: '快速上手', icon: 'dashboard' }
  }]
}
