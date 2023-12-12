import { Header } from "../components/layout";
import SchemaForm from "../components/forms/SchemaForm/SchemaForm";

const Login = () => {
  const onSubmit = (data) => console.log(data);

  return (<>
    <Header pageHeading="Login" subHeading="Please login to continue" />
    <div className="__page-content container">
      <SchemaForm schema={[
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
      ]} onSubmit={onSubmit} />
    </div>
  </>)
}

export default Login;