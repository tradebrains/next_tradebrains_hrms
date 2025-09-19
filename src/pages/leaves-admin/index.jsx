import React, { useEffect, useState } from "react";
import styles from "./leaves.module.css";
import CustomTable from "@/components/Tables/CustomTable";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Popover,
  Select,
} from "antd";
import { Pencil } from "lucide-react";
import { getAdminLeaveList, postAdminLeaves } from "../api/fetchClient";

function AdminLeaves({ employeeIdMail }) {
  const [status, setStatus] = useState("");
  const [record, setRecord] = useState({});
  const [editData, setEditData] = useState({});
  const [deleteID, setDeleteID] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [addLeavesModal, setAddLeavesModal] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const getEmployeeDetails = async () => {
    try {
      const resp = await getAdminLeaveList();
      if (resp?.status === 200) {
        setEmployeeList(resp?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [addLeavesModal]);

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
      dataIndex: "employee_full_name",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
      render: (text, record) => renderCell(text),
    },

    {
      title: "From",
      dataIndex: "start_date",
      render: (text, record) => renderCell(text),
    },
    {
      title: "To",
      dataIndex: "end_date",
      render: (text, record) => renderCell(text),
    },
    {
      title: "No Of Days",
      dataIndex: "duration",
      render: (text, record) => renderCell(text),
    },

    {
      title: "Reason",
      dataIndex: "reason",
      render: (text, record) => renderCell(text),
      // sorter: (a, b) => a.reason.length - b.reason.length,
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
              <Select placeholder={text} className={styles.select}>
                <Option value="Pending">
                  <span className="fa fa-dot-circle-o text-purple"></span>
                  Pending
                </Option>
                <Option value="Rejected">
                  <span className="fa fa-dot-circle-o text-danger"></span>
                  Rejected
                </Option>
                <Option value="Approved">
                  {" "}
                  <span className="fa fa-dot-circle-o text-success"></span>
                  Approved
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
      dataIndex: "status",
      width: "50px",
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
                          setModel(true);
                          setId(record.id);
                          fetchAnnouncementById(record.id);
                        }}
                        className={`text-white`}
                      >
                        <p className={styles.edit}>Edit</p>
                      </div>
                      <div
                        onClick={() => {
                          setDeleteModal(true);
                          setId(record.id);
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

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      start_date: values.start_date
        ? values.start_date.format("YYYY-MM-DD")
        : null,
      end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
    };
    try {
      const resp = await postAdminLeaves(payload);
      if (resp.status === 201) {
        message.success("Leave applied Successfully");
        setAddLeavesModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Leaves</p>
        <div
          className={styles.add_employee}
          onClick={() => setAddLeavesModal(true)}
        >
          + Add Leaves
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} data={employeeList} />
        </div>
      </div>
      <Modal
        centered
        closable={true}
        width="500px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={addLeavesModal}
        footer={null}
        onCancel={() => setAddLeavesModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Leave</p>
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
                <Select placeholder="Select">
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
                <Select placeholder="Select">
                  {employeeIdMail.map((item) => (
                    <Option key={item?.employee_id} value={item?.email}>
                      {item?.email}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Leave Type"
                name="leave_type"
                rules={[
                  { required: true, message: "Please select Leave Type" },
                ]}
                className={styles.item}
              >
                <Select placeholder="Select">
                  <Option value="Previlege Leave">Previlege Leave</Option>
                  <Option value="Sick Leave">Sick Leave</Option>
                  <Option value="lop">Leave without Pay</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="From"
                name="start_date"
                rules={[{ required: true, message: "Please select From" }]}
                className={styles.item}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="To"
                name="end_date"
                rules={[{ required: true, message: "Please select To" }]}
                className={styles.item}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Leave Reason"
                name="reason"
                rules={[{ required: true, message: "Please enter Reason" }]}
                className={styles.item}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
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
    </div>
  );
}

export default AdminLeaves;

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
