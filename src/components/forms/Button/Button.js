import styles from './Button.module.scss'
import cx from 'classnames'

const Button = ({ children, type = 'button', className='', attrs = {}, onClick }) => (
  <button type={type} className={cx(styles.btn, className)} {...attrs} onClick={onClick}>
    {children}
  </button>
)

export default Button;