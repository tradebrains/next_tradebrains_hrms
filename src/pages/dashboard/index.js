import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getDashboardData,
  getEmployeeIds,
  getManagerList,
  validateUser,
} from "../api/fetchClient";
import EmployeeProfile from "@/components/Dashboard/EmployeeProfile";
import unknown from "../../assets/images/unknown.webp";
import { authStore } from "@/redux/reducer/authSlice";
import { useSelector } from "react-redux";

const { Option } = Select;

function dashboard() {
  const [form] = Form.useForm();
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [employeeEmailIds, setEmployeeEmailIds] = useState([]);
  const [managerList, setManagerList] = useState([]);

  const auth = useSelector(authStore);

  const getEmployeeDetails = async () => {
    try {
      const resp = await getDashboardData();
      setEmployeeDetails(resp?.data);
    } catch (error) {
      console.log("Error fetching employee details:", error);
    }
  };

  const getEmployeeEmailIds = async () => {
    try {
      const resp = await getEmployeeIds();
      setEmployeeEmailIds(resp?.data);
    } catch (error) {
      console.log("Error fetching employee email ids:", error);
    }
  };

  console.log(employeeEmailIds, "employeeEmailIds");

  const getManagerListData = async () => {
    try {
      const resp = await getManagerList();
      setManagerList(resp?.data);
    } catch (error) {
      console.log("Error fetching manager list:", error);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
    getEmployeeEmailIds();
    getManagerListData();
  }, []);

  console.log(employeeDetails, "employeeDetails");

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("full_name", values.full_name);
      formData.append("gender", values.gender);
      formData.append("employee_id", values.employee_id);
      formData.append("date_of_join", values.date_of_join.format("YYYY-MM-DD"));
      formData.append("designation", values.designation);
      formData.append("user_role", values.user_role);
      formData.append("probation_days", values.probation_days);
      formData.append("manager_id", values.manager_id);
      if (values.photo) {
        formData.append("profile_pic", values.photo.file);
      }
      const resp = await validateUser(formData);
      if (resp?.status === 200) {
        message.success("Employee added successfully");
        setAddEmployeeModal(false);
        form.resetFields();
        getEmployeeDetails();
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };
  return (
    <div>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Employee</p>
        <div
          className={styles.add_employee}
          onClick={() => setAddEmployeeModal(true)}
        >
          + Add Employee
        </div>
      </div>
      <div className={styles.profile_section}>
        {employeeDetails?.map((profile, index) => (
          <EmployeeProfile
            key={index}
            name={profile?.full_name}
            role={profile?.designation}
            employeeDetails={profile}
            managerList={managerList}
            employeeEmailIds={employeeEmailIds}
            image={
              profile?.profile_pic === null || profile.profile_pic === "nan"
                ? unknown
                : profile?.profile_pic
            }
          />
        ))}
      </div>
      <Modal
        centered
        closable={true}
        width="800px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={addEmployeeModal}
        footer={null}
        onCancel={() => setAddEmployeeModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Employee</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              className={styles.form}
            >
              <div className={styles.row}>
                <Form.Item
                  label="User ID"
                  name="id"
                  rules={[
                    { required: true, message: "Please select a User ID" },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select">
                    {employeeEmailIds?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.email}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter name" }]}
                  className={styles.item}
                >
                  <Input placeholder="Enter Name" />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Please select gender" }]}
                  className={styles.item}
                >
                  <Select placeholder="Select">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Employee ID"
                  name="employee_id"
                  rules={[
                    { required: true, message: "Please enter Employee ID" },
                  ]}
                  className={styles.item}
                >
                  <Input placeholder="Enter Employee ID" />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  label="Joining Date"
                  name="doj"
                  rules={[
                    { required: true, message: "Please select Joining Date" },
                  ]}
                  className={styles.item}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Designation"
                  name="designation"
                  rules={[
                    { required: true, message: "Please enter Designation" },
                  ]}
                  className={styles.item}
                >
                  <Input placeholder="Enter Designation" />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  label="User Role"
                  name="user_role"
                  rules={[
                    { required: true, message: "Please select User Role" },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select Role">
                    <Option value="1">Admin</Option>
                    <Option value="2">Employee</Option>
                    <Option value="3">Developer</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Probation Period (in days)"
                  name="probation_days"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Probation Period",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input type="number" placeholder="Enter Days" />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  label="Reporting Manager"
                  name="manager_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select Reporting Manager",
                    },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select Manager">
                    {managerList?.map((item) => (
                      <Option key={item?.id} value={item.id}>
                        {item?.manager_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Photo"
                  name="profile_pic"
                  className={styles.item}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </Form.Item>
              </div>

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

export default dashboard;

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
