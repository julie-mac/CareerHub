import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Profile = () => {
    const history = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch user data
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            
            const fetchURL = `http://192.168.1.55:3000/api/users/profile/${userId}`;
            fetch(fetchURL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log('Response Status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Data Received:', data);
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                history('/'); // Redirect to login if token is invalid
            });
        }
    },[]);

    const handleUpdateProfile = event => {
        event.preventDefault();
        const updatedUser = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const fetchURL = `http://192.168.1.55:3000/api/users/profile/${userId}`;
        fetch(fetchURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => {
            console.log('Response Status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Data Received:', data);
            setUser(data);
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    };

    const toggleEditing = event => {
        setIsEditing(!isEditing);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleUpdateProfile}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        defaultValue={user.firstName}
                    />
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        defaultValue={user.lastName}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={user.email}
                    />
                    <button type="submit">Update Profile</button>
                </form>
            ) : (
                <div>
                    <h1>Welcome 👋 </h1>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={toggleEditing}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

};

export default Profile;
