import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout, { Header } from "./components/layout";
import UserProvider from "./contexts/UserContext";
import ProtectedComponent from "./components/protectedComponent/ProtectedComponent";
import { Home, Login, LoginOld, Register, RegisterOld } from "./views";
import Profile, { PersonalDetails, AcademicDetails, ProfessionalDetails } from "./views/profile";
import Admin, { Annoucements, Dashboard, SubmissionUpdatesPage } from "./views/admin";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-old" element={<LoginOld />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-old" element={<RegisterOld />} />
            <Route path="/profile" element={<ProtectedComponent><Profile /></ProtectedComponent>}>
              <Route path="" element={<PersonalDetails />} />
              <Route path="academic" element={<AcademicDetails />} />
              <Route path="professional" element={<ProfessionalDetails />} />
              <Route path="*" element={<h1>TODO</h1>} />
            </Route>
            <Route path="/admin" element={<Admin />} >
              <Route path="" element={<Dashboard />} />
              <Route path="annoucements" element={<Annoucements />} />
              <Route path="submission-updates" element={<SubmissionUpdatesPage />} />
              <Route path="*" element={<h1>TODO</h1>} />
            </Route>

            <Route path="*" element={<Header pageHeading="404" subHeading="Page not found" />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
