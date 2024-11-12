import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [skills, setSkills] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post('http://localhost:6001/new-project', {
        title,
        description,
        budget,
        skills,
        clientId: localStorage.getItem('userId'),
        clientName: localStorage.getItem('username'),
        clientEmail: localStorage.getItem('email'),
      })
      .then((response) => {
        alert('New project added!');
        setTitle('');
        setDescription('');
        setBudget(0);
        setSkills('');
        navigate('/client');
      })
      .catch((err) => {
        alert('Operation failed!');
      });
  };

  return (
    <div className="new-project-page">
      <h3>Post a New Project</h3>
      <div className="new-project-form">
        <div className="form-floating">
          <input
            type="text"
            className="form-control mb-3"
            id="title"
            placeholder="Enter project title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="title">Project Title</label>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control mb-3"
            id="description"
            placeholder="Enter project description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <label htmlFor="description">Description</label>
        </div>

        <span>
          <div className="form-floating">
            <input
              type="number"
              className="form-control mb-3"
              id="budget"
              placeholder="Enter budget"
              onChange={(e) => setBudget(e.target.value)}
              value={budget}
            />
            <label htmlFor="budget">Budget (in ₹)</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-3"
              id="skills"
              placeholder="Enter required skills"
              onChange={(e) => setSkills(e.target.value)}
              value={skills}
            />
            <label htmlFor="skills">Required Skills (separate with commas)</label>
          </div>
        </span>

        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewProject;
