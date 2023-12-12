import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.scss'
import cx from 'classnames'

const NavLi = ({ label, href }) => (
  <li className={styles['nav-li']}>
    <NavLink className={state => cx(
      styles['link'],
      { [styles['active']]: state.isActive }
    )} to={href}>{label}</NavLink>
  </li>
)

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Register', href: '/register' },
  { label: 'Login', href: '/login' },
]

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={cx(styles['nav-container'], 'container')}>
        <div className={styles.logo}>
          <img src="/navbar-banner.svg" alt="spotify logo" height={48} />
        </div>
        <ul className={styles['nav-list']}>
          {links.map(( link, index) => <NavLi key={index} {...link} />)}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;