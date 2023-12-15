import styles from '../Form.module.scss'
import { forwardRef } from 'react'

const Select = forwardRef(({ onChange, onBlur, name, label, options }, ref) => {
  return (
    !options
      ? <p>Invalid options array</p>
      : (<div className={styles['form-field']}>
        <label htmlFor={name}>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} defaultValue="">
          <option value="" disabled>{label}</option>
          {options.map(({ label, value }, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </select>
      </div>)
  )
})

export default Select;