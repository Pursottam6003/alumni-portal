import styles from '../Profile.module.scss'
import { SchemaForm, Button } from "../../../components/forms"
import cx from 'classnames';
import { EditPencil } from 'iconoir-react';
import { dataValueLookup } from '../../../utils/data';
import ModalComponent from '../../../components/forms/Modal/ModalComponent';
import { useEffect, useState } from 'react';

const PersonalDetailsForm = () => {
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

  return (
    <div className={styles.box}>
      <SchemaForm schema={[
        { type: 'section', label: 'Personal Details' },
        {
          name: 'title', label: 'Title', type: 'select', required: 'Title is required', options: [
            { value: 'mr', label: 'Mr' },
            { value: 'mrs', label: 'Mrs' },
            { value: 'ms', label: 'Ms' },
            { value: 'dr', label: 'Dr' },
          ]
        },
        { name: 'firstName', label: 'First Name', type: 'text', required: 'Please provide first name' },
        { name: 'lastName', label: 'Last Name', type: 'text', required: 'Please provide last name' },
        { name: 'dob', label: 'Date of Birth', type: 'date', required: 'Please provide date of birth' },
        {
          name: 'sex', label: 'Sex', type: 'select', required: 'Sex is required', options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'others', label: 'Others' }
          ]
        },
        {
          name: 'category', label: 'Category', type: 'select', required: 'Category is required', options: [
            { value: 'gen', label: 'General' },
            { value: 'obc', label: 'OBC' },
            { value: 'sc', label: 'SC' },
            { value: 'st', label: 'ST' },
            { value: 'ews', label: 'EWS' },
          ]
        },
        { name: 'nationality', label: 'Nationality', type: 'text', required: 'Nationality is required' },
        { name: 'religion', label: 'Religion', type: 'text', required: 'Religion is required' },
        { type: 'section', label: 'Contact Details' },
        { name: 'address', label: 'Address', type: 'text', required: 'Please provide your street address' },
        { name: 'pincode', label: 'Pincode', type: 'number', required: 'Pincode is required' },
        { name: 'state', label: 'State/Province/Region', type: 'text', required: 'State/Province/Region is required' },
        { name: 'city', label: 'City', type: 'text', required: 'City is required' },
        { name: 'country', label: 'Country', type: 'text', required: 'Country is required' },
        { name: 'phone', label: 'Phone', type: 'text', required: 'Phone number is required' },
        { name: 'altPhone', label: 'Alternate Phone', type: 'text' },
        { name: 'email', label: 'Email', type: 'email', required: 'Primary Email is required' },
        { name: 'altEmail', label: 'Alternate Email', type: 'email' },
        { name: 'linkedin', label: 'Linkedin', type: 'text' },
        { name: 'github', label: 'Github', type: 'text' },
      ]} onSubmit={onSubmit} actions={(
        <Button type="submit" className='primary'>Save changes</Button>
      )} />
    </div>
  )
}

const PersonalDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileDetails = {
    'title': 'mr',
    'firstName': 'John',
    'lastName': 'Doe',
    'dob': '1990-01-01',
    'sex': 'male',
    'category': 'gen',
    'nationality': 'Indian',
    'religion': 'Hinduism',
    'address': '123, Street',
    'pincode': '123456',
    'state': 'State',
    'city': 'City',
    'country': 'Country',
    'phone': '1234567890',
    'altPhone': '',
    'email': 'someone@example.com',
    'altEmail': '',
    'linkedin': 'https://linkedin.com/in/username',
    'github': 'https://github.com/username',
    'registrationNo': '123456',
    'rollNo': '123456',
  }

  return (<>
    <section className={cx(styles.box, styles['basic-info-wrapper'])}>
      <div className={styles['actions']}>
        <Button onClick={() => setIsModalOpen(true)}>
          <EditPencil />Edit
        </Button>
      </div>
      <div className={styles['basic-info']}>
        <div className={styles['avatar-container']}>
          <img src="https://avatars.githubusercontent.com/u/77870205" alt="avatar" />
        </div>
        <div className={styles['basic-info-content']}>
          <h2 className={styles['title']}>{dataValueLookup[profileDetails.title]} {profileDetails.firstName} {profileDetails.lastName}</h2>
          <div className={styles['subtitle']}>
            <p>Class of 2020</p>
            <p className={styles['mono']}>
              <span title='Registration no.'>{profileDetails.registrationNo}</span>|
              <span title='Roll no.'>{profileDetails.rollNo}</span>
            </p>
            <p>
              <span title='Email'>{profileDetails.email}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.box}>
      <h3 className={styles['title']}>Personal details</h3>
      <div className={styles['box-subtitle']}>
        <p>These details are used for account safety purposes.</p>
      </div>
      <div className={styles['box-table']}>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>Date of Birth</p>
          <p className={cx(styles.col, styles['value'])}>{profileDetails.dob}</p>
        </div>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>Sex</p>
          <p className={cx(styles.col, styles['value'])}>{dataValueLookup[profileDetails.sex]}</p>
        </div>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>Category</p>
          <p className={cx(styles.col, styles['value'])}>{dataValueLookup[profileDetails.category]}</p>
        </div>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>Nationality</p>
          <p className={cx(styles.col, styles['value'])}>{profileDetails.nationality}</p>
        </div>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>Religion</p>
          <p className={cx(styles.col, styles['value'])}>{profileDetails.religion}</p>
        </div>
      </div>
    </section>

    <section className={styles.box}>
      <h3 className={styles.title}>Contact details</h3>
      <div className={styles['box-table']}>
        <div className={cx(styles['box-row'], styles.header)}>
          <div className={styles['col']}>
            <h4 className={styles['box-col-header']}>Address</h4>
          </div>
          <div className={styles['col']}>
            <h4 className={styles['box-col-header']}>Email & Phone</h4>
          </div>
        </div>
        <div className={styles['box-row']}>
          <div className={styles['col']}>
            <p className={styles['value']}>{profileDetails.address}</p>
            <p className={styles['value']}>{profileDetails.city}, {profileDetails.state}</p>
            <p className={styles['value']}>{`${profileDetails.country} (${profileDetails.pincode})`}</p>
          </div>
          <div className={styles['col']}>
            <p className={styles['value']}>{profileDetails.email}</p>
            <p className={styles['value']}>{profileDetails.altEmail}</p>
            <p className={styles['value']}>{profileDetails.phone}</p>
            <p className={styles['value']}>{profileDetails.altPhone}</p>
          </div>
        </div>
      </div>

      <div className={styles['box-table']}>
        <div className={cx(styles['box-row'], styles.header)}>
          <h4 className={cx(styles['col'], styles['box-col-header'])}>Your Social Profiles</h4>
        </div>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>LinkedIn</p>
          <p className={cx(styles.col, styles['value'])}>{profileDetails.linkedin}</p>
        </div>
        <div className={styles['box-row']}>
          <p className={cx(styles.col, styles['label'])}>GitHub</p>
          <p className={cx(styles.col, styles['value'])}>{profileDetails.github}</p>
        </div>
      </div>
    </section>
    <ModalComponent isOpen={isModalOpen} setIsOpen={(val) => {setIsModalOpen(val)}}>
      <PersonalDetailsForm />
    </ModalComponent>
  </>)
}

export default PersonalDetails;