// Topic.js
import React from "react";

const Topic = ({ topic }) => {
    return (
        <div className="row">
            <div className="image">
                {/* Use the imageUrl directly from the topic prop */}
                <img src={topic.imageUrl} alt={topic.name}/>
                <div className="details">
                    <h2>
                        <a href={`/Topics_Title/${topic.name}`}>
                            <span>{topic.name}</span>
                        </a>
                    </h2>  
                </div>
            </div>
        </div>
    );
};

export default Topic;