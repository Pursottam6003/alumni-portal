import cx from "classnames"
import { SchemaForm, Button } from "../../../components/forms"
import ModalComponent from "../../../components/forms/Modal/ModalComponent"
import { EditPencil, PlusCircle as AddIcon } from 'iconoir-react'
import styles from '../Profile.module.scss'
import { useEffect, useState } from "react"
import { dataValueLookup } from "../../../utils/data"

const ExperienceForm = ({ onSubmit, prefillData = {} }) => {
  return (
    <SchemaForm schema={[
      { type: 'section', label: 'Professional Details' },
      {
        name: 'type', label: 'Type', type: 'select', required: 'Type is required', options: [
          { value: 'job', label: 'Job' },
          { value: 'internship', label: 'Internship' },
        ]
      },
      { name: 'company', label: 'Company/Organization', type: 'text', required: 'Company/organization name is required' },
      { name: 'designation', label: 'Designation/Role', type: 'text', required: 'Designation is required' },
      { name: 'location', label: 'Location', type: 'text', required: 'Location is required' },
      { name: 'workFrom', label: 'Work From', type: 'date', required: 'Work from date is required' },
      { name: 'workTo', label: 'Work To (leave empty if this is your current job)', type: 'date' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ]} onSubmit={onSubmit} actions={(
      <Button type="submit" className='primary'>Save changes</Button>
    )} />
  )
}

const ExperienceComponent = ({ data, openEditModal }) => {
  return (
    <div className={cx(styles['box-row'])} >
      <div className={cx(styles['logo-container'])}>
        {data.institute === 'National Institute of Technology, Arunachal Pradesh' ? (
          <img className={styles['logo']} src="/nitap-logo.svg" alt="nitap-logo" />
        ) : (
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/university.png" alt="university" />)}
      </div>
      <div className={cx(styles['col'])}>
        <div className={cx(styles['college-name'], styles.value)}>
          {data.institute}
        </div>
        <div className={cx(styles['course-details'], styles.label)}>
          <p className={cx(styles['course-name'])}>{dataValueLookup[data.degree] || data.degree} ({dataValueLookup[data.type]}) in {data.discipline}</p>
          <p className={cx(styles['course-duration'])}>{new Date(data.startDate).toLocaleString('default', { month: 'short' })} {new Date(data.startDate).getFullYear()} - {new Date(data.endDate).toLocaleString('default', { month: 'short' })} {new Date(data.endDate).getFullYear()}
            {new Date(data.endDate) > new Date() ? " (Expected)" : ""}</p>
        </div>
        {!!data.description && (
          <div className={cx(styles['course-description'])}>
            {data.description}
          </div>
        )}
      </div>
      <div>
        <Button attrs={{ 'aria-label': 'Edit education details' }} className={cx(styles['editIcon'])} onClick={() => openEditModal(data)}>
          <EditPencil />
        </Button>
      </div>
    </div>
  );
}

const ProfessionalDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState({});
  const [experiences, setExperiences] = useState([]);

  // add, update or delete
  const updateExperience = (data) => {
    fetch('/users/experience', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        fetchExperiences();
        return res.json();
      }
      return null;
    }).then(resJson => {
      console.log(resJson);
    }).catch(err => {
      console.error(err);
    })
  }

  const fetchExperiences = () => {
    fetch('/users/experience', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      return res.ok ? res.json() : null;
    }).then(resJson => {
      if (resJson) {
        setExperiences(resJson.educationList);
      }
    }).catch(err => console.error(err))
  }

  const openEditModal = (data) => {
    setEditPrefillData(data);
    setIsEditModalOpen(true);
  }

  useEffect(() => {
    fetchExperiences();
  }, [])

  return (<>
    <section className={styles.box}>
      <div className={styles['box-table']}>
        <div className={cx(styles['box-row'], styles.header)} >
          <div className={styles['col']}>
            <h3 className={styles['title']}>
              Professional Details
            </h3>
          </div>
          <Button onClick={setIsModalOpen}>
            <AddIcon />Add
          </Button>
        </div>
        {experiences.map(e => (
          <ExperienceComponent data={e} key={e.institute} openEditModal={openEditModal} />
        ))}

        <ModalComponent modalTitle="Add Experience" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <section className={styles.box}>
            <ExperienceForm onSubmit={updateExperience} />
          </section>
        </ModalComponent>
        <ModalComponent modalTitle="Edit Experience" isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen}>
          <section className={styles.box}>
            <ExperienceForm onSubmit={updateExperience} prefillData={editPrefillData} />
          </section>
        </ModalComponent>
      </div>
    </section>
  </>)
}

export default ProfessionalDetails;