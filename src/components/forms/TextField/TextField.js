import styles from '../Form.module.scss'
import cx from 'classnames'
import { forwardRef } from 'react'

const TextField = forwardRef(({ pattern = '.*', onChange, onBlur, name, label, type = 'text', value, error = null, required = false }, ref) => {
  if (!['text', 'email', 'password'].includes(type)) {
    return <p>Invalid text type</p>
  }

  return (
  <div className={styles['field-wrapper']}>
    <div className={styles['form-field']}>
      <label htmlFor={name} data-name={`${label}${required ? '' : ' (optional)'}`} className={cx(
        { [styles.filled]: value?.length > 0 },
      )}>
        <input
          pattern={pattern}
          type={type}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
    </div>
    {error && <p className={styles['error']}>{error.message}</p>}
  </div>
  )
})

export default TextField;