import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../layouts/Navbar";


const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  
  const { topicName } = useParams(); // Capture the dynamic segment of the URL
  
  useEffect(() => {
    const apiUrl = `http://localhost:3000/api/threads/topic/${topicName}`; 
    axios.get(apiUrl)
      .then(response => {
        setThreads(response.data);
      })
      .catch(error => {
        console.error("Error fetching threads:", error);
      });
  }, [topicName]);

  const handleAddThread = (event) => {
    event.preventDefault();

    const newThread = {
        title: title,
        user_id: userId,
        topic: topicName
    };

    // Optimistically update the state
    setThreads(prevThreads => [...prevThreads, newThread]);
    setTitle('');  
    setUserId(''); 

    // Use axios to post the newThread to your server
    axios.post(`http://192.168.1.55:3000/api/threads/create`, newThread)
        .then(response => {
            // If you receive the newly created thread with an ID or additional data from the server, you can update the local state with that data here
            console.log("Thread successfully added!");
        })
        .catch(error => {
            console.error("Error adding thread:", error);
            // If there was an error, revert the optimistic update by removing the thread from state
            setThreads(prevThreads => prevThreads.filter(thread => thread !== newThread));
            alert("There was an error adding the thread. Please try again.");
        });
};

  return (
    <div>
       <NavBar />
      <h2>Threads for {topicName}</h2>
      

      <form onSubmit={handleAddThread}>
        <div>
            <label>Title: </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>
        
        <div>
            <label>User ID: </label>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
        </div>

        <div>
        <button type="submit">Add Thread</button>
        </div>

        <div>
        {threads.map((thread, index) => (       
        <div key={index}>        
        <h1> {thread.title}</h1>        
          {/* ... other thread details */}
        </div>               
        ))}
        </div> 

      </form>    
                 
         
    
    </div>
  );
};

export default ThreadList;
