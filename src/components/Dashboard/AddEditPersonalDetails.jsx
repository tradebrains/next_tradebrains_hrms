import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { use, useEffect } from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";

function AddPersonalDetails({
  setAddPersonalModal,
  addPersonalModal,
  setEditPersonalModal,
  editPersonalModal,
  employeeEmailIds,
}) {
  const [form] = Form.useForm();

  useEffect(() => {}, []);

  const onSubmit = (values) => {};
  return (
    <div>
      <Modal
        centered
        closable={true}
        width="800px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={addPersonalModal}
        footer={null}
        onCancel={() => setAddPersonalModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>
            {editPersonalModal
              ? "Edit Personal Details"
              : "Add Personal Details"}
          </p>
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
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please select email" }]}
                  className={styles.item}
                >
                  <Select placeholder="Select" disabled={!!editPersonalModal}>
                    {employeeEmailIds?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.email}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Date of Birth"
                  name="doj"
                  rules={[{ required: true, message: "Please select dob" }]}
                  className={styles.item}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Employment Type"
                  name="email"
                  rules={[
                    {
                      required: false,
                      message: "Please enter Employment Type",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Department"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter Department" },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Contact Number"
                  name="contact"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Contact Number",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Nationality"
                  name="nationality"
                  rules={[
                    { required: true, message: "Please enter Nationality" },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Marital Status"
                  name="contact"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Contact Number",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Blood Group"
                  name="blood_group"
                  rules={[
                    { required: false, message: "Please enter Nationality" },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Number of Children"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Name of Father"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Name of Mother"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Physical Challenged"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="PAN Card"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Aadhar Card"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Passport No"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bank Name"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Bank Account Number"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bank IFSC Code"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Current Address</p>
              <div className={styles.row}>
                <Form.Item
                  label="Door No."
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Street"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item label="City" name="contact" className={styles.item}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Country"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Permanent Address</p>
              <div className={styles.row}>
                <Form.Item
                  label="Door No."
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Street"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item label="City" name="contact" className={styles.item}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Country"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Education</p>
              <div className={styles.row}>
                <Form.Item
                  label="10th School Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="10th Passout Year"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="12th School Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="12th Passout Year"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="UG College Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="UG Course Name"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="UG Passout Year"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="PG College Name"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="PG Course Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="PG Passout Year"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Emergency Contact Details</p>
              <p className={styles.side_heading}>Primary</p>
              <div className={styles.row}>
                <Form.Item
                  label="Contact Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Contact Number"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.side_heading}>Secondary</p>
              <div className={styles.row}>
                <Form.Item
                  label="Contact Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Contact Number"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Family Informations</p>
              <div className={styles.row}>
                <Form.Item label="Name" name="contact" className={styles.item}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Date of Birth"
                  name="contact"
                  className={styles.item}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Phone No"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Work Experience</p>
              <div className={styles.row}>
                <Form.Item
                  label="Company Name"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Designation"
                  name="blood_group"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Time Period"
                  name="contact"
                  className={styles.item}
                >
                  <Input />
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

export default AddPersonalDetails;
