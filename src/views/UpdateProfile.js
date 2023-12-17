import { Header } from "../components/layout";
import SchemaForm from "../components/forms/SchemaForm/SchemaForm";
import { useUser } from "../contexts/UserContext";

const UpdateProfile = () => {
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

  const { user } = useUser();

  return (<>
    <Header
      pageHeading={user?.isProfileIncomplete ? 'Create Profile' : 'Update Profile'}
      subHeading={`Fill in the details below to ${user?.isProfileIncomplete ? 'create' : 'update'} your profile.`}
    />
    <div className="__page-content container">
      <SchemaForm schema={[
        { type: 'section', label: 'Personal Details' },
        {
          name: 'title', label: 'Title', type: 'select', required: true, options: [
            { value: 'Mr', label: 'Mr' },
            { value: 'Mrs', label: 'Mrs' },
            { value: 'Ms', label: 'Ms' },
            { value: 'Dr', label: 'Dr' },
          ]
        },
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
        {
          name: 'sex', label: 'Sex', type: 'select', required: true, options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'others', label: 'Others' }
          ]
        },
        {
          name: 'category', label: 'Category', type: 'select', required: true, options: [
            { value: 'gen', label: 'General' },
            { value: 'obc', label: 'OBC' },
            { value: 'sc', label: 'SC' },
            { value: 'st', label: 'ST' },
            { value: 'ews', label: 'EWS' },
          ]
        },
        { name: 'nationality', label: 'Nationality', type: 'text', required: true },
        { name: 'religion', label: 'Religion', type: 'text', required: true },
        { type: 'section', label: 'Contact Details' },
        { name: 'address', label: 'Address', type: 'text', required: true },
        { name: 'pincode', label: 'Pincode', type: 'number', required: true },
        { name: 'state', label: 'State/Province/Region', type: 'text', required: true },
        { name: 'city', label: 'City', type: 'text', required: true },
        { name: 'country', label: 'Country', type: 'text', required: true },
        { name: 'phone', label: 'Phone', type: 'text', required: true },
        { name: 'altPhone', label: 'Alternate Phone', type: 'text' },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'altEmail', label: 'Alternate Email', type: 'email' },
        { name: 'linkedin', label: 'Linkedin', type: 'text' },
        { name: 'github', label: 'Github', type: 'text' },
        { type: 'section', label: 'Academic details (NIT Arunachal Pradesh)' },
        {
          name: 'courseCompleted', label: 'Course', type: 'select', required: true, options: [
            { value: 'btech', label: 'B.Tech' },
            { value: 'mtech', label: 'M.Tech' },
            { value: 'phd', label: 'PhD' },
          ]
        },
        { name: 'registrationNo', label: 'Registration No.', type: 'text', required: true },
        { name: 'rollNo', label: 'Roll No.', type: 'text', required: true },
        { name: 'discipline', label: 'Discipline', type: 'text', required: true },
        { name: 'gradYear', label: 'Graduation year', type: 'number', required: true, min: 2014 },
      ]} onSubmit={onSubmit} />
    </div>
  </>)
}
export default UpdateProfile;