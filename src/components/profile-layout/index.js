import styles from './ProfileLayout.module.scss'
import { NavLink } from "react-router-dom"
import { User as UserIcon, Suitcase as SuitcaseIcon, Book as BookIcon, Settings as SettingsIcon } from 'iconoir-react'

const ProfileLayout = ({ children }) => {
  const profileLinks = [
    { name: 'Personal details', path: '/profile', icon: UserIcon, },
    { name: 'Academic details', path: '/profile/academic', icon: BookIcon, },
    { name: 'Professional details', path: '/profile/professional', icon: SuitcaseIcon, },
  ]

  const accountLinks = [
    { name: 'Account settings', path: '/profile/account', icon: SettingsIcon, },
  ]

  return (
    <div className={`${styles["layout"]}`}>
      <div className={`${styles["sidebar"]}`}>
        <nav className={`${styles["sidebar-nav"]}`}>
          <ul>
            {profileLinks.map((link, index) => (
              <li key={index}>
                <link.icon />
                <NavLink to={link.path} activeClassName={`${styles["active"]}`}>{link.name}</NavLink>
              </li>
            ))}
          </ul>

          <ul>
            {accountLinks.map((link, index) => (
              <li key={index}>
                <link.icon />
                <NavLink to={link.path} activeClassName={`${styles["active"]}`}>{link.name}</NavLink>
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