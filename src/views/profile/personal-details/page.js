import { SchemaForm, Button } from "../../../components/forms"

const PersonalDetails = () => {
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
      { type: 'section', label: 'Personal Details' },
      {
        name: 'title', label: 'Title', type: 'select', required: 'Title is required', options: [
          { value: 'mr', label: 'Mr' },
          { value: 'mrs', label: 'Mrs' },
          { value: 'ms', label: 'Ms' },
          { value: 'dr', label: 'Dr' },
        ]
      },
      { name: 'firstName', label: 'First Name', type: 'text', required: 'Please provide first name' },
      { name: 'lastName', label: 'Last Name', type: 'text', required: 'Please provide last name' },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: 'Please provide date of birth' },
      {
        name: 'sex', label: 'Sex', type: 'select', required: 'Sex is required', options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'others', label: 'Others' }
        ]
      },
      {
        name: 'category', label: 'Category', type: 'select', required: 'Category is required', options: [
          { value: 'gen', label: 'General' },
          { value: 'obc', label: 'OBC' },
          { value: 'sc', label: 'SC' },
          { value: 'st', label: 'ST' },
          { value: 'ews', label: 'EWS' },
        ]
      },
      { name: 'nationality', label: 'Nationality', type: 'text', required: 'Nationality is required' },
      { name: 'religion', label: 'Religion', type: 'text', required: 'Religion is required' },
      { type: 'section', label: 'Contact Details' },
      { name: 'address', label: 'Address', type: 'text', required: 'Please provide your street address' },
      { name: 'pincode', label: 'Pincode', type: 'number', required: 'Pincode is required' },
      { name: 'state', label: 'State/Province/Region', type: 'text', required: 'State/Province/Region is required' },
      { name: 'city', label: 'City', type: 'text', required: 'City is required' },
      { name: 'country', label: 'Country', type: 'text', required: 'Country is required' },
      { name: 'phone', label: 'Phone', type: 'text', required: 'Phone number is required' },
      { name: 'altPhone', label: 'Alternate Phone', type: 'text' },
      { name: 'email', label: 'Email', type: 'email', required: 'Primary Email is required' },
      { name: 'altEmail', label: 'Alternate Email', type: 'email' },
      { name: 'linkedin', label: 'Linkedin', type: 'text' },
      { name: 'github', label: 'Github', type: 'text' },
    ]} onSubmit={onSubmit} actions={(
      <Button type="submit" className='primary'>Save changes</Button>
    )} />
  )
}

export default PersonalDetails;