import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  console.log('2.' + data.username)
  return fetch({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

