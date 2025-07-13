import React from "react";
import "./AssignmentTwo.css";

function Box({ title, content }) {
  return (
    <div className="box">
      <h2 className="box-title">{title}</h2>
      <p className="box-content">{content}</p>
    </div>
  );
}

function AssignmentTwo() {
  // array of project objects
  const data = [
    {
      title: "Portfolio Website",
      content:
        "This is my personal portfolio website where I’ll share a bit about myself and all the websites I’ve built so far! It’s something I’d love to show when applying for jobs, not just to display my work, but to express who I am in a fun and interactive way.",
    },
    {
      title: "Classical Music Learning Website",
      content:
        "This website introduces the great composers of classical music, highlighting their significance and the impact of their work on our daily lives. I aim to make this an interactive and engaging learning experience.",
    },
    {
      title: "Photobooth Website",
      content:
        "A just-for-fun website inspired by my love for taking pictures. I want to create a space where users can snap photos and get creative by customizing or decorating them, just like a digital photobooth <3",
    },
  ];

  return (
    <div className="title-container">
      <h1>My Top 3 Major Projects for 2025</h1>
      <p>
        Learn how to pass and manage data between parent and child components
        using <strong>props</strong>. This activity focuses on reusable components by
        dynamically rendering project information.
      </p>
      <div className="box-container">
        {data.map((item, index) => (
          <Box key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
}

export default AssignmentTwo;
