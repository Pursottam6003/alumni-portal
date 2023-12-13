import { useEffect, useState } from 'react'
import { checkAuthApi, loginApi, logoutApi, profileApi } from '../utils/api'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const login = (user) => loginApi(user).then(data => {
    console.log(data)
    if (data.user !== null) {
      setUser(data.user)
      setAdmin(data.user.admin)
    }
  })

  const logout = () => logoutApi().catch(err => {
    console.log(err)
  }).finally(() => {
    setUser(null)
    setAdmin(false)
  })

  const checkAuth = () => {
    setLoading(true);
    checkAuthApi().then(data => {
      if (data.error) {
        setUser(null)
        setAdmin(false)
      } else {
        // fetch profile
        profileApi().then(data => {
          if (data.error) {
            setUser(null)
            setAdmin(false)
          } else {
            setUser(data.user)
            setAdmin(data.user.admin)
          }
        })
      }
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    checkAuth();
  }, [])

  return { user, admin, loading, login, logout, checkAuth }
}

export default useAuth;