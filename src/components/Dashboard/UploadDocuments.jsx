import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { use, useEffect } from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";
function UploadDocuments({ uploadDocumentModal, setUploadDocumentModal }) {
  const [form] = Form.useForm();

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
            >
              <div className={styles.row}>
                <Form.Item
                  label="User ID"
                  name="email"
                  rules={[{ required: true, message: "Please enter email Id" }]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Employee"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Employment Type",
                    },
                  ]}
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Photo"
                  name="Offer Letter"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Photo"
                  name="Relieving Letter"
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
                  name=""
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
                  name="Relieving Letter"
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
                  name=""
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="Relieving Letter"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item label="Voter ID" name="">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>Bank Details</p>

              <div className={styles.row}>
                <Form.Item
                  label="SSLC Mark Sheet"
                  name=""
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="Plus Two Mark Sheet"
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
                  name=""
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="PG Certificate"
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
                  name=""
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="Other Certificates 2"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item label="Other Certificates 2" name="">
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
