import React from "react";

const Project = props => {
  return (
    <div className="project">
      <h3>{props.project.name}</h3>
      <p>{props.project.description}</p>
    </div>
  );
};

export default Project;
