import { useState } from "react";
import styles from "./Calendar.module.css";
import dayjs from "dayjs";

const getStatusText = (status) => {
  switch (status) {
    case "P":
      return "Present";
    case "WO":
      return "Weekend";
    case "HD":
      return "Half Day";
    case "PL":
      return "PL";
    case "A":
      return "Absent";
    default:
      return "N/A";
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "P":
      return styles.present;
    case "WO":
      return styles.weekend;
    case "HD":
      return styles.halfday;
    case "PL":
      return styles.pl;
    case "A":
      return styles.absent;
    default:
      return styles.default;
  }
};

const CalendarCard = ({ dayData, date }) => {
  const [isHovered, setIsHovered] = useState(false);
  const status = dayData?.status || null;
  const statusText = getStatusText(status);
  const rawDate = dayData?.date;
  const formattedDate = dayjs(rawDate, "DD/MM/YYYY").format(
    "dddd, DD MMM YYYY"
  );
  console.log(dayData, "dayData");

  return (
    <div
      className={`${styles.card} ${getStatusClass(status)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.date}>{date}</div>
      {status && <div className={styles.status}>{statusText}</div>}
      {status === "P" && (
        <div className={styles.workTime}>{dayData.work_time} hrs</div>
      )}

      {isHovered && dayData && (status === "P" || status === "HD") && (
        <div className={styles.popup}>
          <div className={styles.popupDate}>{formattedDate}</div>
          <div className={styles.popupTime}>
            <span className={styles.timing_text}>Check In:</span>{" "}
            <span>{dayData.in_timne} AM</span>
          </div>
          <div className={styles.popupTime}>
            <span className={styles.timing_text}>Check Out:</span>{" "}
            <span>{dayData.out_time} PM</span>
          </div>
          <div className={styles.popupTime}>
            <span className={styles.timing_text}>Total Hours:</span>{" "}
            <span>{dayData.work_time} hr</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarCard;
