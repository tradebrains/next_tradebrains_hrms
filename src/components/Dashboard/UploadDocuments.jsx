import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { use, useEffect } from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";
import { postEmployeeDocuments } from "@/pages/api/fetchClient";
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

  useEffect(() => {}, []);

  const onSubmit = async (values) => {
    const formdata = new FormData();

    formdata.append("employee_id", values.employee_id);
    formdata.append("offer_letter", values.offer_letter?.file || "");
    formdata.append("relieving_letter", values.relieving_letter?.file || "");
    formdata.append("pan_card", values.pan_card?.file || "");
    formdata.append("aadhar_card", values.aadhar_card?.file || "");
    formdata.append("driving_licence", values.driving_licence?.file || "");
    formdata.append("passport", values.passport?.file || "");
    formdata.append("voter_id", values.voter_id?.file || "");
    formdata.append("sslc_mark_sheet", values.sslc_mark_sheet?.file || "");
    formdata.append(
      "plus_two_mark_sheet",
      values.plus_two_mark_sheet?.file || ""
    );
    formdata.append("ug_certificate", values.ug_certificate?.file || "");
    formdata.append("pg_certificate", values.pg_certificate?.file || "");
    formdata.append(
      "other_certificate_1",
      values.other_certificate_1?.file || ""
    );
    formdata.append(
      "other_certificate_2",
      values.other_certificate_2?.file || ""
    );
    formdata.append(
      "passbook_first_page",
      values.passbook_first_page?.file || ""
    );
    formdata.append("cancelled_check", values.cancelled_check?.file || "");

    try {
      const resp = await postEmployeeDocuments(deleteID, formdata);
      if (resp.status === 201) {
        form.resetFields();
        setUploadDocumentModal(false);
      }
    } catch (error) {}
  };
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
                  label="Passbook First Page"
                  name="passbook_first_page"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Cancelled Check"
                  name="cancelled_check"
                  className={styles.upload}
                >
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className={styles.heading_text}>Education Details</p>
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
              {/* <div className={styles.upload}>
                <Form.Item label="Other Certificates 3" name="cancelled_check">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </div> */}
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
