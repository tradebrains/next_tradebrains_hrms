import React, { useState } from "react";
import styles from "./page.module.css";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function dashboard() {
  const [form] = Form.useForm();
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);

  const onSubmit = (values) => {};

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
                  name="userId"
                  rules={[
                    { required: true, message: "Please select a User ID" },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select">
                    <Option value="1">User 1</Option>
                    <Option value="2">User 2</Option>
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
                  name="employeeId"
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
                  name="joiningDate"
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
                  name="userRole"
                  rules={[
                    { required: true, message: "Please select User Role" },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select Role">
                    <Option value="admin">Admin</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="employee">Employee</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Probation Period (in days)"
                  name="probation"
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
                  name="manager"
                  rules={[
                    {
                      required: true,
                      message: "Please select Reporting Manager",
                    },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select Manager">
                    <Option value="1">Manager 1</Option>
                    <Option value="2">Manager 2</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Photo" name="photo" className={styles.item}>
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
