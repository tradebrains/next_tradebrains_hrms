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
import React, { useEffect, useState } from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";
import { authStore } from "@/redux/reducer/authSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getManagerList, validateUser } from "@/pages/api/fetchClient";

const { Option } = Select;
function EditBasicDetailsModal({
  editBasicModal,
  setEditBasicModal,
  employeeDetails,
  managerList,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editBasicModal && employeeDetails) {
      form.setFieldsValue({
        ...employeeDetails,
        date_of_join: employeeDetails.date_of_join
          ? dayjs(employeeDetails.date_of_join)
          : null,
      });
    }
  }, [editBasicModal, employeeDetails, form]);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("id", Number(employeeDetails.id));
      formData.append("full_name", values.full_name);
      formData.append("gender", values.gender);
      formData.append("employee_id", values.employee_id);
      formData.append("date_of_join", values.date_of_join.format("YYYY-MM-DD"));
      formData.append("designation", values.designation);
      formData.append("user_role", values.user_role);
      formData.append("probation_days", values.probation_days);
      formData.append("manager_id", values.manager_id);
      formData.append("emp_code", values.emp_code);
      if (values.photo) {
        formData.append("profile_pic", values.photo.file);
      }

      const resp = await validateUser(formData);
      if (resp?.status === 200) {
        message.success("Employee Details Updated successfully");
        setEditBasicModal(false);
        form.resetFields();
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div>
      <Modal
        centered
        closable={true}
        width="800px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={editBasicModal}
        footer={null}
        onCancel={() => setEditBasicModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Edit Employee</p>
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
                  name="full_name"
                  rules={[{ required: true, message: "Please enter name" }]}
                  className={styles.item}
                >
                  <Input placeholder="Enter Name" />
                </Form.Item>
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
              </div>

              <div className={styles.row}>
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
                <Form.Item
                  label="Joining Date"
                  name="date_of_join"
                  rules={[
                    { required: true, message: "Please select Joining Date" },
                  ]}
                  className={styles.item}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                </Form.Item>
              </div>

              <div className={styles.row}>
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
                <Form.Item
                  label="User Role"
                  name="user_role"
                  rules={[
                    { required: true, message: "Please select User Role" },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select Role">
                    <Select.Option value={1}>Admin</Select.Option>
                    <Select.Option value={2}>Employee</Select.Option>
                    <Select.Option value={3}>Developer</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className={styles.row}>
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
                  <Select
                    placeholder="Select Manager"
                    showSearch
                    optionFilterProp="children"
                  >
                    {managerList?.map((item) => (
                      <Select.Option key={item?.id} value={item.id}>
                        {item?.manager_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  label="Photo"
                  name="profile_pic"
                  className={styles.item}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Employee Code (Attendance)"
                  name="emp_code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Employee Code (Attendance)",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input type="number" placeholder="Employee Code" />
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

export default EditBasicDetailsModal;
