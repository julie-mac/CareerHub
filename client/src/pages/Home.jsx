import React from "react";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to CareerHub</h1>

      <div className="home-content">
        <div className="home-left">
          <h2>What is CareerHub?</h2>
          <p>
            CareerHub is a dynamic social media platform designed for in-depth
            discussions on careers, professional growth, and industry insights.
            Users can create topics, share posts, and engage with others'
            content through comments. This platform caters to a diverse
            audience, including students, graduates, and professionals, offering
            a space to exchange knowledge, seek guidance, and build connections.
            Users initiate conversations by creating topics covering various
            aspects of career development, from resume tips to industry trends.
            Posts within these topics invite personal experiences, questions,
            and advice, fostering a collaborative environment. Career experts
            can contribute their insights, adding credibility to discussions.
            Users also benefit from networking opportunities and staying updated
            on industry shifts.
          </p>
        </div>
        <div className="home-right">
          <div className="featured-post">
            <h3>How to Make the Most of CareerHub</h3>
            <p>
              Embark on your journey with CareerHub armed with these stellar
              tips to kickstart your experience! Brace yourself to craft
              magnetic posts, unearth goldmine-worthy career topics, and
              effortlessly tap into a network of seasoned professionals. It's
              time to dive in and make your mark! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
