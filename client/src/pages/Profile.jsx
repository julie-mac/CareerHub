// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

// const Profile = () => {
//     const history = useNavigate();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Fetch user data
//         const token = localStorage.getItem('token');

//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const userId = decodedToken.userId;
            
//             const fetchURL = `http://localhost:3000/api/users/profile/${userId}`;
//             fetch(fetchURL, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then(response => {
//                 console.log('Response Status:', response.status);
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data Received:', data);
//                 setUser(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching user data:', error);
//                 history('/'); // Redirect to login if token is invalid
//             });
//         }
//     },[]);

//     const handleUpdateProfile = event => {
//         event.preventDefault();
//         const updatedUser = {
//             firstName: event.target.firstName.value,
//             lastName: event.target.lastName.value,
//             email: event.target.email.value,
//             password: event.target.password.value,
//         };
//         const token = localStorage.getItem('token');
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.userId;
//         const fetchURL = `http://localhost:3000/api/users/profile/${userId}`;
//         fetch(fetchURL, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(updatedUser),
//         })
//         .then(response => {
//             console.log('Response Status:', response.status);
//             return response.json();
//         })
//         .then(data => {
//             console.log('Data Received:', data);
//             setUser(data);
//         })
//         .catch(error => {
//             console.error('Error updating user data:', error);
//         });
//     };

//     const toggleEditing = event => {
//         setIsEditing(!isEditing);

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Welcome, {user.firstName}!</h1>
//         </div>
//     );
// };

// // export default Profile;
