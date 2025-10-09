import React, { useEffect, useState } from "react";
import { getManagerList, getProfileDetails } from "../api/fetchClient";
import styles from "./profile.module.css";
import Image from "next/image";
import unknown from "../../assets/images/unknown.webp";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [managerList, setManagerList] = useState([]);

  const fetchProfileData = async () => {
    try {
      const response = await getProfileDetails();
      setProfileData(response?.data);
    } catch (error) {}
  };

  useState(() => {
    fetchProfileData();
  }, []);

  const getManagerListData = async () => {
    try {
      const resp = await getManagerList();
      setManagerList(resp?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getManagerListData();
  }, []);

  const managerName = managerList.find(
    (manager) => manager.id === profileData?.manager_id
  )?.manager_name;

  const startDate = dayjs(profileData?.date_of_join);
  const now = dayjs();

  const years = now.diff(startDate, "year");
  const months = now.diff(startDate.add(years, "year"), "month");

  const userData = [
    {
      heading: "Name",
      value: profileData?.full_name,
    },
    {
      heading: "Designation",
      value: profileData?.designation,
    },
    {
      heading: "Employee ID",
      value: profileData?.employee_id,
    },
    {
      heading: "Date of Joining",
      value: profileData?.date_of_join,
    },
    {
      heading: "Phone",
      value: null,
    },
    {
      heading: "Email",
      value: profileData?.email,
    },
    {
      heading: "Birthday",
      value: null,
    },
    {
      heading: "Address",
      value: null,
    },
    {
      heading: "Gender",
      value:
        profileData?.gender.charAt(0).toUpperCase() +
        profileData?.gender.slice(1),
    },
    {
      heading: "Reports to",
      value: managerName,
    },
  ];

  return (
    <div>
      <div className={styles.top_section}>
        <div className={styles.left_section}>
          <div className={styles.image_cont}>
            <Image
              src={
                profileData?.profile_pic === null
                  ? unknown
                  : profileData?.profile_pic
              }
              width={270}
              height={307}
              className={styles.profile_pic}
            />
          </div>
          <p className={styles.user_name}>{profileData?.full_name}</p>
          <p className={styles.user_role}>{profileData?.designation}</p>
          <div className={styles.duration_cont}>
            <p className={styles.time_text}>
              At Work for : {years} years {months} months
            </p>
          </div>
        </div>
        <div className={styles.right_section}>
          <div className={styles.heading_text}>Profile</div>
          {userData?.map((items) => {
            return (
              <div className={styles.flex_desc}>
                <p className={styles.heading}>{items?.heading}</p>
                <p className={styles.value}>
                  {items?.value === null ? "----" : items?.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
