import styles from './Avatar.module.scss';
import cx from 'classnames';

const Avatar = ({ avatar, className='' }) => (
  <div className={cx(styles['avatar'], className)}>
    {avatar
      ? <img src={avatar} alt="avatar" />
      : <img src='https://via.placeholder.com/200' alt="avatar" />
    }
  </div>
)

export default Avatar;