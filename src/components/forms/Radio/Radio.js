import { forwardRef } from "react"
import styles from '../Form.module.scss'

const Radio = forwardRef(({ onChange, onBlur, name, label, options }, ref) => {
  return (
    !options
      ? <p>Invalid options array</p>
      : (
        <div className={styles['form-field']}>
          <label htmlFor={name}>{label}</label>
          <div className={styles['radio-group']}>
            {options.map(({ label, value }, index) => (<>
              <div key={index} className={styles['radio-option']}>
                <input className={styles.radio} type="radio" name={name} ref={ref} onChange={onChange} onBlur={onBlur} value={value} />
                <label className={styles['radio-label']} htmlFor={value}>{label}</label>
              </div>
            </>))}
          </div>
        </div>
      )
  )
})

export default Radio;