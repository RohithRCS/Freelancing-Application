import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/MyProjects.css';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      const userProjects = response.data.filter(
        pro => pro.freelancerId === localStorage.getItem('userId')
      );
      setProjects(userProjects);
      setDisplayProjects(userProjects.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (data) => {
    if (data === "") {
      setDisplayProjects([...projects]);
    } else if (data === "In Progress") {
      setDisplayProjects(projects.filter(project => project.status === "Assigned"));
    } else if (data === "Completed") {
      setDisplayProjects(projects.filter(project => project.status === "Completed"));
    }
  };

  return (
    <div className="my-projects-page">
      <div className="my-projects-header">
        <h3>My Projects</h3>
        <select
          className="project-filter-select"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">Choose project status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <hr />

      <div className="my-projects-list">
        {displayProjects.map((project) => (
          <div
            className="listed-project"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <div className="listed-project-head">
              <h3>{project.title}</h3>
              <p>{new Date(project.postedDate).toDateString()}</p>
            </div>
            <h5>Budget: &#8377; {project.budget}</h5>
            <p>{project.description}</p>
            <div className="bids-data">
              <h6>Status: {project.status}</h6>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
