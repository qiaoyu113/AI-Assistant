export default [
  {
    path: '/conversation',
    name: 'Conversation',
    component: resolve => require(['@/views/conversation/index'], resolve),
    meta: {
      title: 'Conversation'
    }
  }
]

