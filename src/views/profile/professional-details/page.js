import { SchemaForm, Button } from "../../../components/forms"

const ProfessionalDetails = () => {
  const onSubmit = (data) => {
    console.log(data)
    fetch('/users/update-profile', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        if (resJson.success) {
          // TODO: redirect to dashboard
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <SchemaForm schema={[
      { type: 'section', label: 'Professional Details' },
      {
        name: 'type', label: 'Type', type: 'select', required: 'Type is required', options: [
          { value: 'job', label: 'Job' },
          { value: 'internship', label: 'Internship' },
        ]
      },
      { name: 'company', label: 'Company/Organization', type: 'text', required: 'Company/organization name is required' },
      { name: 'designation', label: 'Designation/Role', type: 'text', required: 'Designation is required' },
      { name: 'location', label: 'Location', type: 'text', required: 'Location is required' },
      { name: 'workFrom', label: 'Work From', type: 'date', required: 'Work from date is required' },
      { name: 'workTo', label: 'Work To (leave empty if this is your current job)', type: 'date' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ]} onSubmit={onSubmit} actions={(
      <Button type="submit" className='primary'>Save changes</Button>
    )} />
  )
}

export default ProfessionalDetails;