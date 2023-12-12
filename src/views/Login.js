import { useForm } from "react-hook-form";
import { Header } from "../components/layout";
import { InputField, Button } from "../components/forms/";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (<>
    <Header pageHeading="Login" subHeading="Please login to continue" />
    <div className="__page-content container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder="Username (your email)" {...register("email", { required: 'Email is required' })} />
        <InputField placeholder="Password" {...register("password", { required: 'Password is required' })} />
        <Button type="submit" className='primary'>Login</Button>
      </form>
    </div>
  </>)
}

export default Login;