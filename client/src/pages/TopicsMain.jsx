import React, { useState, useEffect } from "react";
import NavBar from "../layouts/Navbar";
import axios from "axios";
import Topic from "./Topic";  // Import the new Topic component

const TopicsMain = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const apiUrl = "http://localhost:3000/topics";

        axios.get(apiUrl)
            .then(response => {
                setTopics(response.data);
            })
            .catch(error => {
                console.error("Error fetching topics:", error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <h2>TOPICS</h2>
            
            {topics.map((topic, index) => (
                <Topic key={index} topic={topic} />  // Use the Topic component here
            ))}
        </div>
    );
};

export default TopicsMain;
