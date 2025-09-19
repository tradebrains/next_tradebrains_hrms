import React, { useState } from "react";
import { getProfileDetails } from "../api/fetchClient";

function Profile() {
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await getProfileDetails();
      setProfileData(response?.data);
    } catch (error) {}
  };

  useState(() => {
    fetchProfileData();
  }, []);

  console.log(profileData, "profileData");

  return <div>Profile</div>;
}

export default Profile;
