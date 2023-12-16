import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, UpdateProfile, Admin } from "./views";
import Layout from "./components/layout";
import UserProvider from "./contexts/UserContext";
import ProtectedComponent from "./components/protectedComponent/ProtectedComponent";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update-profile" element={(
              <ProtectedComponent>
                <UpdateProfile />
              </ProtectedComponent>
            )} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
