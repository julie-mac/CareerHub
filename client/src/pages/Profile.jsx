import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../layouts/Navbar";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const apiUrl = `http://localhost:3000/api/users/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  });
  return (
    <div>
        <NavBar />
        <h1>Profile</h1>
        <div>
            <label>First Name: </label>
            <input
                type="text"
                value={userInfo.firstName}
                onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
            />
        </div>
        <div>
            <label>Last Name: </label>
            <input
                type="text"
                value={userInfo.lastName}
                onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
            />
        </div>
        <div>
            <label>Email: </label>
            <input
                type="text"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            />
        </div>
        <div>
            <label>Phone Number: </label>
            <input
                type="text"
                value={userInfo.phoneNumber}
                onChange={(e) => setUserInfo({...userInfo, phoneNumber: e.target.value})}
            />
        </div>
    </div>
    );
}


    

export default Profile;
