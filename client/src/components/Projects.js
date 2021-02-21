import React from "react";
import Project from "./Project";

const Projects = props => {
  return (
    <div className="projects-container">
      {props.projects.map(project => (
        <Project project={project} key={project.id} />
      ))}
    </div>
  );
};
export default Projects;
