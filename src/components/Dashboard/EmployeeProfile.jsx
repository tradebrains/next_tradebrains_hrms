import React, { useState } from "react";
import styles from "./employee.module.css";
import Image from "next/image";
import { Dropdown, Menu } from "antd";
import { EllipsisVertical, PenLineIcon, Plus, Trash } from "lucide-react";
import EditBasicDetailsModal from "./EditBasicDetailsModal";
import AddPersonalDetails from "./AddEditPersonalDetails";
import DeleteModal from "./DeleteModal";
import UploadDocuments from "./UploadDocuments";

function EmployeeProfile({ name, role, image }) {
  const [editBasicModal, setEditBasicModal] = useState(false);
  const [addPersonalModal, setAddPersonalModal] = useState(false);
  const [editPersonalModal, setEditPersonalModal] = useState(false);
  const [uploadDocumentModal, setUploadDocumentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const menu = (
    <Menu
      style={{ width: "200px", height: "auto" }}
      items={[
        {
          label: (
            <>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => setEditBasicModal(true)}
              >
                <div>
                  <PenLineIcon className="mx-10" style={{ fontSize: "23px" }} />
                </div>
                <div>Edit Basic Details</div>
              </div>
            </>
          ),
          key: "1",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => {
                setEditPersonalModal(false);
                setAddPersonalModal(true);
              }}
            >
              <div>
                <Plus className="mx-10" style={{ fontSize: "18px" }} />
              </div>
              <div>Add Personal Details</div>
            </div>
          ),
          key: "2",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => {
                setEditPersonalModal(true);
                setAddPersonalModal(true);
              }}
            >
              <div>
                <PenLineIcon className="mx-10" style={{ fontSize: "23px" }} />
              </div>
              <div>Edit Personal Details</div>
            </div>
          ),
          key: "3",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => setUploadDocumentModal(true)}
            >
              <div>
                <Plus className="mx-10" style={{ fontSize: "23px" }} />
              </div>
              <div>Upload Documents</div>
            </div>
          ),
          key: "4",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => setDeleteModal(true)}
            >
              <div>
                <Trash className="mx-10" style={{ fontSize: "23px" }} />
              </div>
              <div>Delete</div>
            </div>
          ),
          key: "5",
        },
      ]}
    />
  );

  return (
    <div className={styles.card}>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <div className={styles.dropdown_container}>
          <EllipsisVertical />
        </div>
      </Dropdown>

      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
      </div>
      <EditBasicDetailsModal
        setEditBasicModal={setEditBasicModal}
        editBasicModal={editBasicModal}
      />
      <AddPersonalDetails
        setAddPersonalModal={setAddPersonalModal}
        addPersonalModal={addPersonalModal}
        setEditPersonalModal={setEditPersonalModal}
        editPersonalModal={editPersonalModal}
      />
      <UploadDocuments
        uploadDocumentModal={uploadDocumentModal}
        setUploadDocumentModal={setUploadDocumentModal}
      />
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
    </div>
  );
}

export default EmployeeProfile;
