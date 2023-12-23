import { Header } from "../../components/layout";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import ProfileLayout from "../../components/profile-layout";
import { Outlet } from "react-router";
import PersonalDetails from "./personal-details/page";
import AcademicDetails from "./academic-details/page";
import ProfessionalDetails from "./professional-details/page";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [prefillData, setPrefillData] = useState(null);

  const prepopulate = async () => {
    try {
      const res = await fetch('/users/profile', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const resJson = await res.json();
      if (!resJson.error) {
        setPrefillData(resJson.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // prepopulate form with user data
    prepopulate();
  }, [])

  const onSubmit = (data) => {
    console.log(data)
    fetch('/users/update-profile', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        if (resJson.success) {
          // TODO: redirect to dashboard
        }
      })
      .catch(err => console.log(err))
  };

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
      <ProfileLayout>
        <Outlet />
      </ProfileLayout>
    </div>
  </>)
}

export default Profile;
export { PersonalDetails, AcademicDetails, ProfessionalDetails }