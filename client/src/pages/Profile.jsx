import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Profile = () => {
    const history = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

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
                setUpdatedUserData(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                history('/'); // Redirect to login if token is invalid
            });
        }
    },[]);

    const handleUpdateProfile = event => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const fetchURL = `http://localhost:3000/api/users/${userId}`;
        fetch(fetchURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUserData),
        })
        .then(response => {
            console.log('Response Status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Data Received:', data);
            setUser(data);
            setIsEditing(false); // Turn off editing mode after saving
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    };
    const handleDeleteConfirmation = () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        
        const fetchURL = `http://localhost:3000/api/users/${userId}`;
      
        fetch(fetchURL, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.status === 200) {
            setUser(null);
            setIsEditing(false);
            setShowConfirmation(false);
            console.log('Profile deleted successfully');
            localStorage.removeItem('token');
            // Redirect to the main page or login page
            history('/'); // or history.push('/login') if you have a separate login page
          } else {
            console.error('Error deleting profile:', response.status);
          }
        })
        .catch(error => {
          console.error('Error deleting profile:', error);
        });
      };
      

    const toggleEditing = event => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdatedUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user.firstName && <h2>Welcome, {user.firstName}!</h2>}

            {isEditing ? (
            <div style={{maxWidth:"750px", marginLeft:"auto",marginRight:"auto"}}>
                <form onSubmit={handleUpdateProfile}>
                    <div style={{display:"inline-block", marginBottom:"1px"}}>
                        <label>First Name: </label>
                        <input className="winputThreads3"
                            type="text"
                            name="firstName"
                            value={updatedUserData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{display:"inline-block"}}>
                        <label>Last Name: </label>
                        <input className="winputThreads4" 
                            type="text"
                            name="lastName"
                            value={updatedUserData.lastName}
                            onChange={handleInputChange}
                        />
                    </div >
                    <div  className='email' >
                        <label>Email: </label>
                        <input className="winputThreads5"
                            type="email"
                            name="email"
                            value={updatedUserData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='email2'>
                        <label>Phone Number: </label>
                        <input className="winputThreads6"
                            type="tel"
                            name="phoneNumber"
                            value={updatedUserData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style= {{display:"inline-block", paddingLeft:"5px"}}>
                        <label>Password: </label>
                        <input className="winputThreads7"
                            type="password"
                            name="password"
                            value={updatedUserData.password}
                            onChange={handleInputChange}
                        />
                    </div>
               
                    <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setShowConfirmation(true)}>Delete Profile</button>
                    </div>
                </form>
                {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Are you sure you want to delete your profile?</p>
                    <button onClick={handleDeleteConfirmation}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                </div>
                )}
            </div>

            ) : (
                <div>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                    <button onClick={toggleEditing}>Edit Profile</button>
                </div>
            )}
        </div>

    );
};

export default Profile;

