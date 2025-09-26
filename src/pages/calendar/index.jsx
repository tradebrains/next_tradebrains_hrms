// pages/index.js
import { useState, useEffect, useCallback } from "react";
import styles from "./calendar.module.css";
import CalendarCard from "@/components/Calendar/Calendar";
import { getAttendance } from "../api/fetchClient"; // Ensure this file is updated as shown previously

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const EMPLOYEE_CODE = "0001"; // Employee code remains static for this scope

// Helper data for dropdowns
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

// Generate years: current year and a few before/after for dropdown
const generateYears = (currentYear) => {
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

// Utility functions (getDaysInMonth, addEmptyDays, createDayDataMap) remain unchanged
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
  if (!apiData) return map;

  apiData.forEach((item) => {
    const [day] = item.date.split("/");
    const dateKey = `${parseInt(day, 10)}`;
    map.set(dateKey, item);
  });
  return map;
};

// --- Main Component ---

const CalendarPage = () => {
  const today = new Date();
  // State initialization: current month and current year
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data when month/year changes
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Format parameters for the API call (month is 0-indexed, API needs 1-indexed and padded)
      const apiMonth = (currentMonth + 1).toString().padStart(2, "0");
      const apiYear = currentYear.toString();

      // 2. Pass dynamic parameters to the API client
      const data = await getAttendance(EMPLOYEE_CODE, apiMonth, apiYear);

      setAttendanceData(data?.data?.attendance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentMonth, currentYear]); // Dependency array: refetch on month/year change

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
      {/* Month/Year Dropdown Selector */}
      <div className={styles.header}>
        <div className={styles.dropdowns}>
          <select
            className={styles.monthSelect}
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            aria-label="Select Month"
          >
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>

          <select
            className={styles.yearSelect}
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            aria-label="Select Year"
          >
            {yearsList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <h2 className={styles.title}>Attendance Calendar</h2>
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
        <div className={styles.loading}>Loading Calendar Data...</div>
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
