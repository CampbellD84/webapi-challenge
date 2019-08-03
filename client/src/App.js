import React, { useState, useEffect } from "react";
import axios from "axios";

import Projects from "./components/Projects";

import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="title-align">
        <h2>Projects</h2>
      </div>
      <Projects projects={projects} />
    </>
  );
}

export default App;
