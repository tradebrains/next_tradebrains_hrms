import React, { useEffect, useState } from "react";
import styles from "./assets.module.css";
import CustomTable from "@/components/Tables/CustomTable";
import { Popover, Select } from "antd";
import { getEmployeeAsset } from "../api/fetchClient";
import CustomPagination from "@/components/Tables/CustomPagination";

function MyAssets() {
  const { Option } = Select;
  const [editAssetData, setEditAssetData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [totalCount, setTotalCount] = useState();

  const getAsset = async () => {
    try {
      const resp = await getEmployeeAsset(Page);
      if (resp?.status === 200) {
        setTableData(resp?.data?.results);
        setTotalCount(resp?.data?.count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAsset();
  }, []);

  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const baseCellStyle = {
    background: "#1e1e1e",
    borderRight: "1px solid #2f2f2f",
    borderLeft: "1px solid #2f2f2f",
    borderBottom: "none",
  };

  const baseTextStyle = {
    fontSize: "14px",
    fontWeight: "400",
    color: "white",
  };

  const renderCell = (
    text,
    customStyle = {},
    extraClasses = "",
    onClick = null
  ) => ({
    props: { style: baseCellStyle },
    children: (
      <span
        onClick={onClick}
        className={`ff-lato ${extraClasses} ${
          onClick ? "pointer link-hover-underline" : ""
        }`}
        style={{ ...baseTextStyle, ...customStyle }}
      >
        {text}
      </span>
    ),
  });

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      align: "center",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Employee Name",
      dataIndex: "full_name",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Assets Type",
      dataIndex: "type",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => renderCell(<span> ₹{text}</span>),
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Model Number",
      dataIndex: "model_number",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Date of Allocation",
      dataIndex: "received_date",
      render: (text, record) => renderCell(text),
      align: "center",
    },
    {
      title: "Date of Submission",
      dataIndex: "return_date",
      align: "center",
      render: (text, record) =>
        renderCell(
          <span>{record.status === "Assigned" ? "NA" : `${text}`}</span>
        ),
    },

    {
      title: "Status",
      dataIndex: "status",
      width: "150px",
      render: (text, record, i) => {
        return {
          props: {
            style: {
              ...baseCellStyle,
            },
          },
          children: (
            <div>
              {text === "Assigned" && (
                <div className={styles.select}>
                  <span className="fa fa-dot-circle-o text-success"></span>{" "}
                  Assigned
                </div>
              )}

              {text === "Returned" && (
                <div className={styles.select}>
                  <span className="fa fa-dot-circle-o text-info"></span>{" "}
                  Returned
                </div>
              )}
            </div>
          ),
        };
      },
    },
  ];
  return (
    <div>
      {" "}
      <div className={styles.top_section}>
        <p className={styles.header_text}>Assets</p>
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} data={tableData} pagination={false} />
          <CustomPagination
            current={Page.page}
            pageSize={Page.perPage}
            onChange={onPageChange}
            total={totalCount}
          />
        </div>
      </div>
    </div>
  );
}

export default MyAssets;
