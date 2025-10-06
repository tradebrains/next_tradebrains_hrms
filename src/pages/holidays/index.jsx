import React, { useEffect, useState } from "react";
import styles from "./holidays.module.css";
import CustomTable from "@/components/Tables/CustomTable";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Spin,
} from "antd";
import { Pencil } from "lucide-react";
import {
  deleteHolidays,
  editHolidays,
  getHolidaysList,
  postHolidays,
} from "../api/fetchClient";
import dayjs from "dayjs";

function Holidays() {
  const [form] = Form.useForm();
  const [modal, setModel] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [deleteID, setDeleteId] = useState("");

  const today = new Date();
  const currentYear = today.getFullYear();

  const getHoliday = async () => {
    try {
      const resp = await getHolidaysList();
      if (resp?.status === 200) {
        setTableData(resp?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getHoliday();
  }, [modal, deleteModal]);

  useEffect(() => {
    if (modal && id && tableData.length > 0) {
      const data = tableData.find((item) => item.id === id);
      if (data) {
        form.setFieldsValue({
          ...data,
          date: data?.date ? dayjs(data.date) : null,
        });
      }
    } else if (modal && !id) {
      form.resetFields();
    }
  }, [id, modal, tableData]);

  const filterTableData = tableData.filter((item) => item.name !== "Weekend");

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };
    if (id) {
      try {
        const resp = await editHolidays(id, payload);
        if (resp.status === 200) {
          message.success("Holiday Edited Successfully");
          setModel(false);
          form.resetFields();
        }
      } catch (error) {}
    } else {
      try {
        const resp = await postHolidays(payload);
        if (resp.status === 201) {
          message.success("Holiday applied Successfully");
          setModel(false);
          form.resetFields();
        }
      } catch (error) {}
    }
  };

  const submitDelete = async () => {
    const resp = await deleteHolidays(deleteID);
    if (resp.status === 204) {
      message.success("Leave Deleted");
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
  ) => ({
    props: { style: baseCellStyle },
    children: (
      <span
        onClick={onClick}
        className={`ff-lato ${extraClasses} ${
          onClick ? "pointer link-hover-underline" : ""
        }`}
        style={{ ...baseTextStyle, ...customStyle }}
      >
        {text}
      </span>
    ),
  });

  const columns = [
    {
      title: <span>No.</span>,
      dataIndex: "index",
      fixed: "left",
      width: "40px",
      render: (_, __, index) => renderCell(index + 1),
    },
    {
      title: <p>Title</p>,
      dataIndex: "name",
      width: "200px",
      render: (text, record) => renderCell(text),
    },
    {
      title: <span>Holiday Date</span>,
      dataIndex: "date",
      fixed: "left",
      width: "200px",
      onCell: (record) => {
        const today = new Date();
        const holidayDate = new Date(record.date);
        return holidayDate < today ? { className: "grey-column" } : {};
      },
      render: (text) =>
        renderCell(
          new Date(text).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        ),
    },
    {
      title: <p>Day</p>,
      dataIndex: "day",
      width: "100px",
      render: (text, record) => renderCell(text),
    },
    {
      title: <p>Action</p>,
      dataIndex: "",
      width: "50px",
      render(text, record) {
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
                //  key={key}
                color={"#2f2f2f"}
                className={`nameis fs-s-20 `}
                openClassName=""
                overlayClassName="Nopadding-pover"
                placement="Right"
                style={{ width: "10px", height: "30px" }}
                content={
                  <div className="">
                    <div
                      onClick={() => {
                        setModel(true);
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
        <p className={styles.header_text}>Holidays {currentYear}</p>
        <div
          className={styles.add_employee}
          onClick={() => {
            setId(null);
            form.resetFields();
            setModel(true);
          }}
        >
          + Add Holidays
        </div>
      </div>
      <div className={`custom-antd-head-dark`}>
        <div>
          <CustomTable
            columns={columns}
            data={filterTableData}
            scroll={{ x: "max-content" }}
            rowClassName={(record) => {
              const today = new Date();
              const holidayDate = new Date(record.date);

              return holidayDate < today ? "row-grey" : "";
            }}
            scrollable={true}
            scrollLimit={700}
            pagination={false}
          />
        </div>
      </div>
      <Modal
        centered
        closable={true}
        width="500px"
        bodyStyle={{ padding: "0px", minHeight: "200px", borderRadius: "18px" }}
        visible={modal}
        footer={null}
        onCancel={() => setModel(false)}
        className="modelClassname"
        wrapClassName={"modelClassname"}
      >
        <div>
          <p className={styles.heading_text}>Add Leave</p>
          <div className="w-100">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              className={styles.form}
            >
              <Form.Item
                label="Holiday Name"
                name="name"
                rules={[
                  { required: true, message: "Please select Leave Type" },
                ]}
                className={styles.item}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Holiday Date"
                name="date"
                rules={[{ required: true, message: "Please select From" }]}
                className={styles.item}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>

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

export default Holidays;
