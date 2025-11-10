import React, { useEffect, useState } from "react";
import styles from "./feedback.module.css";
import { Button, Form, Input, message, Modal, Popover } from "antd";
import CustomTable from "@/components/Tables/CustomTable";
import CustomPagination from "@/components/Tables/CustomPagination";
import { authStore } from "@/redux/reducer/authSlice";
import { useSelector } from "react-redux";
import { deleteFeedback, editFeedback, getFeedback, postFeedback } from "../api/fetchClient";
import { Loader2, Pencil } from "lucide-react";
import dayjs from "dayjs";

function Feedback() {
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const [totalCount, setTotalCount] = useState();
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const auth = useSelector(authStore);
  const [feedback , setFeedback] = useState([])
  const [deleteModal , setDeleteModal] = useState(false);
  const [deleteId , setDeleteId] = useState("")
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


    const getAdmin = async () => {
      try {
        const resp = await getFeedback();
        if (resp?.status === 200) {
          setFeedback(resp?.data);
        }
      } catch (error) {}
    };
  
    useEffect(() => {
      getAdmin();
    }, [feedbackModal , deleteModal]);
  

  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

    const onSubmit = async (values) => {
      setLoading(true);
    const payload = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };
    if (id) {
      try {
        const resp = await editFeedback(id, payload);
        if (resp.status === 200) {
          message.success("Feedback Edited Successfully");
          setFeedbackModal(false)
          setLoading(false);
          form.resetFields();
        }
      } catch (error) {}
    } else {
      try {
        const resp = await postFeedback(payload);
        if (resp.status === 201) {
          message.success("Feedback added Successfully");
          setFeedbackModal(false)
          setLoading(false);
          form.resetFields();
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message);
        setLoading(false);
      }
    }
  };

    useEffect(() => {
      if (feedbackModal && id && feedback.length > 0) {
        const data = feedback.find((item) => item.id === id);
        if (data) {
          form.setFieldsValue({
            ...data,
            date: data?.date ? dayjs(data.date) : null,
          });
        }
      } else if (feedbackModal && !id) {
        form.resetFields();
      }
    }, [id, feedbackModal, feedback]);


      const submitDelete = async () => {
        const resp = await deleteFeedback(deleteId);
        if (resp.status === 204) {
          message.success("Deleted Feedback Successfully");
          setDeleteModal(false);
        }
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
  ) => {
    const truncatedText =
      typeof text === "string" && text.length > 150
        ? text.slice(0, 150) + "..."
        : text;

    return {
      props: { style: baseCellStyle },
      children: (
        <span
          onClick={onClick}
          className={`ff-lato ${extraClasses} ${
            onClick ? "pointer link-hover-underline" : ""
          }`}
          style={{
            ...baseTextStyle,
            ...customStyle,
            display: "inline-block",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            verticalAlign: "middle",
          }}
          title={text}
        >
          {truncatedText}
        </span>
      ),
    };
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      width: "180px",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Feedback",
      dataIndex: "message",
      render: (text, record) => renderCell(text),
    },
    {
      title: "Action",
      dataIndex: "status",
      width: "100px",
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
                        setFeedbackModal(true);
                        setId(record.id);
                      }}
                      className={`text-white`}
                    >
                      <p className={styles.edit}>Edit</p>
                    </div>
                    <div
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteId(record.id);
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
            </div>
          ),
        };
      },
    },
  ];

  return (
    <div>
      <div className={styles.top_section}>
        <p className={styles.header_text}>Your Feedback</p>
        <div
          className={styles.add_employee}
          onClick={() => {
            setId(null);
            form.resetFields();
            setFeedbackModal(true);
          }}
        >
          Create Feedback
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={`custom-antd-head-dark`}>
          <CustomTable columns={columns} data={feedback} pagination={false} />
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
        visible={feedbackModal}
        footer={null}
        onCancel={() => setFeedbackModal(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Feedback</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              className={styles.form}
               initialValues={{
                full_name:auth?.userData?.user_details?.full_name,
                employee_id: auth?.userData?.user_details?.employee_id
              }}
            >
              <Form.Item
                label="Employee Name"
                name="full_name"
                rules={[{ required: true, message: "Please select From" }]}
                className={styles.item}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Employee Id"
                name="employee_id"
                rules={[{ required: true, message: "Please select To" }]}
                className={styles.item}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Do you have any suggestions for resolving the complaint? If so, please explain."
                name="message"
                rules={[{ required: true, message: "Please enter Reason" }]}
                className={styles.item}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              {errorMessage && (
                <span className={styles.error_message}>{errorMessage}</span>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                 className={styles.submit}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.loader_wrapper}>
                      <Loader2 className={styles.loader_icon} />
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
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
          <p className={styles.status_heading}>Delete Leave</p>
          <p className={styles.status_text}>
            Are you sure want to delete this leave?
          </p>
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
    </div>
  );
}

export default Feedback;
