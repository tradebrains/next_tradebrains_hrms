import React, { useState } from "react";
import styles from "./assets.module.css";
import CustomTable from "@/components/Tables/CustomTable";

function MyAssets() {
  const [editAssetData, setEditAssetData] = useState({});

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      align: "center",
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      render: (text, record) => <span> {record.employee.name}</span>,
    },
    {
      title: "Assets Type",
      dataIndex: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => <span> ₹{text}</span>,
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <span
          className="d-inline-block text-truncate"
          data-toggle="tooltip"
          data-placement="top"
          title={text}
          style={{ maxWidth: "150px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Model Number",
      dataIndex: "model_no",
    },
    {
      title: "Date of Allocation",
      dataIndex: "date_of_allocation",
      align: "center",
    },
    {
      title: "Date of Submission",
      dataIndex: "date_of_submition",
      render: (text, record) => (
        <span>{record.status === "Assigned" ? "NA" : `${text}`}</span>
      ),
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div
          key={record.employee_id}
          className="dropdown action-label text-center"
        >
          <a
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                text === "Pending"
                  ? "fa fa-dot-circle-o text-danger"
                  : text === "Assigned"
                  ? "fa fa-dot-circle-o text-success"
                  : "fa fa-dot-circle-o text-info"
              }
            />{" "}
            {text}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {record.status === "Assigned" ? (
              <a
                className="dropdown-item"
                onClick={() =>
                  setEditAssetData({ ...record, status: "Returned" })
                }
                data-toggle="modal"
                data-target="#add_return"
              >
                <i className="fa fa-dot-circle-o text-info" /> Returned
              </a>
            ) : (
              <a
                className="dropdown-item"
                onClick={() => handleStatusChange(record, "Assigned")}
              >
                <i className="fa fa-dot-circle-o text-success" /> Assigned
              </a>
            )}
          </div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div
          key={record.employee_id}
          className="dropdown dropdown-action text-right"
        >
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              onClick={() => {
                setEditAssetData(record);
                editHandleShow();
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href=""
              onClick={() => setEditAssetData(record.id)}
              data-toggle="modal"
              data-target="#delete_asset"
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <div className={styles.top_section}>
        <p className={styles.header_text}>Assets</p>
        <div
          className={styles.add_employee}
          onClick={() => setAddEmployeeModal(true)}
        >
          + Add Assets
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default MyAssets;
