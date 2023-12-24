import React from 'react'
import { Button } from '../components/Admin'
import styles from "./Admin.module.scss"
import cx from 'classnames'


const Admin = () => {
    return (
        <>
            <div className="__page-content container">
                <div className={cx(styles.table_heading)} >
                    <div>
                        <h3>Welcome Back !</h3>
                        <p>Here is list of pending request needs to ressolve</p>
                    </div>
                    <div>
                        <Button type="submit" className='primary'>Export </Button>
                    </div>
                </div>
                <div className={cx(styles.filterQuerry)}>

                    <input className={cx(styles.inputBox)} type="text" placeholder='serach the name here' ></input>
                    <div>Toggle button pendings</div>
                    <div>Toggle button rejected</div>
                </div>



                <table>
                    <tr className={cx(styles.tableLabel)}>
                        <th>
                            <input type="checkbox"></input>
                            Tasks
                        </th>
                        <th style={{ width: "300px", textAlign: "left" }}>
                            Name of student
                        </th>

                        <th>
                            Batch
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Last Updated
                        </th>

                        <th>Controls</th>
                    </tr>

                    <tr>
                        <td>00fdasf</td>
                        <td>Pursottam sah</td>
                        <td>Batch 2020-24</td>
                        <td>Pending</td>
                        <td>4 Dec 2023</td>
                        <td>Button showing update or reject</td>

                    </tr>
                </table>

                <div className='tableBottom'>
                    <div>Counts </div>
                    <div>Rows per page</div>
                    <div>Current page</div>
                    <div>movement</div>
                </div>
            </div>

        </>


    )
}

export default Admin