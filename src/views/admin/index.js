import { Header } from '../../components/layout'
import { useUser } from '../../contexts/UserContext'
import { useEffect, useState } from 'react'
// import ProfileLayout from '../../components/profile-layout'
import AdminLayout from '../../components/Admin/admin-layout'
import { Outlet } from 'react-router'
import Annoucements from "./annoucement/page";
import Dashboard from "./dashboard/page";
import SubmissionUpdatesPage from "./submissions-updates/page"


const Admin = () => {
    const [loading, setLoading] = useState(true)

    const { user } = useUser()
    return (<>

        <Header pageHeading={"Welcome Admin!"} />
        <div className="__page-content container">

            <AdminLayout >
                <Outlet />
            </AdminLayout>
        </div>

    </>)
}

export default Admin;
export { Annoucements, Dashboard, SubmissionUpdatesPage }