import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const ThreadDetail = () => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [thread, setThread] = useState(null);
  
  const navigate = useNavigate();
  const { threadId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/threads/${threadId}`)
      .then(response => {
        setThread(response.data);
        setReplies(response.data.replies || []);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching thread:", error);
      });
  }, [threadId]);

  const handleAddReply = (event) => {
    event.preventDefault();
  
    // API endpoint to post a reply
    const url = `http://localhost:3000/api/posts/${threadId}/reply`;
    
  
    // For this example, I'll just hardcode the email, but in a real application you'd want to fetch it from a user's session, context or a state
    const userId = "jane.doe@example.com"; 
  
    axios.post(`http:/192.168.1.55:3000/api/posts/${threadId}/reply`, {
      userId: userId,
      content: newReply,
    })
    .then(response => {
      const addedReply = response.data.reply || { content: newReply, userId: userId }; 
      setReplies(prevReplies => [...prevReplies, addedReply]);
      setNewReply('');
    })
    
    .catch(error => {
      console.error("Error posting reply:", error);
    });
  };
  
  const handleBackToThreads = () => {
    navigate(-1); 
  };

  return (
    <div>
      {/* Display the thread */}
        {thread && (
        <div >
          <h2 style={{marginBottom:"0px"}}>{thread.title} </h2>
          <div className="thread_content">
          <p>{thread.content}</p>
          <p className="userID-thread">Created by: {thread.userId}</p> 
        </div>
        </div>
      )}
      <h3 style={{marginBottom:"8px"}}>Add Reply</h3>
      <form onSubmit={handleAddReply}>
        <div>
        <textarea className="winputThreads1"
          value={newReply} 
          onChange={(e) => setNewReply(e.target.value)}
          required
        />
        </div>

        <div style={{margin:"0px"}}>
          <button style={{margin:"0px"}} type="submit">Post Reply</button>
          <button style={{margin:"0px"}} type="button" onClick={handleBackToThreads}>Back To Threads</button> 
        </div>

      </form>

     
      <h3 style={{marginBottom:"8px"}}>Replies</h3>
      {replies.map(reply => (
      <div className="thread_comments"  key={reply._id}>
        <p  className="userID">Replied by: {reply.userId}</p>
        <h2  className="comment" > {reply.content}</h2>
        
      </div>
      ))}



    </div>
  );
};

export default ThreadDetail;