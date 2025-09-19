import CustomTable from "@/components/Tables/CustomTable";
import React, { useState } from "react";
import styles from "./my.module.css";

function MyReimbursement() {
  const [addAssetsModal, setAddAssetsModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteID, setDeleteID] = useState(null);
  const [record, setRecord] = useState({});
  const [status, setStatus] = useState("");

  const columns = [
    {
      title: "Employee",
      dataIndex: "name",
      render: (text, record, i) => (
        <h2 key={i} className="table-avatar">
          <div className="avatar">
            <img alt="" src={record.image} />
          </div>
          <div>
            {text}
            <span>{record.role}</span>
          </div>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      align: "center",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      sorter: (a, b) => a.purpose.length - b.purpose.length,
      align: "center",
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      align: "center",
      render: (attachment) => (
        <span>
          <a
            onClick={() => attachModelHandler(attachment)}
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#attachment-modal"
          >
            {attachment.match(".pdf") ? (
              <img
                alt="pdf.file"
                src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
                style={{ width: "40px", height: "40px", borderRadius: ".5rem" }}
              />
            ) : (
              <img
                alt="image.file"
                src={attachment}
                style={{ width: "50px", height: "40px", borderRadius: ".5rem" }}
              />
            )}
          </a>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (text, record, i) => {
        return (
          <div key={i} className="dropdown action-label text-center">
            <a
              className="btn btn-white btn-sm btn-rounded dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className={
                  text === "New"
                    ? "fa fa-dot-circle-o text-purple"
                    : text === "Pending"
                    ? "fa fa-dot-circle-o text-info"
                    : text === "Approved"
                    ? "fa fa-dot-circle-o text-success"
                    : "fa fa-dot-circle-o text-danger"
                }
              />{" "}
              {text}
            </a>
            <div
              style={{ cursor: "pointer" }}
              className="dropdown-menu dropdown-menu-right"
            >
              {record.status !== "Approved" && (
                <div
                  onClick={() => {
                    setStatus("Pending");
                    setRecord(record);
                  }}
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#approve_reimbursement"
                >
                  <i className="fa fa-dot-circle-o text-info" /> Pending
                </div>
              )}
              {record.status !== "Approved" && (
                <div
                  onClick={() => {
                    setStatus("Approved");
                    setRecord(record);
                  }}
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#approve_reimbursement"
                >
                  <i className="fa fa-dot-circle-o text-success" /> Approved
                </div>
              )}
              {record.status !== "Approved" && (
                <div
                  onClick={() => {
                    setStatus("Rejected");
                    setRecord(record);
                  }}
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#approve_reimbursement"
                >
                  <i className="fa fa-dot-circle-o text-danger" /> Rejected
                </div>
              )}
              {record.status === "Approved" && (
                <div
                  onClick={() => {
                    setStatus("Decline");
                    setRecord(record);
                  }}
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#approve_reimbursement"
                >
                  <i className="fa fa-dot-circle-o text-purple" /> Decline
                </div>
              )}
            </div>
          </div>
        );
      },
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      render: (text, record, i) => {
        return (
          <div key={i} className="dropdown dropdown-action text-center">
            {record.status !== "Approved" ? (
              <>
                <div
                  style={{ cursor: "pointer" }}
                  className="action-icon dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="material-icons">more_vert</i>
                </div>
                <div className="dropdown-menu dropdown-menu-right">
                  <div
                    onClick={() => {
                      editHandleShow();
                      setEditData(record);
                      handleEdit(record.id);
                    }}
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                  >
                    <i className="fa fa-pencil m-r-5" /> Edit
                  </div>
                  <div
                    onClick={() => {
                      deleteHandleShow();
                      setDeleteID(record.id);
                    }}
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                  >
                    <i className="fa fa-trash-o m-r-5" /> Delete
                  </div>
                </div>
              </>
            ) : (
              "NA"
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Reimbursement</p>
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} />
        </div>
      </div>
    </>
  );
}

export default MyReimbursement;
