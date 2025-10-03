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
import {
  deleteLeaves,
  editLeaves,
  getEmployeeLeaves,
  getLeftLeaves,
  postEmployeeLeaves,
} from "../api/fetchClient";
import { authStore } from "@/redux/reducer/authSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function EmployeeLeaves({}) {
  const [id, setId] = useState("");
  const [leavesTable, setLeavesTable] = useState([]);
  const [addLeavesModal, setAddLeavesModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteId] = useState("");
  const [leavesLeft, setLeavesLeft] = useState("");
  const [form] = Form.useForm();
  const { Option } = Select;

  const auth = useSelector(authStore);
  const employee_id = auth?.userData?.user_details?.employee_id;

  const getLeaves = async () => {
    try {
      const resp = await getEmployeeLeaves();
      if (resp?.status === 200) {
        setLeavesTable(resp?.data?.results);
      }
    } catch (error) {}
  };

  const getLeavesLeft = async () => {
    try {
      const resp = await getLeftLeaves(employee_id);
      if (resp?.status === 200) {
        setLeavesLeft(resp?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getLeaves();
    getLeavesLeft();
  }, [addLeavesModal, deleteModal]);

  useEffect(() => {
    if (addLeavesModal && id && leavesTable.length > 0) {
      const data = leavesTable.find((item) => item.id === id);
      if (data) {
        form.setFieldsValue({
          ...data,
          start_date: data?.start_date ? dayjs(data.start_date) : null,
          end_date: data?.end_date ? dayjs(data.end_date) : null,
        });
      }
    } else if (addLeavesModal && !id) {
      form.resetFields();
    }
  }, [id, addLeavesModal, leavesTable]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      employee: auth?.userData?.user_details?.id,
      start_date: values.start_date
        ? values.start_date.format("YYYY-MM-DD")
        : null,
      end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
    };
    if (id) {
      try {
        const resp = await editLeaves(id, payload);
        if (resp.status === 200) {
          message.success("Leave Edited Successfully");
          setAddLeavesModal(false);
          form.resetFields();
        }
      } catch (error) {}
    } else {
      try {
        const resp = await postEmployeeLeaves(payload);
        if (resp.status === 201) {
          message.success("Leave applied Successfully");
          setAddLeavesModal(false);
          form.resetFields();
        }
      } catch (error) {}
    }
  };

  const submitDelete = async () => {
    const resp = await deleteLeaves(deleteID);
    if (resp.status === 204) {
      message.success("Leave Deleted");
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

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leave_type",
      render: (text, record) =>
        renderCell(
          text === "leave_without_pay"
            ? "Leave without Pay"
            : text === "Priviledged leave"
            ? "Privilege Leave"
            : text === "Sick leave"
            ? "Sick Leave"
            : ""
        ),
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
      dataIndex: "no_of_days",
      render: (text, record) => renderCell(text),
    },

    {
      title: "Reason",
      dataIndex: "reason",
      render: (text, record) => renderCell(text),
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
              {text === "Pending" && (
                <div className={styles.select}>
                  <span className="fa fa-dot-circle-o text-purple"></span>{" "}
                  Pending
                </div>
              )}

              {text === "Rejected" && (
                <div className={styles.select}>
                  <span className="fa fa-dot-circle-o text-danger"></span>{" "}
                  Rejected
                </div>
              )}
              {text === "Approved" && (
                <div className={styles.select}>
                  <span className="fa fa-dot-circle-o text-success"></span>{" "}
                  Approved
                </div>
              )}
              {text === "Decline" && (
                <div className={styles.select}>
                  <span className="fa fa-dot-circle-o text-info"></span> Decline
                </div>
              )}
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
                          setAddLeavesModal(true);
                          setId(record.id);
                        }}
                        className={`text-white`}
                      >
                        <p className={styles.edit}>Edit</p>
                      </div>
                      <div
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteId(record.id);
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
    <div>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Leaves</p>
        <div
          className={styles.add_employee}
          onClick={() => {
            setId(null);
            form.resetFields();
            setAddLeavesModal(true);
          }}
        >
          + Add Leaves
        </div>
      </div>
      <div className={styles.leaves_cnt}>
        <div className={styles.leaves_left}>
          <p className={styles.leaves_text}>Privilege Leave Left</p>
          <p className={styles.leaves_number}>
            {leavesLeft?.privilege_leaves_left}
          </p>
        </div>
        <div className={styles.leaves_left}>
          <p className={styles.leaves_text}>Sick Leave Left</p>
          <p className={styles.leaves_number}>{leavesLeft?.sick_leaves_left}</p>
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} data={leavesTable} />
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
                label="Leave Type"
                name="leave_type"
                rules={[
                  { required: true, message: "Please select Leave Type" },
                ]}
                className={styles.item}
              >
                <Select placeholder="Select">
                  <Option value="privilege_leave">Privilege Leave</Option>
                  <Option value="sick_leave">Sick Leave</Option>
                  <Option value="leave_without_pay">Leave without Pay</Option>
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
          <p className={styles.status_heading}>Delete Leave</p>
          <p className={styles.status_text}>
            Are you sure want to delete this leave?
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

export default EmployeeLeaves;
