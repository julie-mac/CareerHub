import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";


const ThreadDetail = () => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [thread, setThread] = useState(null);
  const isLoggedIn = localStorage.getItem('token');
  const decodedToken = isLoggedIn ? jwtDecode(localStorage.getItem('token')) : null;
  const userId = decodedToken ? decodedToken.userId : '';

  const navigate = useNavigate();
  const { threadId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the thread and replies
        const [threadResponse, repliesResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/threads/${threadId}`),
          axios.get(`http://localhost:3000/api/posts/${threadId}/reply`)
        ]);

        const threadData = threadResponse.data;
        const repliesData = repliesResponse.data || [];

        // Fetch user information for the thread author
        const threadUserResponse = await axios.get(`http://localhost:3000/api/users/${threadData.userId}`);
        const threadUser = threadUserResponse.data;

        // Fetch user information for all reply authors
        const replyAuthors = [...repliesData.map(reply => reply.userId), threadData.userId];
        const userResponses = await Promise.all(
          replyAuthors.map(authorId => axios.get(`http://localhost:3000/api/users/${authorId}`))
        );
        const usersData = userResponses.map(response => response.data);

        // Set the thread and reply authors with user information
        setThread({
          ...threadData,
          user: threadUser
        });

        setReplies(
          repliesData.map(reply => ({
            ...reply,
            user: usersData.find(user => user._id === reply.userId)
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [threadId]);
  

  const handleAddReply = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${threadId}/reply`, {
        userId: userId,
        content: newReply,
      });
  
      const addedReply = response.data.reply || { content: newReply, userId: userId };
  
      // Fetch user information for the author of the new reply
      const userResponse = await axios.get(`http://localhost:3000/api/users/${addedReply.userId}`);
      const user = userResponse.data;
  
      addedReply.user = user;
  
      setReplies(prevReplies => [...prevReplies, addedReply]);
      setNewReply('');
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };
  
  const handleBackToThreads = () => {
    navigate(-1); 
  };

  return (
    <div>

        {thread && (
        <div >
          <h2 style={{marginBottom:"0px"}}>{thread.title} </h2>
          <div className="thread_content">
          <p>{thread.content}</p>
          <p className="userID-thread">Created by: {thread.user.firstName} {thread.user.lastName}</p> 
        </div>
        </div>
      )}

      { isLoggedIn ? (
        <form onSubmit={handleAddReply}>
          <h3 style={{marginBottom:"8px"}}>Add Reply</h3>
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
      ) : (
        <div>
          <p>Please log in to post a reply.</p>
        </div>
      )}

     
      <h3 style={{marginBottom:"8px"}}>Replies</h3>
      {replies.map(reply => (
        <div className="thread_comments" key={reply._id}>
          {reply.user && (
            <p className="userID">Replied by: {reply.user.firstName} {reply.user.lastName}</p>
          )}
          <h2 className="comment">{reply.content}</h2>
        </div>
      ))}

    </div>
  );
};

export default ThreadDetail;