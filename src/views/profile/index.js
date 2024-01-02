import { Header } from "../../components/layout";
import { useUser } from "../../contexts/UserContext";
import Layout from "./layout";
import { Outlet } from "react-router";
import PersonalDetails from "./personal-details/page";
import AcademicDetails from "./academic-details/page";
import ProfessionalDetails from "./professional-details/page";

const Profile = () => {
  const { user } = useUser();

  return (<>
    <Header
      pageHeading={user?.isProfileIncomplete ? 'Create Profile' : 'Profile'}
      subHeading={user?.isProfileIncomplete
        ? "Create your alumni profile by filling in personal, academic and professional details."
        : "Manage and update your alumni profile."
      }
    />
    <div className="__page-content container">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  </>)
}

export default Profile;
export { PersonalDetails, AcademicDetails, ProfessionalDetails }