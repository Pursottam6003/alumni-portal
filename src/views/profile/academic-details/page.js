import { SchemaForm, Button } from "../../../components/forms"

const AcademicDetails = () => {
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
      { type: 'section', label: 'Academic details (NIT Arunachal Pradesh)' },
      {
        name: 'courseCompleted', label: 'Course', type: 'select', required: 'Course is required', options: [
          { value: 'btech', label: 'B.Tech' },
          { value: 'mtech', label: 'M.Tech' },
          { value: 'phd', label: 'PhD' },
        ]
      },
      { name: 'registrationNo', label: 'Registration No.', type: 'text', required: 'Registration number is required. You can find it in your grade-card' },
      { name: 'rollNo', label: 'Roll No.', type: 'text', required: 'Roll number is required' },
      { name: 'discipline', label: 'Discipline', type: 'text', required: 'Discipline is required' },
      { name: 'gradYear', label: 'Graduation year', type: 'number', required: 'Graduation year is required', min: 2014 },
    ]} onSubmit={onSubmit} actions={(
      <Button type="submit" className='primary'>Save changes</Button>
    )} />
  )
}

export default AcademicDetails;