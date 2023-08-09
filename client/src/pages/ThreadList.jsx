import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  
  const { topicName } = useParams(); // Capture the dynamic segment of the URL
  
  useEffect(() => {
    const apiUrl = `http://192.168.1.55:3000/api/threads/topic/${topicName}`; 
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
        userId: userId,
        topic: topicName
    };

    // Use axios to post the newThread to your server
    axios.post(`http://192.168.1.55:3000/api/threads`, newThread)
        .then(response => {
            setThreads(prevThreads => [...prevThreads, response.data]);
            setTitle('');  // Reset title field
            setUserId(''); // Reset userId field
        })
        .catch(error => {
            console.error("Error adding thread:", error);
        });
  };

  return (
    <div>
      <h2>Threads for {topicName}</h2>
      {threads.map((thread, index) => (
        <div key={index}>
          {thread.title}
          {/* ... other thread details */}
        </div>
      ))}

      <form onSubmit={handleAddThread}>
        <div>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>
        <div>
            <label>User ID:</label>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
        </div>
        <button type="submit">Add Thread</button>
      </form>
    </div>
  );
};

export default ThreadList;
