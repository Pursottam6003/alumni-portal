import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, UpdateProfile, Admin } from "./views";
import Layout from "./components/layout";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
