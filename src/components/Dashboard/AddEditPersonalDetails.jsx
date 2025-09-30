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
import React, { use, useEffect, useState } from "react";
import styles from "./employee.module.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  getEmployeeDetails,
  putEmployeeDetails,
} from "@/pages/api/fetchClient";

function AddPersonalDetails({
  setAddPersonalModal,
  addPersonalModal,
  setEditPersonalModal,
  editPersonalModal,
  employeeEmailIds,
  deleteID,
}) {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const payload = {
      gender: values.gender,
      designation: values.designation,
      user_role: values.user_role,
      employee_profile: {
        dob: values.dob,
        contact_no: values.contact_no,
        nationality: values.nationality,
        marital_status: values.marital_status,
        blood_group: values.blood_group,
        no_of_children: values.no_of_children,
        physically_challenged: values.physically_challenged,
        employment_type: values.employment_type,
        department_id: values.department_id,
        name_of_father: values.name_of_father,
        name_of_mother: values.name_of_mother,
        pan_card: values.pan_card,
        passport_no: values.passport_no,
        aadhar_card: values.aadhar_card,
      },
      family_members: [
        {
          name: values.name,
          relationship: values.relationship,
          date_of_birth: values.date_of_birth,
          phone_no: values.phone_no,
        },
      ],
      addresses: [
        {
          type: values.type,
          country: values.country,
          state: values.state,
          city: values.city,
          street: values.street,
          door_no: values.door_no,
        },
        {
          type: values.type,
          country: values.country,
          state: values.state,
          city: values.city,
          street: values.street,
          door_no: values.door_no,
        },
      ],
      education_records: [
        {
          tenth_school: values.tenth_school,
          tenth_passout_year: values.tenth_passout_year,
          twelfth_school: values.twelfth_school,
          twelfth_passout_year: values.twelfth_passout_year,
          ug_college: values.ug_college,
          ug_passout_year: values.ug_passout_year,
          pg_college: values.pg_college,
          pg_course: values.pg_course,
          pg_passout_year: values.pg_passout_year,
        },
      ],
      bank_details: [
        {
          bank_name: values.bank_name,
          account_number: values.account_number,
          ifsc_code: values.ifsc_code,
        },
      ],
      emergency_contacts: [
        {
          name: values.name,
          relationship: values.relationship,
          contact_no: values.contact_no,
          is_primary: true,
        },
      ],
      work_experiences: [
        {
          company_name: values.company_name,
          designation: values.designation,
          time_period: values.time_period,
        },
      ],
    };
    try {
      const resp = await putEmployeeDetails(deleteID, payload);
      if (resp?.status === 201) {
        message.success("Employee Details Added Successfully");
        setAddPersonalModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const employeeEmail = employeeEmailIds.filter(
    (item) => item?.id === deleteID
  );

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
              initialValues={{
                email: employeeEmail?.[0]?.email,
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
                  name="employment_type"
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
                  name="department_id"
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
                  name="contact_no"
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
                  name="marital_status"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Marital Status",
                    },
                  ]}
                  className={styles.item}
                >
                  <Select placeholder="Select">
                    <Option value="yes">Yes</Option>
                    <Option value="false">No</Option>
                  </Select>
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
                  name="no_of_children"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Name of Father"
                  name="name_of_father"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Name of Mother"
                  name="name_of_mother"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Physical Challenged"
                  name="physically_challenged"
                  className={styles.item}
                >
                  <Select placeholder="Select">
                    <Option value="yes">Yes</Option>
                    <Option value="false">No</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="PAN Card"
                  name="pan_card"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Aadhar Card"
                  name="aadhar_card"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Passport No"
                  name="passport_no"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bank Name"
                  name="bank_name"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Bank Account Number"
                  name="account_number"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bank IFSC Code"
                  name="ifsc_code"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Current Address</p>
              <div className={styles.row}>
                <Form.Item
                  label="Door No."
                  name="door_no"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Street" name="street" className={styles.item}>
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item label="City" name="city" className={styles.item}>
                  <Input />
                </Form.Item>
                <Form.Item label="State" name="state" className={styles.item}>
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Country"
                  name="country"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Permanent Address</p>
              <div className={styles.row}>
                <Form.Item
                  label="Door No."
                  name="door_no"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Street" name="street" className={styles.item}>
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item label="City" name="city" className={styles.item}>
                  <Input />
                </Form.Item>
                <Form.Item label="State" name="state" className={styles.item}>
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Country"
                  name="country"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>

              <p className={styles.heading_tag}>Education</p>
              <div className={styles.row}>
                <Form.Item
                  label="10th School Name"
                  name="tenth_school"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="10th Passout Year"
                  name="tenth_passout_year"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="12th School Name"
                  name="twelfth_school"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="12th Passout Year"
                  name="twelfth_passout_year"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="UG College Name"
                  name="ug_college"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="UG Course Name"
                  name="ug_course"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="UG Passout Year"
                  name="ug_passout_year"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="PG College Name"
                  name="pg_college"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="PG Course Name"
                  name="pg_course"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="PG Passout Year"
                  name="pg_passout_year"
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
                  name="name"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="relationship"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Contact Number"
                  name="contact_no"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.side_heading}>Secondary</p>
              <div className={styles.row}>
                <Form.Item
                  label="Contact Name"
                  name="name"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="relationship"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Contact Number"
                  name="contact_no"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Family Informations</p>
              <div className={styles.row}>
                <Form.Item label="Name" name="name" className={styles.item}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="relationship"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Date of Birth"
                  name="date_of_birth"
                  className={styles.item}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Phone No"
                  name="phone_no"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <p className={styles.heading_tag}>Work Experience</p>
              <div className={styles.row}>
                <Form.Item
                  label="Company Name"
                  name="company_name"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Designation"
                  name="designation"
                  className={styles.item}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.upload}>
                <Form.Item
                  label="Time Period"
                  name="time_period"
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
