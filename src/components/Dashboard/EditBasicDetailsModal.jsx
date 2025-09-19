import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
function EditBasicDetailsModal({ editBasicModal, setEditBasicModal }) {
  const [form] = Form.useForm();

  const onSubmit = (values) => {};

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
                  label="Name"
                  name="name"
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
                  name="doj"
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
                    <Option value="1">Admin</Option>
                    <Option value="2">Employee</Option>
                    <Option value="3">Developer</Option>
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
                  <Select placeholder="Select Manager">
                    {/* {managerList?.map((item) => (
                      <Option key={item?.id} value={item.id}>
                        {item?.manager_name}
                      </Option>
                    ))} */}
                  </Select>
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  label="Photo"
                  name="profile_pic"
                  className={styles.upload}
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

export default EditBasicDetailsModal;
