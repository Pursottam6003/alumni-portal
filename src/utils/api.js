const login = (user) => fetch('/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
})
  .then(res => res.json())
  .catch(err => console.log(err))

const logout = () => fetch('/users/logout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then(res => res.json()).catch(err => console.log(err))

const checkAuth = () => fetch('/users/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then(res => res.json()).catch(err => console.log(err))

const profile = () => fetch('/users/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then(res => res.json()).catch(err => console.log(err))

export { login as loginApi, logout as logoutApi, checkAuth as checkAuthApi, profile as profileApi };