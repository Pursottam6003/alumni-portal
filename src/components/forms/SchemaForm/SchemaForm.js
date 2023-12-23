import { useForm } from 'react-hook-form';
import { TextField, Select, Radio, Button, DateField, NumberField } from '../';
import styles from '../Form.module.scss'
import { useEffect } from 'react';

const SchemaForm = ({ schema, onSubmit, actions = null, loading = false, prefillData }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (prefillData) {
      Object.keys(prefillData).forEach(key => {
        setValue(key, prefillData[key]);
      })
    }
  }, [prefillData])

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors])

  if (loading) {
    return <p>Please wait...</p>
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {schema.map((field, index) => {
        if (['text', 'email', 'password'].includes(field.type)) {
          return <TextField
            key={index}
            type={field.type}
            label={field.label}
            required={field.required}
            {...register(field.name, { required: field.required })}
            value={watch(field.name)}
            error={errors[field.name]}
          />
        } else if (field.type === 'select') {
          return <Select
            key={index}
            label={field.label}
            required={field.required}
            name={field.name}
            options={field.options}
            error={errors[field.name]}
            {...register(field.name, { required: field.required })}
          />
        } else if (field.type === 'date') {
          return <DateField
            key={index}
            label={field.label}
            name={field.name}
            {...register(field.name, { required: field.required })}
            required={field.required}
            value={watch(field.name)}
            error={errors[field.name]}
          />
        } else if (field.type === 'number') {
          return <NumberField
            key={index}
            label={field.label}
            {...register(field.name, { required: field.required })}
            required={field.required}
            value={watch(field.name)}
            error={errors[field.name]}
          />
        } else if (field.type === 'radio') {
          return <Radio
            key={index}
            label={field.label}
            {...register(field.name, { required: field.required })}
            required={field.required}
            options={field.options}
            error={errors[field.name]}
          />
        } else if (field.type === 'section') {
          return <h3 className={styles['section-title']} key={index}>{field.label}</h3>
        } else {
          return <p key={index}>Invalid field</p>
        }
      })}
      {actions !== null ? actions : <Button type="submit" className='primary'>Submit</Button>}
    </form>
  )
}

export default SchemaForm;