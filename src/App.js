import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout, { Header } from "./components/layout";
import UserProvider from "./contexts/UserContext";
import ProtectedComponent from "./components/protectedComponent/ProtectedComponent";
import { Home, Login, Register, Admin } from "./views";
import Profile, { PersonalDetails, AcademicDetails, ProfessionalDetails } from "./views/profile";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedComponent><Profile /></ProtectedComponent>}>
              <Route path="" element={<PersonalDetails />} />
              <Route path="academic" element={<AcademicDetails />} />
              <Route path="professional" element={<ProfessionalDetails />} />
              <Route path="*" element={<h1>TODO</h1>} />
            </Route>
            <Route path="/admin" element={<ProtectedComponent adminComponent><Admin /></ProtectedComponent>} />
            <Route path="*" element={<Header pageHeading="404" subHeading="Page not found" />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
