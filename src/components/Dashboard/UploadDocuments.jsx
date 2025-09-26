import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { use, useEffect } from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";
function UploadDocuments({
  uploadDocumentModal,
  employeeEmailIds,
  setUploadDocumentModal,
  deleteID,
}) {
  const [form] = Form.useForm();

  const employeeEmail = employeeEmailIds.filter(
    (item) => item?.id === deleteID
  );

  console.log(employeeEmailIds, "employeeEmail");

  useEffect(() => {}, []);

  const onSubmit = (values) => {};
  return (
    <div>
      {" "}
      <Modal
        centered
        closable={true}
        width="800px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={uploadDocumentModal}
        footer={null}
        onCancel={() => setUploadDocumentModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Upload Employee Documents</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              className={styles.form}
              initialValues={{
                email: employeeEmail?.[0]?.email,
                employee_id: employeeEmail?.[0]?.employee_id,
              }}
            >
              <div className={styles.row}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please select email",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="Employee"
                  name="employee_id"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Employment Type",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input disabled />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Offer Letter"
                  name="offer_letter"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Offer Letter"
                  name="relieving_letter"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>ID Proof</p>
              <div className={styles.row}>
                <Form.Item
                  label="PAN Card"
                  name="pan_card"
                  className={styles.upload}
                  rules={[
                    { required: true, message: "Please upload Pan Card" },
                  ]}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Aadhar Card"
                  name="aadhar_card"
                  className={styles.upload}
                  rules={[
                    { required: true, message: "Please upload Aadhar Card" },
                  ]}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Driving licence"
                  name="driving_licence"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="passport"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item label="Voter ID" name="voter_id">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>Bank Details</p>

              <div className={styles.row}>
                <Form.Item
                  label="SSLC Mark Sheet"
                  name="sslc_mark_sheet"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Plus Two Mark Sheet"
                  name="plus_two_mark_sheet"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="UG Certificate"
                  name="ug_certificate"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="PG Certificate"
                  name="pg_certificate"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Other Certificates 1"
                  name="other_certificate_1"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Other Certificates 2"
                  name="other_certificate_2"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item label="Other Certificates 3" name="cancelled_check">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
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

export default UploadDocuments;
