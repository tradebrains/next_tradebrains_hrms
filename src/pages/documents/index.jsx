import CustomPagination from "@/components/Tables/CustomPagination";
import CustomTable from "@/components/Tables/CustomTable";
import React, { useEffect, useState } from "react";
import styles from "./documents.module.css";
import {
  deleteEmployeeDocuments,
  editEmployeeDocuments,
  getEmployeeDocuments,
  getEmployeeIds,
} from "../api/fetchClient";
import { Button, Form, Input, message, Modal, Popover, Upload } from "antd";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Loader2 } from "lucide-react";

function EmployeeDocuments() {
  const [form] = Form.useForm();
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [totalCount, setTotalCount] = useState();
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState("");
  const [reimburseModal, setReimburseModal] = useState(false);
  const [id, setId] = useState(null);
  const [putId, setPutId] = useState("");
  const [uploadDocumentModal, setUploadDocumentModal] = useState(false);
  const [employeeEmailIds, setEmployeeEmailIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTableData = async () => {
    try {
      const resp = await getEmployeeDocuments(Page);
      if (resp?.status === 200) {
        setTableData(resp?.data?.results || []);
        setTotalCount(resp?.data?.count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (uploadDocumentModal && id && tableData.length > 0) {
      const data = tableData.find((item) => item.id === putId);
      if (data) {
        form.setFieldsValue({
          ...data,
          date: data?.date ? dayjs(data.date) : null,
        });
      }
    } else if (uploadDocumentModal && !putId) {
      form.resetFields();
    }
  }, [putId, uploadDocumentModal, tableData]);

  useEffect(() => {
    getTableData();
  }, [deleteModal, Page, uploadDocumentModal]);

  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const attachModelHandler = (value) => {
    setModal(true);
    setFile(value);
  };

  const onSubmit = async (values) => {
    const formdata = new FormData();
    setLoading(true);
    formdata.append("employee_id", values.employee_id);

    if (values.offer_letter?.file) {
      formdata.append("offer_letter", values.offer_letter.file);
    }
    if (values.relieving_letter?.file) {
      formdata.append("relieving_letter", values.relieving_letter.file);
    }
    if (values.pan_card?.file) {
      formdata.append("pan_card", values.pan_card.file);
    }
    if (values.aadhar_card?.file) {
      formdata.append("aadhar_card", values.aadhar_card.file);
    }
    if (values.driving_licence?.file) {
      formdata.append("driving_licence", values.driving_licence.file);
    }
    if (values.passport?.file) {
      formdata.append("passport", values.passport.file);
    }
    if (values.voter_id?.file) {
      formdata.append("voter_id", values.voter_id.file);
    }
    if (values.sslc_mark_sheet?.file) {
      formdata.append("sslc_mark_sheet", values.sslc_mark_sheet.file);
    }
    if (values.plus_two_mark_sheet?.file) {
      formdata.append("plus_two_mark_sheet", values.plus_two_mark_sheet.file);
    }
    if (values.ug_certificate?.file) {
      formdata.append("ug_certificate", values.ug_certificate.file);
    }
    if (values.pg_certificate?.file) {
      formdata.append("pg_certificate", values.pg_certificate.file);
    }
    if (values.other_certificate_1?.file) {
      formdata.append("other_certificate_1", values.other_certificate_1.file);
    }
    if (values.other_certificate_2?.file) {
      formdata.append("other_certificate_2", values.other_certificate_2.file);
    }
    if (values.passbook_first_page?.file) {
      formdata.append("passbook_first_page", values.passbook_first_page.file);
    }
    if (values.cancelled_check?.file) {
      formdata.append("cancelled_check", values.cancelled_check.file);
    }

    try {
      const resp = await editEmployeeDocuments(id, formdata);
      if (resp.status === 200) {
        form.resetFields();
        setLoading(false);
        setUploadDocumentModal(false);
      }
    } catch (error) {}
  };

  const submitDelete = async () => {
    const resp = await deleteEmployeeDocuments(deleteID);
    if (resp.status === 204) {
      message.success("Documents Deleted");
      setDeleteModal(false);
    }
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
    } else if (fileUrl.match(".pdf")) {
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
                          setUploadDocumentModal(true);
                          setId(record.employee);
                          setPutId(record?.id);
                        }}
                        className={`text-white`}
                      >
                        <p className={styles.edit}>Edit</p>
                      </div>
                      <div
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteID(record.employee);
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
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        closable
        centered
        width={600}
        closeIcon={<CloseOutlined className="text-white" />}
        className={`custom-kyc-terms-modal kycmodal-close-dark`}
      >
        <div className={styles.terms_container}>
          {file?.match(".pdf") ? (
            // PDF case → use normal iframe
            <iframe
              src={file}
              width="100%"
              height="400px"
              style={{ border: "none" }}
            />
          ) : (
            // Image case → use srcDoc with CSS
            <iframe
              srcDoc={`
          <html>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100%;">
              <img src="${file}" style="max-width:100%;max-height:100%;object-fit:contain;" />
            </body>
          </html>
        `}
              width="100%"
              height="400px"
              style={{ border: "none" }}
            />
          )}
        </div>
      </Modal>
      <Modal
        centered
        closable={true}
        width="800px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={uploadDocumentModal}
        footer={null}
        onCancel={() => setUploadDocumentModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Upload Employee Documents</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
            >
              <div className={styles.row}>
                <Form.Item
                  label="Name"
                  name="employee_name"
                  rules={[
                    {
                      required: true,
                      message: "Please select email",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="Employee"
                  name="employee_id"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Employment Type",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input disabled />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Offer Letter"
                  name="offer_letter"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Offer Letter"
                  name="relieving_letter"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>ID Proof</p>
              <div className={styles.row}>
                <Form.Item
                  label="PAN Card"
                  name="pan_card"
                  className={styles.upload}
                  // rules={[
                  //   { required: true, message: "Please upload Pan Card" },
                  // ]}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Aadhar Card"
                  name="aadhar_card"
                  className={styles.upload}
                  // rules={[
                  //   { required: true, message: "Please upload Aadhar Card" },
                  // ]}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Driving licence"
                  name="driving_licence"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="passport"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item label="Voter ID" name="voter_id">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>Bank Details</p>
              <div className={styles.row}>
                <Form.Item
                  label="Passbook First Page"
                  name="passbook_first_page"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Cancelled Check"
                  name="cancelled_check"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>Education Details</p>
              <div className={styles.row}>
                <Form.Item
                  label="SSLC Mark Sheet"
                  name="sslc_mark_sheet"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Plus Two Mark Sheet"
                  name="plus_two_mark_sheet"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="UG Certificate"
                  name="ug_certificate"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="PG Certificate"
                  name="pg_certificate"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Other Certificates 1"
                  name="other_certificate_1"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Other Certificates 2"
                  name="other_certificate_2"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
            
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submit}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.loader_wrapper}>
                      <Loader2 className={styles.loader_icon} />
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        closable={true}
        width="500px"
        bodyStyle={{ padding: "0px", minHeight: "150px", borderRadius: "18px" }}
        visible={deleteModal}
        footer={null}
        onCancel={() => setDeleteModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
        okText="Delete"
        cancelText="Cancel"
      >
        <div>
          <p className={styles.status_heading}>Delete Documents</p>
          <p className={styles.status_text}>
            Are you sure want to delete this Documents?
          </p>
          <div className={styles.flex_button}>
            <div className={styles.yes_no_button} onClick={submitDelete}>
              Delete
            </div>
            <div
              className={styles.yes_no_button}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeDocuments;

export async function getServerSideProps(context) {
  const { req, query } = context;

  if (!req?.cookies?.hrms_access_token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
