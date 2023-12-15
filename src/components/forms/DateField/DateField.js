import styles from '../Form.module.scss'
import cx from 'classnames'
import { forwardRef } from 'react'

const DateField = forwardRef(({ onChange, onBlur, name, label, type="date" }, ref) => {
  if (!['date', 'month', 'week', 'time', 'datetime-local'].includes(type)) {
    return <p>Invalid date type</p>
  }

  return (
    <div className={styles['form-field']}>
      <label htmlFor={name} data-name={label} className={cx(
        { [styles.filled]: true },
      )}>
        <input
          type={type}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
    </div>
  )
})

export default DateField;