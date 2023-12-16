import { useNavigate } from "react-router";
import { SchemaForm } from "../components/forms/";
import { Header } from "../components/layout";
import { signupApi } from "../utils/api";

const Register = () => {
  const history = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
    signupApi(data).then(res => res.json())
    .then(resJson => {
      if (resJson.success) {
        history('/login');
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (<>
    <Header pageHeading="Register" subHeading="Register with your Registration number or Enrollment no." />
    <div className="__page-content container">
      <SchemaForm schema={[
        { name: 'name', label: 'Full name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
      ]} onSubmit={onSubmit} />
    </div>
  </>)
}

export default Register;