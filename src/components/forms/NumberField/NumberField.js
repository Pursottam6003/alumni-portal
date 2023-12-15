import styles from '../Form.module.scss'
import cx from 'classnames'
import { forwardRef } from 'react'

const NumberField = forwardRef(({ onChange, onBlur, name, label, value, min=null, max=null }, ref) => {
  if (typeof min !== 'number' && typeof max !== 'number') {
    return <p>Invalid range</p>
  }

  const range = {}
  if (min) range.min = min
  if (max) range.max = max
  return (
    <div className={styles['form-field']}>
      <label htmlFor={name} data-name={label} className={cx(
        { [styles.filled]: value?.length > 0 },
      )}>
        <input
          type="number"
          {...range}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
    </div>
  )
})

export default NumberField;