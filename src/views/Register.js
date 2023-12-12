import SchemaForm from "../components/forms/SchemaForm/SchemaForm";
import { Header } from "../components/layout";

const Register = () => {
  const onSubmit = (data) => console.log(data);

  return (<>
    <Header pageHeading="Register" subHeading="Register with your Registration number or Enrollment no." />
    <div className="__page-content container">
      <SchemaForm schema={[
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
      ]} onSubmit={onSubmit} />
    </div>
  </>)
}

export default Register;