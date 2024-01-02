import { useEffect, useState } from "react";
import { Header } from "../components/layout"
import { SchemaForm } from "../components/forms";

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}

const ExperienceForm = ({ onSubmit, prefillData = null }) => {
  const [loading, setLoading] = useState(true);

  const handleSubmit = (data) => {
    console.log(data);
  }

  return (
    <SchemaForm schema={[
      { type: 'text', name: 'organization', label: 'Organization', required: true },
      { type: 'text', name: 'designation', label: 'Designation', required: true },
      { type: 'date', name: 'startDate', label: 'Start date', required: true },
      { type: 'date', name: 'endDate', label: 'End date', required: true },
      { type: 'textarea', name: 'description', label: 'Description' },
    ]} onSubmit={handleSubmit} loading={loading} prefillData={prefillData} />
  )
}

const ProfessionalDetails = () => {
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

  const handleSubmit = (data) => {
    console.log(data);
  }

  useEffect(() => {
    // fetch experiences
  }, [])

  return (<>
    <Header pageHeading="Professional Details" subHeading="Please fill in your professional details" />
    <div className="__page-content container">
      <header>
        <h3 className="section-title">Experience (Job/Internship)</h3>
        <button className="btn primary">Add</button>
      </header>

      <Modal>
        <ExperienceForm prefillData={null} onSubmit={handleSubmit} />
      </Modal>

      {experiences.map((experience, index) => (
        <div className='experience-row' key={index}>
          <div className='experience'>
            <h4 className='experience-title'>{experience.designation}</h4>
            <p className='experience-subtitle'>{experience.organization} | {experience.type}</p>
            <p className='experience-date'>{experience.startDate} - {experience.endDate}</p>
            <p className='experience-description'>{experience.description}</p>
          </div>
          <div className='experience-actions'>
            <button className='btn btn-primary'>Edit</button>
            <button className='btn btn-danger'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </>)
}

export default ProfessionalDetails;