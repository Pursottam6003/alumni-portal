import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Update_Profile } from "./views";
import Layout from "./components/layout";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-profile" element={<Update_Profile />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
