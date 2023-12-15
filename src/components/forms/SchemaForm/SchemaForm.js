import { useForm } from 'react-hook-form';
import { TextField, Select, Button } from '../';

const SchemaForm = ({ schema, onSubmit }) => {
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
        } else {
          return <p>Invalid field</p>
        }
      })}
      <Button type="submit" className='primary'>Submit</Button>
    </form>
  )
}

export default SchemaForm;