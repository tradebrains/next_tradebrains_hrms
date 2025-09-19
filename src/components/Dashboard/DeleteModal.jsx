import svgSheet from "../../assets/svgSheets";
import { Modal } from "antd";
import React from "react";
import styles from "./employee.module.css";

function DeleteModal({ setDeleteModal, deleteModal }) {
  return (
    <Modal
      style={{ width: "320px" }}
      width={"400px"}
      visible={deleteModal}
      centered
      className="modal-bg-custom"
      onCancel={() => {
        setDeleteModal(false);
      }}
      footer={[
        <div onClick={() => onConfirm()} className="">
          <button className={styles.confirm_button}>Confirm</button>
        </div>,
      ]}
    >
      <div className={styles.main_container}>
        <p>{svgSheet.payReject}</p>
        <div className={styles.main_container}>
          <p className={styles.text}> {" Delete Of This Item"}</p>
          <p className={styles.text}>
            Are you sure you want to delete this item ?
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
