import React, { useState } from "react";
import styles from "./holidays.module.css";
import CustomTable from "@/components/Tables/CustomTable";
import { Popover, Spin } from "antd";
import { Pencil } from "lucide-react";

const holidays = [
  {
    id: 224,
    title: "Weekend",
    date: "2024-11-17",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 225,
    title: "Weekend",
    date: "2024-11-23",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 226,
    title: "Weekend",
    date: "2024-11-24",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 227,
    title: "Weekend",
    date: "2024-11-30",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 228,
    title: "Weekend",
    date: "2024-12-01",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 229,
    title: "Weekend",
    date: "2024-12-07",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 230,
    title: "Weekend",
    date: "2024-12-08",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 231,
    title: "Weekend",
    date: "2024-12-14",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 232,
    title: "Weekend",
    date: "2024-12-15",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 233,
    title: "Weekend",
    date: "2024-12-21",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 234,
    title: "Weekend",
    date: "2024-12-22",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 235,
    title: "Weekend",
    date: "2024-12-28",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 236,
    title: "Weekend",
    date: "2024-12-29",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 253,
    title: "Weekend",
    date: "2025-01-04",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 254,
    title: "Weekend",
    date: "2025-01-05",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 255,
    title: "Weekend",
    date: "2025-01-11",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 256,
    title: "Weekend",
    date: "2025-01-12",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 257,
    title: "Weekend",
    date: "2025-01-18",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 258,
    title: "Weekend",
    date: "2025-01-19",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 259,
    title: "Weekend",
    date: "2025-01-25",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 260,
    title: "Weekend",
    date: "2025-01-26",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 261,
    title: "Weekend",
    date: "2025-02-01",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 262,
    title: "Weekend",
    date: "2025-02-02",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 263,
    title: "Weekend",
    date: "2025-02-08",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 264,
    title: "Weekend",
    date: "2025-02-09",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 265,
    title: "Weekend",
    date: "2025-02-15",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 266,
    title: "Weekend",
    date: "2025-02-16",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 267,
    title: "Weekend",
    date: "2025-02-22",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 268,
    title: "Weekend",
    date: "2025-02-23",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 269,
    title: "Weekend",
    date: "2025-03-01",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 270,
    title: "Weekend",
    date: "2025-03-02",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 271,
    title: "Weekend",
    date: "2025-03-08",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 272,
    title: "Weekend",
    date: "2025-03-09",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 273,
    title: "Weekend",
    date: "2025-03-15",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 274,
    title: "Weekend",
    date: "2025-03-16",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 275,
    title: "Weekend",
    date: "2025-03-22",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 276,
    title: "Weekend",
    date: "2025-03-23",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 277,
    title: "Weekend",
    date: "2025-03-29",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 278,
    title: "Weekend",
    date: "2025-03-30",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 279,
    title: "Weekend",
    date: "2025-04-05",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 280,
    title: "Weekend",
    date: "2025-04-06",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 281,
    title: "Weekend",
    date: "2025-04-12",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 282,
    title: "Weekend",
    date: "2025-04-13",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 283,
    title: "Weekend",
    date: "2025-04-19",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 284,
    title: "Weekend",
    date: "2025-04-20",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 285,
    title: "Weekend",
    date: "2025-04-26",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 286,
    title: "Weekend",
    date: "2025-04-27",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 287,
    title: "Weekend",
    date: "2025-05-03",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 288,
    title: "Weekend",
    date: "2025-05-04",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 289,
    title: "Weekend",
    date: "2025-05-10",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 290,
    title: "Weekend",
    date: "2025-05-11",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 291,
    title: "Weekend",
    date: "2025-05-17",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 292,
    title: "Weekend",
    date: "2025-05-18",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 293,
    title: "Weekend",
    date: "2025-05-24",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 294,
    title: "Weekend",
    date: "2025-05-25",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 295,
    title: "Weekend",
    date: "2025-05-31",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 296,
    title: "Weekend",
    date: "2025-06-01",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 297,
    title: "Weekend",
    date: "2025-06-07",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 298,
    title: "Weekend",
    date: "2025-06-08",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 299,
    title: "Weekend",
    date: "2025-06-14",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 300,
    title: "Weekend",
    date: "2025-06-15",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 301,
    title: "Weekend",
    date: "2025-06-21",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 302,
    title: "Weekend",
    date: "2025-06-22",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 303,
    title: "Weekend",
    date: "2025-06-28",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 304,
    title: "Weekend",
    date: "2025-06-29",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 305,
    title: "Weekend",
    date: "2025-07-05",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 306,
    title: "Weekend",
    date: "2025-07-06",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 307,
    title: "Weekend",
    date: "2025-07-12",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 308,
    title: "Weekend",
    date: "2025-07-13",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 309,
    title: "Weekend",
    date: "2025-07-19",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 310,
    title: "Weekend",
    date: "2025-07-20",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 311,
    title: "Weekend",
    date: "2025-07-26",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 312,
    title: "Weekend",
    date: "2025-07-27",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 313,
    title: "Weekend",
    date: "2025-08-02",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 314,
    title: "Weekend",
    date: "2025-08-03",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 315,
    title: "Weekend",
    date: "2025-08-09",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 316,
    title: "Weekend",
    date: "2025-08-10",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 317,
    title: "Weekend",
    date: "2025-08-16",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 318,
    title: "Weekend",
    date: "2025-08-17",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 319,
    title: "Weekend",
    date: "2025-08-23",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 320,
    title: "Weekend",
    date: "2025-08-24",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 321,
    title: "Weekend",
    date: "2025-08-30",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 322,
    title: "Weekend",
    date: "2025-08-31",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 323,
    title: "Weekend",
    date: "2025-09-06",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 324,
    title: "Weekend",
    date: "2025-09-07",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 325,
    title: "Weekend",
    date: "2025-09-13",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 326,
    title: "Weekend",
    date: "2025-09-14",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 327,
    title: "Weekend",
    date: "2025-09-20",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 328,
    title: "Weekend",
    date: "2025-09-21",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 329,
    title: "Weekend",
    date: "2025-09-27",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 330,
    title: "Weekend",
    date: "2025-09-28",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 331,
    title: "Weekend",
    date: "2025-10-04",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 332,
    title: "Weekend",
    date: "2025-10-05",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 333,
    title: "Weekend",
    date: "2025-10-11",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 334,
    title: "Weekend",
    date: "2025-10-12",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 335,
    title: "Weekend",
    date: "2025-10-18",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 336,
    title: "Weekend",
    date: "2025-10-19",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 337,
    title: "Weekend",
    date: "2025-10-25",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 338,
    title: "Weekend",
    date: "2025-10-26",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 339,
    title: "Weekend",
    date: "2025-11-01",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 340,
    title: "Weekend",
    date: "2025-11-02",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 341,
    title: "Weekend",
    date: "2025-11-08",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 342,
    title: "Weekend",
    date: "2025-11-09",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 343,
    title: "Weekend",
    date: "2025-11-15",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 344,
    title: "Weekend",
    date: "2025-11-16",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 345,
    title: "Weekend",
    date: "2025-11-22",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 346,
    title: "Weekend",
    date: "2025-11-23",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 347,
    title: "Weekend",
    date: "2025-11-29",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 348,
    title: "Weekend",
    date: "2025-11-30",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 349,
    title: "Weekend",
    date: "2025-12-06",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 350,
    title: "Weekend",
    date: "2025-12-07",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 351,
    title: "Weekend",
    date: "2025-12-13",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 352,
    title: "Weekend",
    date: "2025-12-14",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 353,
    title: "Weekend",
    date: "2025-12-20",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 354,
    title: "Weekend",
    date: "2025-12-21",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 355,
    title: "Weekend",
    date: "2025-12-27",
    day_of_week: "Saturday",
    holidaytype: "Weekend",
  },
  {
    id: 356,
    title: "Weekend",
    date: "2025-12-28",
    day_of_week: "Sunday",
    holidaytype: "Weekend",
  },
  {
    id: 357,
    title: "Republic Day",
    date: "2025-01-26",
    day_of_week: "Sunday",
    holidaytype: "official",
  },
  {
    id: 358,
    title: "Maha Shivaratri",
    date: "2025-02-26",
    day_of_week: "Wednesday",
    holidaytype: "official",
  },
  {
    id: 359,
    title: "Holi",
    date: "2025-03-14",
    day_of_week: "Friday",
    holidaytype: "official",
  },
  {
    id: 360,
    title: "Shri Ram Navami",
    date: "2025-04-06",
    day_of_week: "Sunday",
    holidaytype: "official",
  },
  {
    id: 361,
    title: "Dr. Baba Saheb Ambedkar Jayanti",
    date: "2025-04-14",
    day_of_week: "Monday",
    holidaytype: "official",
  },
  {
    id: 362,
    title: "Good Friday",
    date: "2025-04-18",
    day_of_week: "Friday",
    holidaytype: "official",
  },
  {
    id: 363,
    title: "Bakri Id",
    date: "2025-06-07",
    day_of_week: "Saturday",
    holidaytype: "official",
  },
  {
    id: 364,
    title: "Muharram",
    date: "2025-07-06",
    day_of_week: "Sunday",
    holidaytype: "official",
  },
  {
    id: 365,
    title: "Independence Day",
    date: "2025-08-15",
    day_of_week: "Friday",
    holidaytype: "official",
  },
  {
    id: 366,
    title: "Ganesh Chaturthi",
    date: "2025-08-27",
    day_of_week: "Wednesday",
    holidaytype: "official",
  },
  {
    id: 367,
    title: "Dusherra",
    date: "2025-10-02",
    day_of_week: "Thursday",
    holidaytype: "official",
  },
  {
    id: 368,
    title: "Karnataka Rajyotsava",
    date: "2025-11-01",
    day_of_week: "Saturday",
    holidaytype: "official",
  },
  {
    id: 369,
    title: "Diwali-Laxmi Pujan",
    date: "2025-10-22",
    day_of_week: "Wednesday",
    holidaytype: "official",
  },
  {
    id: 370,
    title: "Christmas",
    date: "2025-12-25",
    day_of_week: "Thursday",
    holidaytype: "official",
  },
  {
    id: 371,
    title: "Eid-al-Fitr",
    date: "2025-03-31",
    day_of_week: "Monday",
    holidaytype: "official",
  },
];

const TableData = holidays.filter((item) => item.holidaytype === "official");

function Holidays() {
  const [modal, setModel] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);

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
      dataIndex: "title",
      width: "200px",
      render: (text, record) => renderCell(text),
    },
    {
      title: <span>Holiday Date</span>,
      dataIndex: "date",
      fixed: "left",
      width: "40px",
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
      dataIndex: "day_of_week",
      width: "200px",
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
                        fetchAnnouncementById(record.id);
                      }}
                      className={`text-white`}
                    >
                      <p className={styles.edit}>Edit</p>
                    </div>
                    <div
                      onClick={() => {
                        setDeleteModal(true);
                        setId(record.id);
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
      <div className={`custom-antd-head-dark`}>
        <div className={styles.table_wrapper}>
          <div>
            <CustomTable
              columns={columns}
              data={TableData}
              rowClassName={(record) => {
                const today = new Date();
                const holidayDate = new Date(record.date);

                return holidayDate < today ? "row-grey" : "";
              }}
            />
          </div>
        </div>

        {/* <CustomPagination
          total={totalItems}
          current={pagination.current}
          pageSize={pagination.size}
          onChange={(page) =>
            setPagination((prev) => ({ ...prev, current: page }))
          }
          onShowSizeChange={(current, size) =>
            setPagination({ current: 1, size })
          }
        /> */}
      </div>
    </div>
  );
}

export default Holidays;
