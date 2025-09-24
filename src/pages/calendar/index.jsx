// pages/index.js
import { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import CalendarCard from "@/components/Calendar/Calendar";
import { getAttendance } from "../api/fetchClient";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
  const firstDay = days[0].getDay(); // 0 for Sunday, 1 for Monday...
  const emptyDays = Array(firstDay).fill(null);
  return [...emptyDays, ...days];
};

const createDayDataMap = (apiData) => {
  const map = new Map();
  apiData.forEach((item) => {
    const [day, month, year] = item.date.split("/");
    const dateKey = `${parseInt(day, 10)}`;
    map.set(dateKey, item);
  });
  return map;
};

const CalendarPage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttendance();
        console.log(data, "datadatadata");

        setAttendanceData(data?.data?.attendance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysOfMonth = getDaysInMonth(year, month);
  const calendarDays = addEmptyDays(daysOfMonth);
  const dayDataMap = createDayDataMap(attendanceData);

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default CalendarPage;
