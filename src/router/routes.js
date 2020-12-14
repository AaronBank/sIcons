/*
 * @Author: your name
 * @Date: 2020-12-11 23:26:56
 * @LastEditTime: 2020-12-12 01:09:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kangkang/src/router/routes.js
 */
export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/install',
    name: 'install',
    component: () => import('@/views/Install')
  },
  {
    path: '/search/:q',
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/user/:userId',
    name: 'userPage',
    component: () => import('@/views/User'),
    children: [
      // 字体图标库
      {
        path: '/user/:userId/repo',
        name: 'userRepoModule',
        component: () => import('@/views/Repo'),
        children: [
          {
            path: '/user/:userId/repo/list',
            name: 'userRepoListModule',
            component: () => import('@/views/Repo/List')
          },
          {
            path: '/user/repo/add',
            name: 'userRepoAddModule',
            component: () => import('@/views/Repo/Add')
          },
          {
            path: '/user/:userId/repo/:repoId/edit',
            name: 'userRepoEditModule',
            component: () => import('@/views/Repo/Add')
          },
          {
            path: '/user/:userId/repo/:repoId',
            name: 'userRepoDetailModule',
            component: () => import('@/views/Repo/Detail')
          }
        ]
      },
      // 字体图标
      {
        path: '/user/:userId/icon',
        name: 'userIconModule',
        component: () => import('@/views/Icon'),
        children: [
          {
            path: '/user/:userId/icon/list',
            name: 'userIconListModule',
            component: () => import('@/views/Icon/List')
          },
          {
            path: '/user/:userId/icon/add',
            name: 'userIconAddModule',
            component: () => import('@/views/Icon/Add')
          },
          {
            path: '/user/:userId/icon/add/:repoId',
            name: 'userIconAdd2RepoModule',
            component: () => import('@/views/Icon/Add')
          }
        ]
      }
    ]
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/views/Docs'),
    children: [
      {
        path: '/docs/introduce',
        name: 'docsIntroduce',
        component: () => import('@/views/Docs/Introduce')
      },
      {
        path: '/docs/trouble',
        name: 'docsTrouble',
        component: () => import('@/views/Docs/Trouble')
      },
      {
        path: '/docs/iconMaker',
        name: 'docsIconMaker',
        component: () => import('@/views/Docs/IconMaker')
      }
    ]
  }
]
