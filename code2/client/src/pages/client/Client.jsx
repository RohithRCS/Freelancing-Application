import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/client/client.css';
import { useNavigate } from 'react-router-dom';

const Client = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      const userId = localStorage.getItem('userId');
      const filteredProjects = response.data.filter(pro => pro.clientId === userId);
      setProjects(filteredProjects);
      setDisplayProjects(filteredProjects.reverse());
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleFilterChange = (status) => {
    const filtered = status
      ? projects.filter(project => project.status === status).reverse()
      : projects;
    setDisplayProjects(filtered);
  };

  return (
    <div className="client-container">
      <header className="header">
        <h1>My Projects</h1>
        <select onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="">All Projects</option>
          <option value="Available">Unassigned</option>
          <option value="Assigned">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </header>
      <div className="project-list">
        {displayProjects.map(project => (
          <div
            className="project-card"
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-footer">
              <span className="budget">₹{project.budget}</span>
              <span className={`status ${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
