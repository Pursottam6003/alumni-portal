import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext"
import { useNavigate } from "react-router";

const UnauthorizedComponent = () => (
  <div>
    <h1>Unauthorized</h1>
    <p>You are not authorized to view this page.</p>
  </div>
)

const ProtectedComponent = ({ children, adminComponent = false }) => {
  const { loading, user, admin, checkAuth } = useUser();
  const history = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user === null) {
      history('/login');
    }
  }, [loading, user, history]);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    loading ? <p>Loading...</p> : (
      user === null ? <UnauthorizedComponent /> : (
        adminComponent ? (
          admin ? children : <UnauthorizedComponent />
        ) : children
      )
    )
  )
}

export default ProtectedComponent;