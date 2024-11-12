import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/AllProjects.css';

const AllProjects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      setProjects(response.data);
      setDisplayProjects(response.data.reverse());

      const skillsSet = new Set();
      response.data.forEach(project => {
        project.skills.forEach(skill => skillsSet.add(skill));
      });
      setAllSkills([...skillsSet]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    setCategoryFilter(prev => 
      e.target.checked ? [...prev, value] : prev.filter(skill => skill !== value)
    );
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects.filter(project => categoryFilter.every(skill => project.skills.includes(skill)))
      );
    } else {
      setDisplayProjects([...projects]);
    }
  }, [categoryFilter, projects]);

  return (
    <div className="all-projects-page">
      <div className="project-filters">
        <h3>Filters</h3>
        <hr />
        <div className="filters">
          <h5>Skills</h5>
          <div className="filter-options">
            {allSkills.map(skill => (
              <div className="form-check" key={skill}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={skill}
                  id={skill}
                  onChange={handleCategoryCheckBox}
                />
                <label className="form-check-label" htmlFor={skill}>{skill}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="projects-list">
        <h3>All Projects</h3>
        <hr />
        {displayProjects.map(project => (
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
            <div className="skills">
              {project.skills.map(skill => (
                <h6 key={skill}>{skill}</h6>
              ))}
            </div>
            <div className="bids-data">
              <p>{project.bids.length} bids</p>
              <h6>
                &#8377; {project.bids.length > 0 ? (project.bidAmounts.reduce((a, c) => a + c, 0) / project.bids.length).toFixed(2) : 0} (avg bid)
              </h6>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
