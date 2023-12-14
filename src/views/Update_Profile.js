import { Header } from "../components/layout";
import SchemaForm from "../components/forms/SchemaForm/SchemaForm";


const Update_Profile = () => {
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <Header pageHeading="Update Profile" subHeading="Please update your profile" />
            <div className="__page-content container">
                {/* <SchemaForm shema={[
                    { name: 'firstname', label: 'First Name', type: 'text', required: true },
                    { name: 'lastname', label: 'Last Name', type: 'text', required: true },
                    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
                ]} onSubmit={onSubmit} /> */}

                <SchemaForm schema={[
                    { name: 'firstname', label: 'Full Name', type: 'text', required: true },
                    { name: 'dob', label: 'Date of Birth', type: 'text', required: true },
                    { name: 'category', label: 'Category', type: 'text', required: true },
                    { name: 'nationality', label: 'Nationalality', type: 'text', required: true },
                    { name: 'religion', label: 'Religion', type: 'text', required: true },
                    { name: 'address', label: 'Address', type: 'text', required: true },
                    { name: 'pincode', label: 'Pincode', type: 'text', required: true },
                    { name: 'state', label: 'State/Province/Region', type: 'text', required: true },
                    { name: 'city', label: 'City', type: 'text', required: true },
                    { name: 'country', label: 'Country', type: 'text', required: true },
                    { name: 'phone', label: 'Phone', type: 'text', required: true },
                    { name: 'alternatephone', label: 'Alternate Phone', type: 'text', required: true },
                    { name: 'email', label: 'Email', type: 'text', required: true },
                    { name: 'linkedin', label: 'Linkedin', type: 'text', required: true },
                    { name: 'github', label: 'Github', type: 'text', required: true },


                ]} onSubmit={onSubmit} />
            </div>
        </>
    )
}
export default Update_Profile;