import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ThreadDetail = () => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [thread, setThread] = useState(null);

  const { threadId } = useParams();

  useEffect(() => {
    axios.get(`http://192.168.1.55:3000/api/threads/${threadId}`)
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
    const url = `http://192.168.1.55:3000/api/posts/${threadId}/reply`;
  
    // Assuming you have the user authenticated and you store their email or user id in a state or a context
    // For this example, I'll just hardcode the email, but in a real application you'd want to fetch it from a user's session, context or a state
    const userId = "jane.doe@example.com"; 
  
    axios.post(url, {
      userId: userId,
      content: newReply,
    })
    .then(response => {
      // Assuming the response from the server contains the new reply's data including its ID
      const addedReply = response.data.reply || { content: newReply, userId: userId }; 
      setReplies(prevReplies => [...prevReplies, addedReply]);
      setNewReply('');
    })
    
    .catch(error => {
      console.error("Error posting reply:", error);
    });
  };
  

  return (
    <div>
      {/* Display the thread */}
        {thread && (
        <div>
          <h2 style={{marginBottom:"0px"}}>{thread.title} </h2>
          <p style={{marginTop:"5px"}}>Created by: {thread.userId}</p> {/* Adjust based on your data structure */}
        </div>
      )}

      <form onSubmit={handleAddReply}>
        <div>
        <textarea 
          value={newReply} 
          onChange={(e) => setNewReply(e.target.value)}
          required
        />
        </div>

        <div style={{margin:"0px"}}>
        <button style={{margin:"0px"}} type="submit">Post Reply</button>
        <button style={{margin:"0px"}} type="submit">Back To Topics</button>
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