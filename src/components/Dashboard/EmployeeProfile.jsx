import React, { useState } from "react";
import styles from "./employee.module.css";
import Image from "next/image";
import { Dropdown, Menu } from "antd";
import { EllipsisVertical, PenLineIcon, Plus, Trash } from "lucide-react";
import EditBasicDetailsModal from "./EditBasicDetailsModal";
import AddPersonalDetails from "./AddEditPersonalDetails";
import DeleteModal from "./DeleteModal";
import UploadDocuments from "./UploadDocuments";

function EmployeeProfile({
  name,
  role,
  image,
  employeeDetails,
  managerList,
  employeeEmailIds,
  user_role,
  unknown
}) {
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

  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className={styles.card}>
      {user_role == 1 && (
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className={styles.dropdown_container}>
            <EllipsisVertical />
          </div>
        </Dropdown>
      )}

      <div className={styles.imageWrapper}>
        <Image
          src={imgSrc}
          alt={name}
          width={200}
          height={200}
          className={styles.image}
          onError={() => setImgSrc(unknown)}
        />
      </div>
      <div className={styles.content}>
        <h3 title={name} className={styles.name}>
          {name && name.length > 20 ? name.slice(0, 16) + "..." : name}
        </h3>
        <p className={styles.role}>{role}</p>
      </div>
      <EditBasicDetailsModal
        setEditBasicModal={setEditBasicModal}
        editBasicModal={editBasicModal}
        employeeDetails={employeeDetails}
        managerList={managerList}
      />
      <AddPersonalDetails
        setAddPersonalModal={setAddPersonalModal}
        addPersonalModal={addPersonalModal}
        setEditPersonalModal={setEditPersonalModal}
        editPersonalModal={editPersonalModal}
        employeeEmailIds={employeeEmailIds}
        deleteID={employeeDetails?.id}
      />
      <UploadDocuments
        uploadDocumentModal={uploadDocumentModal}
        setUploadDocumentModal={setUploadDocumentModal}
        employeeEmailIds={employeeEmailIds}
        deleteID={employeeDetails?.id}
      />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteID={employeeDetails?.id}
      />
    </div>
  );
}

export default EmployeeProfile;
