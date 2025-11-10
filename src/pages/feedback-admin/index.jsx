import React, { useEffect, useState } from "react";
import styles from "./feedbackAdmin.module.css";
import { Form, Popover } from "antd";
import CustomTable from "@/components/Tables/CustomTable";
import CustomPagination from "@/components/Tables/CustomPagination";
import { getFeedbackAdmin } from "../api/fetchClient";

function Feedback() {
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const [totalCount, setTotalCount] = useState();
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [feedback, setFeedback] = useState([]);

  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const getAdmin = async () => {
    try {
      const resp = await getFeedbackAdmin();
      if (resp?.status === 200) {
        setFeedback(resp?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAdmin();
  }, []);

  console.log(feedback , "feedback");
  

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
  ) => {
    const truncatedText =
      typeof text === "string" && text.length > 150
        ? text.slice(0, 150) + "..."
        : text;

    return {
      props: { style: baseCellStyle },
      children: (
        <span
          onClick={onClick}
          className={`ff-lato ${extraClasses} ${
            onClick ? "pointer link-hover-underline" : ""
          }`}
          style={{
            ...baseTextStyle,
            ...customStyle,
            display: "inline-block",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            verticalAlign: "middle",
          }}
          title={text}
        >
          {truncatedText}
        </span>
      ),
    };
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      width: "180px",
      render: (text, record) => renderCell(text),
    },
      {
      title: "Name",
      dataIndex: "full_name",
      width: "180px",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Feedback",
      dataIndex: "message",
      render: (text, record) => renderCell(text),
    },
  ];

  return (
    <div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} data={feedback} pagination={false} />
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

export default Feedback;
