export default [
  {
    path: '/demo',
    name: 'Demo',
    component: resolve => require(['@/views/demo/index'], resolve),
    meta: {
      title: 'demo'
    }
  }
]

