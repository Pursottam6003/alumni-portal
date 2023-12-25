import React from "react";
import styles from "./Model.module.scss"
import { WebWindowXmark as CloseModelcon } from 'iconoir-react'

const ModalComponent = ({ setIsProfileUpdated, componentToRender }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsProfileUpdated(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h6 className={styles.heading}>You have already responded! Please update your details if needed</h6> {/* this is not working for getting the label of form*/}
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsProfileUpdated(false)}>
                        <CloseModelcon />
                    </button>
                    <div className={styles.modalContent}>
                        {componentToRender}
                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalComponent;