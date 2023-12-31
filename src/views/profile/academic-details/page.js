import cx from "classnames"
import { SchemaForm, Button } from "../../../components/forms"
import ModalComponent from "../../../components/forms/Modal/ModalComponent"
import styles from '../Profile.module.scss'
import { useState } from "react"

const EducationFormNITAP = ({ onSubmit }) => {
  const prefillData = { institute: 'National Institute of Technology, Arunachal Pradesh' }

  return (
    <SchemaForm prefillData={prefillData} schema={[
      { name: 'institute', label: 'Institute', type: 'text', required: 'Institute is requried', disabled: true },
      {
        name: 'degree', label: 'Degree', type: 'select', required: 'Degree is required', options: [
          { value: 'btech', label: 'B.Tech' },
          { value: 'mtech', label: 'M.Tech' },
          { value: 'phd', label: 'PhD' },
        ]
      },
      {
        name: 'type', label: 'Degree type', type: 'select', options: [
          { value: 'full-time', label: 'Full time' },
          { value: 'part-time', label: 'Part time' },
        ], required: 'Degree type is required'
      },
      { name: 'discipline', label: 'Discipline (Field of study)', type: 'text', required: 'Discipline is required' },
      { name: 'startDate', label: 'Start date', type: 'date', required: 'Start date is required' },
      { name: 'endDate', label: 'End date', type: 'date', required: 'End date is required' },
      { name: 'description', label: 'Description', type: 'textarea' }
    ]} onSubmit={onSubmit} actions={(
      <Button type="submit" className='primary'>Save</Button>
    )} />
  )
}

const EducationForm = ({ onSubmit }) => {
  return (
    <SchemaForm schema={[
      { name: 'institute', label: 'Institute (Ex. IIT Madras)', type: 'text', required: 'Institute is requried' },
      { name: 'degree', label: 'Degree', type: 'text', required: 'Degree is required' },
      {
        name: 'type', label: 'Degree type', type: 'select', options: [
          { value: 'full-time', label: 'Full time' },
          { value: 'part-time', label: 'Part time' },
        ], required: 'Degree type is required'
      },
      { name: 'discipline', label: 'Discipline (Field of study)', type: 'text', required: 'Discipline is required' },
      { name: 'startDate', label: 'Start date', type: 'date', required: 'Start date is required' },
      { name: 'endDate', label: 'End date (or expected)', type: 'date', required: 'End date is required' },
      { name: 'description', label: 'Description', type: 'textarea' }
    ]} onSubmit={onSubmit} actions={(
      <Button type="submit" className='primary'>Save</Button>
    )} />
  )
}

const AcademicDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educations, setEducations] = useState([]);

  // add, update or delete
  const updateEducation = () => { }

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

  return (<>
    <section className={styles.box}>
      <Button onClick={() => setIsModalOpen(true)}>
        Add education
      </Button>
      {(educations?.length === 0) ? (
        <ModalComponent
          modalTitle="Add education at NIT Arunachal Pradesh"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}>
          <section className={styles.box}>
            <EducationFormNITAP onSubmit={onSubmit} />
          </section>
        </ModalComponent>
      ) : (
        <ModalComponent modalTitle="Add Education" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <section className={styles.box}>
            <EducationForm onSubmit={onSubmit} />
          </section>
        </ModalComponent>
      )}
    </section>
    <section className={styles.box}>
      <div className={styles['box-table']}>
        <div className={cx(styles['box-row'])}>

        </div>
      </div>
    </section>
  </>)
}

export default AcademicDetails;