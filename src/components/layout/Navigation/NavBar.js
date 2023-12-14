import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.scss'
import cx from 'classnames'
import { ReactComponent as MenuIcon } from '.././../../assets/hamburger.svg'
import { ReactComponent as ProfileIcon } from '.././../../assets/profile.svg'

const NavLi = ({ label, href }) => {
  const closeMobileNav = () => {
    const mobileNav = document.querySelector(`.${styles['mobile-nav']}`)
    mobileNav.classList.remove(styles['show'])
    setTimeout(() => {
      mobileNav.style.display = 'none'
    }, 300);
  }

  return (
    <li className={styles['nav-li']}>
      <NavLink className={state => cx(
        styles['link'],
        { [styles['active']]: state.isActive }
      )} to={href}
      onClick={closeMobileNav}>
        <span className={styles['link-txt']}>{label}</span>
      </NavLink>
    </li>
  )
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Register', href: '/register' },
  { label: 'Login', href: '/login' },
]

const Navbar = () => {
  const toggleMobileNav = (e) => {
    e.preventDefault();
    const mobileNav = document.querySelector(`.${styles['mobile-nav']}`)
    if (mobileNav.classList.contains(styles['show'])) {
      mobileNav.classList.remove(styles['show'])
      setTimeout(() => {
        mobileNav.style.display = 'none'
      }, 300);
    } else {
      mobileNav.style.display = 'block'
      setTimeout(() => {
        mobileNav.classList.add(styles['show'])
      }, 0);
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={cx(styles['nav-container'], 'container')}>
        <div className={styles.logo}>
          <img src="/navbar-banner.svg" alt="NIT AP Alumni" height={40} />
        </div>
        <div className={styles['mobile-nav-toggles']}>
          <button type='button' aria-label='Menu' className={styles['menu-btn']} onClick={toggleMobileNav}>
            <MenuIcon />
          </button>
          <button type='button' aria-label='Profile' className={styles['profile-btn']}>
            <ProfileIcon />
          </button>
        </div>
        <ul className={styles['nav-list']}>
          {links.map((link, index) => <NavLi key={index} {...link} />)}
        </ul>
      </div>
      <div className={cx(styles['mobile-nav'])}>
        <div className={styles['mobile-nav-container']}>
          <hr />
          <ul className={styles['mobile-nav-list']}>
            {links.map((link, index) => <NavLi key={index} {...link} />)}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;