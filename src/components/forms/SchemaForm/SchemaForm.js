import { useForm } from 'react-hook-form';
import { TextField, Select, Button, DateField, NumberField } from '../';

const SchemaForm = ({ schema, onSubmit, actions = null }) => {
  const { register, handleSubmit, watch } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {schema.map((field, index) => {
        if (['text', 'email', 'password'].includes(field.type)) {
          return <TextField
            key={index}
            type={field.type}
            label={field.label}
            {...register(field.name, { required: field.required })}
            value={watch(field.name)}
          />
        } else if (field.type === 'select') {
          return <Select
            key={index}
            label={field.label}
            name={field.name}
            options={field.options}
            {...register(field.name, { required: field.required })}
          />
        } else if (field.type === 'date') {
          return <DateField
            key={index}
            label={field.label}
            name={field.name}
            {...register(field.name, { required: field.required })}
            value={watch(field.name)}
          />
        } else if (field.type === 'number') {
          return <NumberField
            key={index}
            label={field.label}
            {...register(field.name, { required: field.required })}
            value={watch(field.name)}
          />
        }

        else {
          return <p>Invalid field</p>
        }
      })}
      {actions !== null ? actions : <Button type="submit" className='primary'>Submit</Button>}
    </form>
  )
}

export default SchemaForm;