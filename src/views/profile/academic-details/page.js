import cx from "classnames"
import { SchemaForm, Button } from "../../../components/forms"
import ModalComponent from "../../../components/forms/Modal/ModalComponent"
import { EditPencil, PlusCircle as AddIcon } from 'iconoir-react'
import styles from '../Profile.module.scss'
import { useEffect, useState } from "react"

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

const EducationComponent = ({ data }, setIsModalOpen) => {
  const degreeMap = new Map([
    ["btech", "Bachelor of Technology"],
    ["mtech", "Master of Technology"],
    ["phd", "Doctor of Philosophy"]
  ]);

  const capitalizeFirstTwoLetters = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1, 2).toUpperCase() + str.slice(2);
  }
  return (
    <div className={cx(styles['box-row'], styles.header)} >
      <div className={cx(styles['logo-container'])}>
        {data.institute === 'National Institute of Technology, Arunachal Pradesh' ? (
          <img className={styles['logo']} src="/nitap-logo.svg" alt="nitap-logo" />
        ) : (
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/university.png" alt="university" />)}
      </div>

      <div className={cx(styles['box-column'])}>
        <div className={cx(styles['college-name'], styles.value)}>
          {data.institute}
        </div>
        <div className={cx(styles['course-details'], styles.label)}>
          <p className={cx(styles['course-name'])}>{degreeMap.get(data.degree)} - {capitalizeFirstTwoLetters(data.degree)} in {data.discipline}</p>
          <p className={cx(styles['course-duration'])}>{new Date(data.startDate).toLocaleString('default', { month: 'short' })} {new Date(data.startDate).getFullYear()} - {new Date(data.endDate).toLocaleString('default', { month: 'short' })} {new Date(data.endDate).getFullYear()}
            {data.endDate > Date.now() ? " (Expected)" : ""}  {data.type === 'full-time' ? 'Full-Time' : 'Part-Time'}  </p>
          <p className={cx(styles['course-grades'])}>Grade: A</p>
        </div>
        <div className={cx(styles['course-description'])}>
          {data.courseDescription && <>
            {data.courseDescription}
          </>}
        </div>
      </div>

      <div className={cx(styles['box-column'])} >
        <Button className={cx(styles['editIcon'])} onClick={() => setIsModalOpen(true)}>
          <EditPencil />Edit
        </Button>
      </div>
    </div>
  );


}

const AcademicDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educations, setEducations] = useState([]);

  // add, update or delete
  const updateEducation = (data) => {
    fetch('/users/education', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        fetchEducation();
        return res.json();
      }
      return null;
    }).then(resJson => {
      console.log(resJson);
    }).catch(err => {
      console.error(err);
    })
  }

  const fetchEducation = () => {
    fetch('/users/education', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      return res.ok ? res.json() : null;
    }).then(resJson => {
      if (resJson) {
        setEducations(resJson.educationList);
      }
    }).catch(err => console.error(err))
  }

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

  useEffect(() => {
    fetchEducation();
  }, [])

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
            <EducationFormNITAP onSubmit={updateEducation} />
          </section>
        </ModalComponent>
      ) : (
        <ModalComponent modalTitle="Add Education" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <section className={styles.box}>
            <EducationForm onSubmit={updateEducation} />
          </section>
        </ModalComponent>
      )}
    </section>
    <section className={styles.box}>
      <div className={styles['box-table']}>

        <div className={cx(styles['box-row'], styles.header)} >
          <h3 className={styles['title']}>Academic Details</h3>

          <Button onClick={() => setIsModalOpen(true)}>
            <AddIcon />Add
          </Button>
        </div>
        <div className={cx(styles['box-row'])}>
          {educations.map(e => (
            <pre>
              {/* {JSON.stringify(e, null, 2)} */}
              <EducationComponent data={e} key={e.institute} setIsModalOpen={setIsModalOpen} />
            </pre>
          ))}
        </div>


      </div>
    </section>
  </>)
}

export default AcademicDetails;