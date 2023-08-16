import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import jwtDecode from 'jwt-decode';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // New state for thread content
  const [topicName, setTopicName] = useState('');
  const isLoggedIn = localStorage.getItem('token');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const decodedToken = isLoggedIn ? jwtDecode(localStorage.getItem('token')) : null;
  const userId = decodedToken ? decodedToken.userId : '';

  const navigate = useNavigate();
  const { topicId } = useParams();
  
  useEffect(() => {
    const fetchThreadsAndTopic = async () => {
      try {
        const [threadsResponse, topicResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/threads/topic/${topicId}`),
          axios.get(`http://localhost:3000/topics/${topicId}`)
        ]);
    
        const threadsWithUserData = await Promise.all(
          threadsResponse.data.map(async (thread) => {
            console.log(thread);
            const userResponse = await axios.get(`http://localhost:3000/api/users/${thread.userId._id}`);
            const user = userResponse.data;
    
            return {
              ...thread,
              user: {
                firstName: user.firstName,
                lastName: user.lastName
              }
            };
          })
        );
    
        setThreads(threadsWithUserData);
        setTopicName(topicResponse.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    if (decodedToken) {
      setUserFirstName(decodedToken.firstName);
      setUserLastName(decodedToken.lastName);
    }
    fetchThreadsAndTopic();
  }, [topicId]);


  const handleAddThread = (event) => {
    event.preventDefault();

    const newThread = {
      title: title,
      content: content,
      userId: userId,
      topic: topicId
    };
  
    axios.post(`http://localhost:3000/api/threads/create`, newThread)
      .then(response => {
        console.log("Thread successfully added!");
  
        // Fetch user details for the current user
        axios.get(`http://localhost:3000/api/users/${userId}`)
          .then(userResponse => {
            const user = userResponse.data;
  
            // Add the newly created thread with user details to the threads state
            setThreads(prevThreads => [
              ...prevThreads,
              {
                title: title,
                user: {
                  firstName: user.firstName,
                  lastName: user.lastName
                }
              }
            ]);
            setTitle('');
            setContent('');
          })
          .catch(error => {
            console.error("Error fetching user:", error);
          });
      })
      .catch(error => {
        console.error("Error adding thread:", error);
        alert("There was an error adding the thread. Please try again.");
      });
  };
  

  const handleBackToTopics = () => {
    navigate(-1); 
  };

return (
<div>
  <h2>Threads for {topicName}</h2>
    

  <form onSubmit={handleAddThread}>
    <div style={{maxWidth:"720px", marginLeft:"auto",marginRight:"auto"}}>
      <div style={{display:"inline-block", marginBottom:"10px"}}>
        <label >Title: </label>
          <input  className="winputThreads1"
            type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
      </div>
        
      <div style={{display:"inline-block"}}>
        <label>Content: </label>
          <input className="winputThreads2" 
            type="text"
            value={userId}
            onChange={(e) => setContent(e.target.value)}
            required
          />
      </div>
    </div>

    <div style={{marginBottom:"35px"}}>
      <button type="submit">Add Thread</button>
      <button style={{margin:"0px"}} type="button" onClick={handleBackToTopics}>Back To Topics</button> 
    </div>       

  </form> 

  {threads.map((thread, index) => (
    <div className="thread_comments" key={index}>
      <p className="userID">Created by: {thread.user.firstName} {thread.user.lastName}</p>
      <h2 className="comment"><Link  to={`/threads/${thread._id}`}>{thread.title}</Link></h2>
      {/* Display the thread content here if needed */}
    </div>
  ))}
  
</div>
);

}; 

export default ThreadList;
