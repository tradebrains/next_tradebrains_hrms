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
import { Loader2, Pencil } from "lucide-react";
import {
  deleteLeaves,
  editLeaves,
  getAdminLeaveList,
  getLeftLeaves,
  postAdminLeaves,
  postCompOff,
  postEventPass,
  postLeaveStatus,
} from "../api/fetchClient";
import dayjs from "dayjs";
import { itemRender, onShowSizeChange } from "@/utility/PaginationFunction";
import CustomPagination from "@/components/Tables/CustomPagination";
import { set } from "date-fns";

function AdminLeaves({ employeeIdMail }) {
  const [statusModal, setStatusModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [leftLeaves, setLeftLeaves] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [addLeavesModal, setAddLeavesModal] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [addCompModal, setAddCompModal] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState({}); // { id: status }
  const [pendingStatus, setPendingStatus] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [totalCount, setTotalCount] = useState();
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const getEmployeeDetails = async () => {
    try {
      const resp = await getAdminLeaveList(Page);
      if (resp?.status === 200) {
        setEmployeeList(resp?.data?.results);
        setTotalCount(resp?.data?.count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [addLeavesModal, deleteModal, Page]);

  useEffect(() => {
    if (addLeavesModal && id && employeeList.length > 0) {
      const data = employeeList.find((item) => item.id === id);
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
  }, [id, addLeavesModal, employeeList]);

  const getLeavesLeft = async () => {
    try {
      const resp = await getLeftLeaves(selectedEmployeeId);
      if (resp?.status === 200) {
        setLeftLeaves(resp?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedEmployeeId) {
      getLeavesLeft();
    }
  }, [selectedEmployeeId]);

  const handleStatusUpdater = (id, value) => {
    setPendingId(id);
    setPendingStatus(value);
    setStatusModal(true);
  };

  const submitStatus = async () => {
    try {
      const resp = await postLeaveStatus(pendingId, pendingStatus);
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

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
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
          setLoading(false);
          form.resetFields();
        }
      } catch (error) {}
    } else {
      try {
        const resp = await postAdminLeaves(payload);
        if (resp.status === 201) {
          message.success("Leave applied Successfully");
          setAddLeavesModal(false);
          setLoading(false);
          form.resetFields();
        }
      } catch (error) {}
    }
  };

  const onSubmitComp = async (values) => {
    try {
      const resp = await postCompOff(values);
      if (resp.status === 201) {
        message.success("Comp off leave added Successfully");
        setAddCompModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const onSubmitEvent = async (values) => {
    const payload = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };
    try {
      const resp = await postEventPass(payload);
      if (resp.status === 201) {
        message.success("Attendance added Successfully");
        setAddEventModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const submitDelete = async () => {
    const resp = await deleteLeaves(deleteID);
    if (resp.status === 204) {
      message.success("Leave Deleted");
      setDeleteModal(false);
    }
  };

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
  ) => {
    const truncatedText =
      typeof text === "string" && text.length > 20
        ? text.slice(0, 20) + "..."
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
      title: "Employee",
      dataIndex: "full_name",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
      render: (text, record) =>
        renderCell(
          text === "leave_without_pay"
            ? "Leave without Pay"
            : text === "privilege_leave"
            ? "Privilege Leave"
            : text === "sick_leave"
            ? "Sick Leave"
            : text === "comp_off"
            ? "Compensatory Off"
            : text
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
          Declined: (
            <>
              <span className="fa fa-dot-circle-o text-info"></span> Declined
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
                optionLabelProp="children"
              >
                <Option value={currentStatus} disabled>
                  {statusOptions[currentStatus]}
                </Option>

                {currentStatus === "Pending" && (
                  <>
                    <Option value="Rejected">{statusOptions.Rejected}</Option>
                    <Option value="Approved">{statusOptions.Approved}</Option>
                  </>
                )}

                {(currentStatus === "Approved" ||
                  currentStatus === "Rejected") &&
                  currentStatus !== "Declined" && (
                    <Option value="Declined">{statusOptions.Declined}</Option>
                  )}
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
              {record?.status === "Approved" ||
              record?.status === "Declined" ||
              record?.status === "Rejected" ? (
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
    <div>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Leaves</p>
        <div className={styles.flex_add_button}>
          <div
            className={styles.add_employee}
            onClick={() => {
              form.resetFields();
              setAddEventModal(true);
            }}
          >
            + Event Day
          </div>
          <div
            className={styles.add_comp_off}
            onClick={() => {
              form.resetFields();
              setAddCompModal(true);
            }}
          >
            + Add Comp Off
          </div>
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
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable
            columns={columns}
            data={employeeList}
            pagination={false}
          />
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
                <Select
                  showSearch
                  optionFilterProp="children"
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
              {leftLeaves && (
                <div className={styles.flex_between}>
                  <p className={styles.leaves_left_text}>
                    Sick Leave Left : {leftLeaves?.sick_leaves_left}
                  </p>
                  <p className={styles.leaves_left_text}>
                    Privilege Leave Left : {leftLeaves?.privilege_leaves_left}
                  </p>
                </div>
              )}
              <Form.Item
                label="User ID"
                name="email"
                rules={[{ required: true, message: "Please select User ID" }]}
                className={styles.item}
              >
                <Select
                  placeholder="Select"
                  disabled={id}
                  showSearch
                  optionFilterProp="children"
                >
                  {employeeIdMail?.map((item) => (
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
                  <Option value="privilege_leave">Privilege Leave</Option>
                  <Option value="sick_leave">Sick Leave</Option>
                  <Option value="leave_without_pay">Leave without Pay</Option>
                  <Option value="comp_off">Compensatory Off</Option>
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
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={addCompModal}
        footer={null}
        onCancel={() => setAddCompModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Comp-off Leave</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmitComp}
              className={styles.form}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please select Email ID" }]}
                className={styles.item}
              >
                <Select
                  placeholder="Select"
                  showSearch
                  optionFilterProp="children"
                >
                  {employeeIdMail?.map((item) => (
                    <Option key={item?.employee_id} value={item?.email}>
                      {item?.email}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="No Of Days"
                name="no_of_days"
                rules={[{ required: true, message: "Please enter no of days" }]}
                className={styles.item}
              >
                <Input />
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
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={addEventModal}
        footer={null}
        onCancel={() => setAddEventModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Event Day Attendance</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmitEvent}
              className={styles.form}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please select Email ID" }]}
                className={styles.item}
              >
                <Select
                  placeholder="Select"
                  showSearch
                  optionFilterProp="children"
                >
                  {employeeIdMail?.map((item) => (
                    <Option key={item?.employee_id} value={item?.email}>
                      {item?.email}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select From" }]}
                className={styles.item}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
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
        visible={statusModal}
        footer={null}
        onCancel={() => setStatusModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
        okText="Yes"
        cancelText="No"
      >
        <div>
          <p className={styles.status_heading}>Leave {pendingStatus}</p>
          <p className={styles.status_text}>
            Are you want to set {pendingStatus} status for this leave?
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
