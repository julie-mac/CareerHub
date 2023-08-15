import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Profile = () => {
    const history = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            
            const fetchURL = `http://localhost:3000/api/users/profile/${userId}`;
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

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.firstName}!</h1>
        </div>
    );
};

export default Profile;
