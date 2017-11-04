import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '图表',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'example',
    noDropdown: true,
    children: [{ path: 'index', component: _import('introduction/index'), name: '简述' }]
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/interview',
    component: Layout,
    redirect: '/interview/index',
    name: '人才规则',
    icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'invitation1', icon: 'tab', component: _import('screening/table/dynamictable/index'), name: '简历筛选' },
      { path: 'invitation', icon: 'tab', component: _import('interview/tab/index'), name: '面试邀请' },
      { path: 'result', icon: 'excel', component: _import('interview/table/dragTable'), name: '面试结果' },
      { path: 'hire', icon: 'excel', component: _import('interview/table/inlineEditTable'), name: '录用情况' }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/index',
    name: '员工管理',
    icon: 'user',
    children: [
      { path: 'trial', component: _import('components/trial'), name: '试用期' },
      { path: 'official', component: _import('staff/index'), name: '正式员工' }
    ]
  },
  {
    path: '/week',
    component: Layout,
    redirect: '/excel/download',
    name: '绩效管理',
    icon: 'trendChart3',
    children: [
      { path: 'statistics', component: _import('week/table/table'), name: '概况' },
      { path: 'replenish', icon: 'form', component: _import('week/form'), name: '周报' }
    ]
  },
  {
    path: '/askaleave',
    component: Layout,
    redirect: '/excel/download',
    name: '薪资福利',
    icon: 'bug',
    children: [
      { path: 'edit', icon: 'form', component: _import('askaleave/form'), name: '写请假单', meta: { isEdit: true }},
      { path: 'statistics', component: _import('askaleave/table/table'), name: '汇总' }
    ]
  },
  {
    path: '/vacate',
    component: Layout,
    redirect: 'noredirect',
    name: '合同管理',
    icon: 'eye',
    children: [
      { path: 'bye', component: _import('vacate/form'), name: '离职申请' },
      { path: 'seeyouagain', component: _import('vacate/table/table'), name: '确认离职' }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: 'noredirect',
    name: '系统管理',
    icon: 'star',
    children: [
      { path: 'organization', component: _import('manage/organization'), name: '机构管理' },
      { path: 'poast', component: _import('manage/post'), name: '岗位管理' }
    ]
  },
  {
    path: '/law',
    component: Layout,
    redirect: 'noredirect',
    name: 'law',
    icon: 'lock ',
    noDropdown: true,
    children: [{ path: 'index', component: _import('law/index'), name: '法律条款' }]
  },

  { path: '*', redirect: '/404', hidden: true }
]
