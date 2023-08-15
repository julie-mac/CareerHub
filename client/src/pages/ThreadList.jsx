import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TopicsMain from "./TopicsMain";
import jwtDecode from 'jwt-decode';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [topicName, setTopicName] = useState('');
  const isLoggedIn = localStorage.getItem('token');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const decodedToken = isLoggedIn ? jwtDecode(localStorage.getItem('token')) : null;
  const userId = decodedToken ? decodedToken.userId : '';

  const { topicId } = useParams(); // Capture the dynamic segment of the URL
  
  useEffect(() => {
    const fetchThreadsAndTopic = async () => {
      try {
        const [threadsResponse, topicResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:3000/api/threads/topic/${topicId}`),
          axios.get(`http://127.0.0.1:3000/topics/${topicId}`)
        ]);
    
        console.log('Threads response:', threadsResponse.data);
        console.log('Topic response:', topicResponse.data);
    
        const threadsWithUserData = await Promise.all(
          threadsResponse.data.map(async (thread) => {
            const userResponse = await axios.get(`http://127.0.0.1:3000/api/users/${userId}`);
            const user = userResponse.data; // Assuming userResponse.data has the correct user details
        
            // Map the user details to the thread object
            return {
              ...thread,
              user: {
                firstName: user.firstName,
                lastName: user.lastName
              }
            };
          })
        );
    
        console.log('ThreadsWithUserData:', threadsWithUserData);
    
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
      userId: userId,
      topic: topicId
    };
  
    // Use axios to post the newThread to your server
    axios.post(`http://127.0.0.1:3000/api/threads/create`, newThread)
      .then(response => {
        // If you receive the newly created thread with an ID or additional data from the server, you can update the local state with that data here
        console.log("Thread successfully added!");
        setThreads(prevThreads => [
          ...prevThreads,
          {
            title: title,
            user: {
              firstName: userFirstName, // Assuming you've already fetched this from the token
              lastName: userLastName    // Assuming you've already fetched this from the token
            }
          }
        ]);
        setTitle('');
      })
      .catch(error => {
        console.error("Error adding thread:", error);
        alert("There was an error adding the thread. Please try again.");
      });
  };
  

return (
  <div>
    <h2>Threads for {topicName}</h2>

    {isLoggedIn ? (
      <form onSubmit={handleAddThread}>
        <div style={{ width: "715px", marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ display: "inline-block", float: "right", marginBottom: "10px" }}>
            <label>Title: </label>
            <input
              style={{ width: "600px" }}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Automatically pulling user ID from token */}
          <input type="hidden" name="userId" value={userId} />

        </div>

        <div style={{ marginBottom: "35px" }}>
          <button type="submit">Add Thread</button>
          <button onClick={TopicsMain}>Back To Topics</button>
        </div>
      </form>
    ) : (
      <p>Please log in to post a thread.</p>
    )}

    {/* Thread list */}
    {threads.map((thread, index) => (
        <div className="thread_comments" key={index}>
          <p className="userID">Created by: {thread.user.firstName} {thread.user.lastName}</p>
          <h2 className="comment">
            <Link to={`/threads/${thread._id}`}>{thread.title}</Link>
          </h2>
        </div>
    ))}
  </div>
);

};

export default ThreadList;
