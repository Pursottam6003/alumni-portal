import React from "react";
import styles from "./Modal.module.scss"
import { WebWindowXmark as CloseModelcon } from 'iconoir-react'

const ModalComponent = ({ isOpen=false, setIsOpen, children }) => {
  return (
    isOpen && (<div className={styles.darkBG} onClick={() => setIsOpen(false)}>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <CloseModelcon />
          </button>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    </div>)
  )
};

export default ModalComponent;