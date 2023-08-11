import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ThreadDetail = () => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  const { threadId } = useParams();

  useEffect(() => {
    axios.get(`http://192.168.1.55:3000/api/replies/${threadId}`)
      .then(response => {
        setReplies(response.data);
      })
      .catch(error => {
        console.error("Error fetching replies:", error);
      });
  }, [threadId]);

  const handleAddReply = (event) => {
    event.preventDefault();
    // ... Logic to add a reply using axios ...
  };

  return (
    <div>
      <h3>Replies</h3>
      {replies.map(reply => (
        <div key={reply._id}>{reply.content}</div>
      ))}

      <form onSubmit={handleAddReply}>
        <textarea 
          value={newReply} 
          onChange={(e) => setNewReply(e.target.value)}
          required
        />
        <button type="submit">Post Reply</button>
      </form>
    </div>
  );
};

export default ThreadDetail;