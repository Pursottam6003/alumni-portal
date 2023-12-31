const checkResponse = (response) => {
  if (response.status === 500) {
    throw new Error('Server error')
  }
  return response.json();
}

const login = (user) => fetch('/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
}).then(checkResponse).catch(err => console.log(err))

const logout = () => fetch('/users/logout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then(checkResponse).catch(err => console.log(err))

const signup = (user) => fetch('/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
}).then(checkResponse).catch(err => console.log(err))

const checkAuth = () => fetch('/users/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then(checkResponse).catch(err => console.log(err))

const profile = () => fetch('/users/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then(checkResponse).catch(err => console.log(err))

const user = (id) => {
  const fetchUrl = id ? `/user?id=${id}` : `/users`;
  return fetch(fetchUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResponse).catch(err => console.log(err))
}

export {
  login as loginApi,
  logout as logoutApi,
  checkAuth as checkAuthApi,
  profile as profileApi,
  signup as signupApi,
  user as userApi
};