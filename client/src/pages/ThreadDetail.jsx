import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";


const ThreadDetail = () => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [thread, setThread] = useState(null);
  const isLoggedIn = localStorage.getItem('token');
  // const [userFirstName, setUserFirstName] = useState('');
  // const [userLastName, setUserLastName] = useState('');
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

        setThread(threadResponse.data);
        setReplies(repliesResponse.data || []);

        // Fetch user information for both the original thread and all replies
        const userIdsToFetch = [threadResponse.data.userId, ...repliesResponse.data.map(reply => reply.userId)];
        const userResponses = await Promise.all(
          userIdsToFetch.map(userId => axios.get(`http://localhost:3000/api/users/${userId}`))
        );

        const usersData = userResponses.map(response => response.data);

        setThread(prevThread => ({
          ...prevThread,
          user: usersData.find(user => user._id === prevThread.userId)
        }));
        
        setReplies(prevReplies =>
          prevReplies.map(reply => ({
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
  

  const handleAddReply = (event) => {
    event.preventDefault();
  
    axios.post(`http://localhost:3000/api/posts/${threadId}/reply`, {
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

        {thread && (
        <div >
          <h2 style={{marginBottom:"0px"}}>{thread.title} </h2>
          <div className="thread_content">
          <p>{thread.content}</p>
          <p className="userID-thread">Created by: {thread.userId}</p> 
        </div>
        </div>
      )}

      { isLoggedIn ? (
        <form onSubmit={handleAddReply}>
          <h3 style={{marginBottom:"8px"}}>Add Reply</h3>
          <div>
            <textarea 
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
      <div className="thread_comments"  key={reply._id}>
        <p  className="userID">Replied by: {reply.userId}</p>
        <h2  className="comment" > {reply.content}</h2>
        
      </div>
      ))}



    </div>
  );
};

export default ThreadDetail;