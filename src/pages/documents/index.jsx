import CustomPagination from "@/components/Tables/CustomPagination";
import CustomTable from "@/components/Tables/CustomTable";
import React, { useEffect, useState } from "react";
import styles from "./documents.module.css";
import { getEmployeeDocuments } from "../api/fetchClient";
import { Popover } from "antd";
import { Pencil } from "lucide-react";
import Image from "next/image";

function EmployeeDocuments() {
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [totalCount, setTotalCount] = useState();
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState("");
  const [reimburseModal, setReimburseModal] = useState(false);
  const [id, setId] = useState(null);

  const getTableData = async () => {
    try {
      const resp = await getEmployeeDocuments(Page);
      if (resp?.status === 200) {
        setTableData(resp?.data || []);
        setTotalCount(resp?.data?.count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTableData();
  }, [deleteModal, Page]);

  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const attachModelHandler = (value) => {
    setModal(true);
    setFile(value);
    alert(value);
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

  console.log(tableData, "tableDatatableData");

  const renderDocumentCell = (fileUrl, attachModelHandler) => {
    let content;

    if (!fileUrl) {
      content = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "25px", width: "25px", color: "red" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    } else if (fileUrl.match(/\.pdf$/i)) {
      // pdf case
      content = (
        <img
          alt="pdf.file"
          src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: ".5rem",
          }}
        />
      );
    } else {
      // image case
      content = (
        <Image
          alt="image"
          src={fileUrl}
          width={50}
          height={40}
          style={{
            width: "50px",
            height: "40px",
            borderRadius: ".5rem",
          }}
        />
      );
    }

    return {
      props: {
        style: {
          ...baseCellStyle,
        },
      },
      children: (
        <div>
          <span>
            <div
              onClick={() => attachModelHandler(fileUrl)}
              className="dropdown-item"
            >
              {content}
            </div>
          </span>
        </div>
      ),
    };
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      sorter: (a, b) => a.date.length - b.date.length,
      render: (text, record) => renderCell(text),
    },
    {
      title: "Voter ID",
      dataIndex: "voter_id",
      render: (text, record) =>
        renderDocumentCell(record?.voter_id, attachModelHandler),
    },
    {
      title: "Pan Card",
      dataIndex: "pan_card",
      render: (text, record) =>
        renderDocumentCell(record?.pan_card, attachModelHandler),
    },
    {
      title: "Aadhar Card",
      dataIndex: "aadhar_card",
      render: (text, record) =>
        renderDocumentCell(record?.aadhar_card, attachModelHandler),
    },
    {
      title: "Driving License",
      dataIndex: "driving_licence",
      render: (text, record) =>
        renderDocumentCell(record?.driving_licence, attachModelHandler),
    },
    {
      title: "Passport",
      dataIndex: "passport",
      render: (text, record) =>
        renderDocumentCell(record?.passport, attachModelHandler),
    },
    {
      title: "Bank Passbook",
      dataIndex: "passbook_first_page",
      render: (text, record) =>
        renderDocumentCell(record?.passbook_first_page, attachModelHandler),
    },
    {
      title: "Cancelled Check",
      dataIndex: "cancelled_check",
      render: (text, record) =>
        renderDocumentCell(record?.cancelled_check, attachModelHandler),
    },
    {
      title: "SSLC Certificate",
      dataIndex: "sslc_mark_sheet",
      render: (text, record) =>
        renderDocumentCell(record?.sslc_mark_sheet, attachModelHandler),
    },
    {
      title: "Plus Two Certificate",
      dataIndex: "plus_two_mark_sheet",
      render: (text, record) =>
        renderDocumentCell(record?.plus_two_mark_sheet, attachModelHandler),
    },
    {
      title: "UG Certificate",
      dataIndex: "ug_certificate",
      render: (text, record) =>
        renderDocumentCell(record?.ug_certificate, attachModelHandler),
    },
    {
      title: "PG Certificate",
      dataIndex: "pg_certificate",
      render: (text, record) =>
        renderDocumentCell(record?.pg_certificate, attachModelHandler),
    },
    {
      title: "Offer Letter",
      dataIndex: "offer_letter",
      render: (text, record) =>
        renderDocumentCell(record?.offer_letter, attachModelHandler),
    },
    {
      title: "Relieving Letter",
      dataIndex: "relieving_letter",
      render: (text, record) =>
        renderDocumentCell(record?.relieving_letter, attachModelHandler),
    },
    {
      title: "Other Certificate 1",
      dataIndex: "other_certificates_1",
      render: (text, record) =>
        renderDocumentCell(record?.other_certificates_1, attachModelHandler),
    },
    {
      title: "Other Certificate 2",
      dataIndex: "other_certificates_2",
      render: (text, record) =>
        renderDocumentCell(record?.other_certificates_2, attachModelHandler),
    },
    {
      title: "Action",
      render: (text, record, i) => {
        return {
          props: {
            style: {
              ...baseCellStyle,
            },
          },
          children: (
            <div
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
                cursor: "pointer",
              }}
            >
              {record?.status === "Approved" ? (
                "NA"
              ) : (
                <Popover
                  color={"#2f2f2f"}
                  className={`nameis fs-s-20 `}
                  openClassName=""
                  placement="bottom"
                  style={{ width: "10px", height: "30px" }}
                  content={
                    <div className="">
                      <div
                        onClick={() => {
                          setReimburseModal(true);
                          setId(record.id);
                        }}
                        className={`text-white`}
                      >
                        <p className={styles.edit}>Edit</p>
                      </div>
                      <div
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteID(record.id);
                        }}
                        className={`text-white mt-10`}
                      >
                        <p className={styles.edit}>Delete</p>
                      </div>
                    </div>
                  }
                >
                  <p className="mb-0">{<Pencil />}</p>
                </Popover>
              )}
            </div>
          ),
        };
      },
    },
  ];

  return (
    <div className={styles.top_section}>
      <p className={styles.header_text}>Employee Documents</p>
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

export default EmployeeDocuments;
