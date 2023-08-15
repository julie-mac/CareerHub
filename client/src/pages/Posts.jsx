import React, { useState } from "react";
import Button from "@mui/material/Button";
// import { Margin } from "@mui/icons-material";

// import { Margin } from "@mui/icons-material";
// import { Typewriter } from 'react-simple-typewriter';
// import { useRef } from 'react';
// import emailjs from '@emailjs/browser';




const Posts = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ thread });
      setThread("");
  };
  return (
    <>
    <main className='home'>
          <h3> Create a Thread</h3>

      <form className='homeForm' onSubmit={handleSubmit}>
        <div className='home__container'>
          <label>Title / Description: </label>
          <input 
            type='text'
            name='thread'
            required
            value={thread}
            onChange={(e) => setThread(e.target.value)}
          />
        </div>             
        <Button
          style={{
          backgroundColor: "orange",
          fontSize: "15px",
          fontFamily: "Tahoma",
          justifyContent: "center",
          fontWeight: "bold",
          color: "rgb(47, 79, 79)",
          marginLeft: "auto",
          marginRight: "auto"              
          }}
           >
            CREATE THREAD
        </Button>
      </form>
                 
    </main>
  </>
  );
};
export default Posts;