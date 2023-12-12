import { useForm } from "react-hook-form";
import { Header } from "../components/layout";
import { InputField, Button } from "../components/forms/";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (<>
    <Header pageHeading="Register" subHeading="Register with your Registration number or Enrollment no." />
    <div className="__page-content container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder="Email" {...register("email", { required: 'Email is required' })} />
        <InputField placeholder="Password" {...register("password", { required: 'Password is required' })} />
        <InputField placeholder="Repeat Password" {...register("repeatPassword", { required: 'Password is required' })} />
        <Button type="submit" className='primary'>Register</Button>
      </form>
    </div>
  </>)
}

export default Register;