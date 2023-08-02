import React from "react";

const Topics = () => {
    const topicsList = [
        'Technology',
        'Science',
        'Law',
        'Economics',
        'Art',
        'Education',
        'Health',
        'Medicine',
        'Culinary Arts',
        'Fashion',
        'Finance',
        'Automotive',
        'Travel',
        'Government',


    ];

    return (
        <div className="topics">
            <h1>Topics</h1>
            <div className="topics-list">
                {topicsList.map((topic, index) => (
                    <div className="topic" key={index}>
                        <h3>{topic}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
