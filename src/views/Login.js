import { Header } from "../components/layout";
import { SchemaForm } from "../components/forms/";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, user } = useUser();

  const onSubmit = (data) => {
    setLoading(true);
    login(data).finally(() => setLoading(false));
  }

  useEffect(() => {
    if (loading || !user) return;
    if (user.isProfileIncomplete) {
      console.log(user);
      window.location.href = '/';
    }
  }, [user, loading])

  return (<>
    <Header pageHeading="Login" subHeading="Please login to continue" />
    <div className="__page-content container">
      <SchemaForm schema={[
        { name: 'email', label: 'Username (E-mail)', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
      ]} onSubmit={onSubmit} loadingState={loading} />
    </div>
  </>)
}

export default Login;