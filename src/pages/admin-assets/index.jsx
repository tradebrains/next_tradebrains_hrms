import React, { useEffect, useState } from "react";
import styles from "./assets.module.css";
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
  deleteAsset,
  editAsset,
  getAdminAsset,
  postAsset,
  updateAssetStatus,
} from "../api/fetchClient";
import CustomPagination from "@/components/Tables/CustomPagination";
import dayjs from "dayjs";

function AdminAssets({ employeeIdMail }) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [tableData, setTableData] = useState([]);
  const [editAssetData, setEditAssetData] = useState({});
  const [assetsModal, setAssetsModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [id, setId] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [pendingStatus, setPendingStatus] = useState(null);
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const [dateModal, setDateModal] = useState(false);
  const [pendingId, setPendingId] = useState("");

  const handleSelectChange = (value) => {
    setSelectedEmployeeId(value);
  };

  const getAsset = async () => {
    try {
      const resp = await getAdminAsset(Page);
      if (resp?.status === 200) {
        setTableData(resp?.data?.results);
        setTotalCount(resp?.data?.count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAsset();
  }, [assetsModal, Page, deleteModal, dateModal]);

  const handleStatusUpdater = (id, value) => {
    setPendingId(id);
    setPendingStatus(value);
    setDateModal(true);
  };

  useEffect(() => {
    if (assetsModal && id && tableData.length > 0) {
      const data = tableData.find((item) => item.id === id);
      if (data) {
        form.setFieldsValue({
          ...data,
          received_date: data?.received_date ? dayjs(data.received_date) : null,
        });
      }
    } else if (assetsModal && !id) {
      form.resetFields();
    }
  }, [id, assetsModal, tableData]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      received_date: values.received_date
        ? values.received_date.format("YYYY-MM-DD")
        : null,
    };
    if (id) {
      try {
        const resp = await editAsset(id, payload);
        if (resp.status === 200) {
          message.success("Assets Edited Successfully");
          setAssetsModal(false);
          form.resetFields();
        }
      } catch (error) {}
    } else {
      try {
        const resp = await postAsset(payload);
        if (resp.status === 201) {
          message.success("Assets applied Successfully");
          setAssetsModal(false);
          form.resetFields();
        }
      } catch (error) {}
    }
  };

  const onSubmitDate = async (values) => {
    const payload = {
      return_date: values.return_date
        ? values.return_date.format("YYYY-MM-DD")
        : null,
      status: "Returned",
    };
    try {
      const resp = await updateAssetStatus(pendingId, payload);
      if (resp.status === 200) {
        message.success("Status Updated Successfully");
        setDateModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const submitDelete = async () => {
    const resp = await deleteAsset(deleteID);
    if (resp.status === 204) {
      message.success("Asset Deleted");
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
      render: (text, record, i) => {
        console.log(record, "recordrecord");

        const currentStatus = selectedStatuses[record.id] || record.status;

        const statusOptions = {
          Assigned: (
            <>
              <span className="fa fa-dot-circle-o text-success"></span> Assigned
            </>
          ),
          Returned: (
            <>
              <span className="fa fa-dot-circle-o text-info"></span> Returned
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
                placeholder={text}
                className={styles.select}
                labelInValue={false}
                value={currentStatus}
                onChange={(value) => handleStatusUpdater(record.id, value)}
              >
                <Option value="Returned" label="Returned">
                  {statusOptions.Returned}
                </Option>
                <Option value="Assigned" label="Assigned">
                  {statusOptions.Assigned}
                </Option>
              </Select>
            </div>
          ),
        };
      },
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
                          setAssetsModal(true);
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
      {" "}
      <div className={styles.top_section}>
        <p className={styles.header_text}>Assets</p>
        <div
          className={styles.add_employee}
          onClick={() => setAssetsModal(true)}
        >
          + Add Assets
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
        visible={assetsModal}
        footer={null}
        onCancel={() => setAssetsModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Asset</p>
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
                label="Asset Type"
                name="type"
                rules={[
                  { required: true, message: "Please select Asset Type" },
                ]}
                className={styles.item}
              >
                <Select placeholder="Select">
                  <Option value="Hardware">Hardware</Option>
                  <Option value="Software">Software</Option>
                </Select>
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
                label="Model No."
                name="model_number"
                rules={[{ required: false }]}
                className={styles.item}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Date of Assigning"
                name="received_date"
                rules={[
                  {
                    required: true,
                    message: "Please select Date of Assigning",
                  },
                ]}
                className={styles.item}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: false }]}
                className={styles.item}
              >
                <Input.TextArea rows={3} />
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
          <p className={styles.status_heading}>Delete Asset</p>
          <p className={styles.status_text}>Are you sure want to delete?</p>
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
        centered
        closable={true}
        width="500px"
        bodyStyle={{ padding: "0px", minHeight: "150px", borderRadius: "18px" }}
        visible={dateModal}
        footer={null}
        onCancel={() => setDateModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
        okText="Delete"
        cancelText="Cancel"
      >
        <div>
          <p className={styles.status_heading}>Add Return Date</p>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmitDate}
            className={styles.form}
          >
            <Form.Item
              label="Date of Return"
              name="return_date"
              rules={[
                {
                  required: true,
                  message: "Please select Date of Return",
                },
              ]}
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
      </Modal>
    </div>
  );
}

export default AdminAssets;

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
