// pages/index.js
import { useState, useEffect, useCallback } from "react";
import styles from "./calendar.module.css";
import CalendarCard from "@/components/Calendar/Calendar";
import { getAttendance } from "../api/fetchClient";
import { Select } from "antd";
import DotLoader from "@/components/DotLoader/DotLoader";

const { Option } = Select;

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const EMPLOYEE_CODE = "0001";

const MONTHS = [
  { value: 0, name: "January" },
  { value: 1, name: "February" },
  { value: 2, name: "March" },
  { value: 3, name: "April" },
  { value: 4, name: "May" },
  { value: 5, name: "June" },
  { value: 6, name: "July" },
  { value: 7, name: "August" },
  { value: 8, name: "September" },
  { value: 9, name: "October" },
  { value: 10, name: "November" },
  { value: 11, name: "December" },
];

const generateYears = (currentYear) => {
  const years = [];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push(i);
  }
  return years;
};

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const addEmptyDays = (days) => {
  const firstDay = days[0].getDay();
  const emptyDays = Array(firstDay).fill(null);
  return [...emptyDays, ...days];
};

const createDayDataMap = (apiData) => {
  const map = new Map();
  if (!apiData) return map;

  apiData.forEach((item) => {
    const [day] = item.date.split("/");
    const dateKey = `${parseInt(day, 10)}`;
    map.set(dateKey, item);
  });
  return map;
};

const CalendarPage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiMonth = (currentMonth + 1).toString().padStart(2, "0");
      const apiYear = currentYear.toString();

      const data = await getAttendance(EMPLOYEE_CODE, apiMonth, apiYear);

      setAttendanceData(data?.data?.attendance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const yearsList = generateYears(today.getFullYear());

  if (error) return <div className={styles.error}>Error: {error}</div>;

  const daysOfMonth = getDaysInMonth(currentYear, currentMonth);
  const calendarDays = addEmptyDays(daysOfMonth);
  const dayDataMap = createDayDataMap(attendanceData);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Attendance Calendar</h2>
        <div className={styles.dropdowns}>
          <div></div>
          <div className={styles.date_year_gap}>
            <div>
              <Select
                className={styles.monthSelect}
                value={currentMonth}
                onChange={(value) => setCurrentMonth(parseInt(value))}
                aria-label="Select Month"
              >
                {MONTHS.map((month) => (
                  <Option key={month.value} value={month.value}>
                    {month.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Select
                className={styles.yearSelect}
                value={currentYear}
                onChange={(value) => setCurrentYear(parseInt(value))}
                aria-label="Select Year"
              >
                {yearsList.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Legend and Grid Rendering remain the same */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendCircle} ${styles.presentCircle}`}
          ></span>{" "}
          Present
        </div>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendCircle} ${styles.absentCircle}`}
          ></span>{" "}
          Absent
        </div>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendCircle} ${styles.halfDayCircle}`}
          ></span>{" "}
          Half Day
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendCircle} ${styles.plCircle}`}></span>{" "}
          PL
        </div>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendCircle} ${styles.weekendCircle}`}
          ></span>{" "}
          Weekend
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <DotLoader />
        </div>
      ) : (
        <div className={styles.calendarGrid}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            const date = day ? day.getDate() : null;
            const dayData = day ? dayDataMap.get(date.toString()) : null;
            return <CalendarCard key={index} date={date} dayData={dayData} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
