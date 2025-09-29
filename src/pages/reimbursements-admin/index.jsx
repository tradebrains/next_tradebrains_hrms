import CustomTable from "@/components/Tables/CustomTable";
import React, { useEffect, useState } from "react";
import styles from "./reimbursement.module.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Select,
  Upload,
} from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import {
  deleteReimburse,
  editAdminReimburse,
  getAdminReimburse,
  postAdminReimburse,
  postStatusReimburse,
} from "../api/fetchClient";
import CustomPagination from "@/components/Tables/CustomPagination";
import { Pencil } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";

function AdminReimbursement({ employeeIdMail }) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [addReimburseModal, setReimburseModal] = useState(false);
  const [id, setId] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [totalCount, setTotalCount] = useState();
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [pendingStatus, setPendingStatus] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);

  const getTableData = async () => {
    try {
      const resp = await getAdminReimburse(Page);
      if (resp?.status === 200) {
        setTableData(resp?.data?.results);
        setTotalCount(resp?.data?.count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTableData();
  }, [addReimburseModal, deleteModal, Page, statusModal]);

  useEffect(() => {
    if (addReimburseModal && id && tableData.length > 0) {
      const data = tableData.find((item) => item.id === id);
      if (data) {
        form.setFieldsValue({
          ...data,
          date: data?.date ? dayjs(data.date) : null,
        });
      }
    } else if (addReimburseModal && !id) {
      form.resetFields();
    }
  }, [id, addReimburseModal, tableData]);

  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const handleStatusUpdater = (id, value) => {
    setPendingId(id);
    setPendingStatus(value);
    setStatusModal(true);
  };

  const submitStatus = async () => {
    try {
      const resp = await postStatusReimburse(pendingId, pendingStatus);
      if (resp.status === 200) {
        message.success("Status Updated");

        setSelectedStatuses((prev) => ({
          ...prev,
          [pendingId]: pendingStatus,
        }));

        setStatusModal(false);
      }
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const handleSelectChange = (value) => {
    setSelectedEmployeeId(value);
  };

  const submitDelete = async () => {
    const resp = await deleteReimburse(deleteID);
    if (resp.status === 204) {
      message.success("Reimbursement Deleted");
      setDeleteModal(false);
    }
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("employee_id", values.employee_id);
    formData.append("email", values.email);
    formData.append("purpose", values.purpose);
    formData.append("amount", values.amount);
    formData.append("date", values.date.format("YYYY-MM-DD"));

    if (values.receipt_file && values.receipt_file.file) {
      formData.append("receipt_file", values.receipt_file.file);
    }

    if (id) {
      try {
        const resp = await editAdminReimburse(id, formData);
        if (resp.status === 200) {
          message.success("Reimbursement Edited Successfully");
          form.resetFields();
          setReimburseModal(false);
        }
      } catch (error) {}
    } else {
      try {
        const resp = await postAdminReimburse(formData);
        if (resp.status === 201) {
          message.success("Reimbursement applied Successfully");
          form.resetFields();
          setReimburseModal(false);
        }
      } catch (error) {}
    }
  };

  const attachModelHandler = (value) => {
    setModal(true);
    setFile(value);
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
      title: "Employee",
      dataIndex: "full_name",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
      render: (text, record) => renderCell(text),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      render: (text, record) => renderCell(text),
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      sorter: (a, b) => a.purpose.length - b.purpose.length,
      render: (text, record) => renderCell(text),
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      align: "center",
      render: (text, record) => {
        console.log(record, "recordrecord");
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
                  onClick={() => attachModelHandler(record?.receipt_file)}
                  className="dropdown-item"
                >
                  {record?.receipt_file?.match(".pdf") ? (
                    <img
                      alt="pdf.file"
                      src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: ".5rem",
                      }}
                    />
                  ) : (
                    <Image
                      alt="image"
                      // src={record?.receipt_file}
                      width={50}
                      height={40}
                      style={{
                        width: "50px",
                        height: "40px",
                        borderRadius: ".5rem",
                      }}
                    />
                  )}
                </div>
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "150px",
      render: (text, record) => {
        const currentStatus = selectedStatuses[record.id] || record.status;

        const statusOptions = {
          Pending: (
            <>
              <span className="fa fa-dot-circle-o text-purple"></span> Pending
            </>
          ),
          Rejected: (
            <>
              <span className="fa fa-dot-circle-o text-danger"></span> Rejected
            </>
          ),
          Approved: (
            <>
              <span className="fa fa-dot-circle-o text-success"></span> Approved
            </>
          ),
        };

        return {
          props: {
            style: {
              ...baseCellStyle,
            },
          },
          children: (
            <div>
              <Select
                className={styles.select}
                value={currentStatus}
                onChange={(value) => handleStatusUpdater(record.id, value)}
                labelInValue={false}
              >
                <Option value="Pending" label="Pending">
                  {statusOptions.Pending}
                </Option>
                <Option value="Rejected" label="Rejected">
                  {statusOptions.Rejected}
                </Option>
                <Option value="Approved" label="Approved">
                  {statusOptions.Approved}
                </Option>
              </Select>
            </div>
          ),
        };
      },
      sorter: (a, b) => a.status.length - b.status.length,
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
    <>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Reimbursement</p>
        <div
          className={styles.add_employee}
          onClick={() => {
            setId(null);
            form.resetFields();
            setReimburseModal(true);
          }}
        >
          + Add Reimbursement
        </div>
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
      <Modal
        centered
        closable={true}
        width="500px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={addReimburseModal}
        footer={null}
        onCancel={() => setReimburseModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Reimbursement</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              className={styles.form}
            >
              <Form.Item
                label="Employee ID"
                name="employee_id"
                rules={[
                  { required: true, message: "Please select Employee ID" },
                ]}
                className={styles.item}
              >
                <Select
                  placeholder="Select"
                  onChange={handleSelectChange}
                  disabled={id}
                >
                  {employeeIdMail?.map((item) => (
                    <Option key={item?.employee_id} value={item?.employee_id}>
                      {item?.employee_id}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="User ID"
                name="email"
                rules={[{ required: true, message: "Please select User ID" }]}
                className={styles.item}
              >
                <Select placeholder="Select" disabled={id}>
                  {employeeIdMail?.map((item) => (
                    <Option key={item?.employee_id} value={item?.email}>
                      {item?.email}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Date of Bill"
                name="date"
                rules={[
                  { required: true, message: "Please select Date of Bill" },
                ]}
                className={styles.item}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please enter Amount" }]}
                className={styles.item}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Purpose"
                name="purpose"
                rules={[{ required: true, message: "Please enter Purpose" }]}
                className={styles.item}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item
                label="Attachment"
                name="receipt_file"
                rules={[{ required: true, message: "Add Attachment" }]}
              >
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </Form.Item>
              <p className={styles.choose_file}>.png*, .jpeg*, .pdf*</p>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submit}
                >
                  Submit
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
        visible={statusModal}
        footer={null}
        onCancel={() => setStatusModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
        okText="Yes"
        cancelText="No"
      >
        <div>
          <p className={styles.status_heading}>Reimbursement {pendingStatus}</p>
          <p className={styles.status_text}>
            Are you want to set {pendingStatus} status for this reimbursement?
          </p>
          <div className={styles.flex_button}>
            <div className={styles.yes_no_button} onClick={submitStatus}>
              Yes
            </div>
            <div
              className={styles.yes_no_button}
              onClick={() => setStatusModal(false)}
            >
              No
            </div>
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
          <p className={styles.status_heading}>Delete Reimbursement</p>
          <p className={styles.status_text}>
            Are you sure want to delete this Reimbursement?
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
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        closable
        centered
        width={600}
        closeIcon={<CloseOutlined className={`${"text-white"}`} />}
        className={`custom-kyc-terms-modal ${"kycmodal-close-dark"}`}
      >
        <div className={styles.terms_container}>
          <iframe
            src={file}
            width="100%"
            height="800px"
            style={{ border: "none" }}
          />
        </div>
      </Modal>
    </>
  );
}

export default AdminReimbursement;

export async function getServerSideProps(context) {
  const { req, query } = context;
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}employee/leaves/admin/employees/`,
    {
      headers: {
        Authorization: `Bearer ${req?.cookies?.hrms_access_token ?? null}`,
        "User-Agent": "PostmanRuntime/7.37.3",
      },
    }
  ).then((resp) => {
    return resp.json();
  });

  const employeeIdMail = res;
  return {
    props: {
      employeeIdMail: employeeIdMail,
      revalidate: 60,
    },
  };
}
