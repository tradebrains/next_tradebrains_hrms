import svgSheet from "../../assets/svgSheets";
import { message, Modal } from "antd";
import React from "react";
import styles from "./employee.module.css";
import { deleteEmployee } from "@/pages/api/fetchClient";

function DeleteModal({ setDeleteModal, deleteModal, deleteID }) {
  const onConfirm = async () => {
    const resp = await deleteEmployee(deleteID);
    if (resp.status === 204) {
      message.success("Employee Deleted");
      setDeleteModal(false);
    }
  };
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
