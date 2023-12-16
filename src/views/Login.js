import { Header } from "../components/layout";
import { Button, SchemaForm } from "../components/forms/";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, user } = useUser();
  const history = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    login(data).finally(() => setLoading(false));
  }

  useEffect(() => {
    if (loading || !user) return;
    if (user.isProfileIncomplete) {
      console.log('Profile incomplete');
      history('/profile');
    } else {
      console.log('Profile complete, proceed for alumni registration');
      history('/membership-registration');
    }
  }, [user, loading])

  return (<>
    <Header pageHeading="Login" subHeading="Please login to continue" />
    <div className="__page-content container">
      <SchemaForm schema={[
        { name: 'email', label: 'Username (E-mail)', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
      ]} onSubmit={onSubmit} loadingState={loading}
        actions={(<div style={{ display: 'flex', gap: '1rem' }}>
          <Button type="submit" className="btn primary" disabled={loading}>Login</Button>
          <NavLink to="/register" className="btn">Register?</NavLink>
        </div>)}
      />
    </div>
  </>)
}

export default Login;