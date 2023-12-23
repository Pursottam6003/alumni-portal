import styles from './ProfileLayout.module.scss'
import { NavLink } from "react-router-dom"
import { User as UserIcon, Suitcase as SuitcaseIcon, Book as BookIcon, Settings as SettingsIcon, LogOut as LogOutIcon } from 'iconoir-react'
import cx from 'classnames'
import { useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const ProfileLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useUser();

  const profileLinks = [
    { name: 'Personal details', path: '/profile', icon: UserIcon, },
    { name: 'Academic details', path: '/profile/academic', icon: BookIcon, },
    { name: 'Professional details', path: '/profile/professional', icon: SuitcaseIcon, },
  ]

  const accountLinks = [
    { name: 'Account settings', path: '/profile/account', icon: SettingsIcon, },
    { name: 'Logout', path: '/', icon: LogOutIcon, action: logout }
  ]

  return (
    <div className={`${styles["layout"]}`}>
      <div className={`${styles["sidebar"]}`}>
        <nav className={`${styles["sidebar-nav"]}`}>
          <div className={`${styles["sidebar-nav-header"]}`}>
            <h2>Alumni Profile</h2>
          </div>
          <ul>
            {profileLinks.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path}
                  className={cx(
                    styles['sidebar-nav-link'],
                    { [styles['active']]: location.pathname === link.path })
                  }>
                  <link.icon />
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={`${styles["sidebar-nav-header"]}`}>
            <h2>Account</h2>
          </div>
          <ul>
            {accountLinks.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path}
                onClick={(e) => {
                  if (link.action) link.action();
                }}
                  className={cx(
                    styles['sidebar-nav-link'],
                    { [styles['active']]: location.pathname === link.path })
                  }>
                  <link.icon />
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`${styles["content"]}`}>
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout;