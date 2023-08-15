import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TopicsMain from "./TopicsMain";


const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // New state for thread content
  const [userId, setUserId] = useState('');
  const [topicName, setTopicName] = useState('');

  const navigate = useNavigate();
  const { topicId } = useParams(); // Capture the dynamic segment of the URL
  
  useEffect(() => {
    const fetchThreadsAndTopic = async () => {
      try {
        const threadsResponse = await axios.get(`http://localhost:3000/api/threads/topic/${topicId}`);
        setThreads(threadsResponse.data);
        
        const topicResponse = await axios.get(`http://localhost:3000/topics/${topicId}`);
        setTopicName(topicResponse.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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

    // Use axios to post the newThread to your server
    axios.post(`http://localhost:3000/api/threads/create`, newThread)
        .then(response => {
            console.log("Thread successfully added!");
            setThreads(prevThreads => [...prevThreads, response.data.thread]);
            setTitle('');  
            setContent('');  
            setUserId(''); 
        })
        .catch(error => {
            console.error("Error adding thread:", error);
            alert("There was an error adding the thread. Please try again.");
        });
};



  const handleBackToTopics = () => {
    navigate(-1); // Assuming '/topics' is the route for your topics page
  };

  return (
<div>
  <h2>Threads for {topicName}</h2>

  <form onSubmit={handleAddThread}>
    <div style={{width:"750px",marginLeft:"auto",marginRight:"auto"}}>
      
      <div style={{display:"inline-block", float:"right", marginBottom:"10px"}}>
        <label>Title: </label>
        <input 
          className="winputThreads1"
          type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
    </div>
    
    
    <div style={{display:"inline-block", float:"right", marginBottom:"10px"}}>
        <label>Content: </label>
        <input
            className="winputThreads1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
        ></input>
      </div>




          
      <div style={{display:"inline-block"}}>
        <label>User ID: </label>
          <input className="winputThreads2" 
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
    <p className="userID">Created by: {thread.userId}</p> 
    <h2 className="comment" ><Link  to={`/threads/${thread._id}`}>{thread.title}</Link></h2>
    
    
  </div>
  ))}

</div>

    

  
);
};

export default ThreadList;
