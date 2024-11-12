import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      setProjects(response.data);
      setDisplayProjects(response.data.reverse());

      const skillsSet = new Set();
      response.data.forEach((project) => {
        project.skills.forEach((skill) => skillsSet.add(skill));
      });
      setAllSkills([...skillsSet]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    setCategoryFilter((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((skill) => skill !== value)
    );
  };

  useEffect(() => {
    let filteredProjects = projects;

    if (categoryFilter.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        categoryFilter.every((skill) => project.skills.includes(skill))
      );
    }

    if (searchQuery) {
      filteredProjects = filteredProjects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayProjects(filteredProjects);
  }, [categoryFilter, projects, searchQuery]);

  return (
    <div className="admin-projects-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Project Filters</h3>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filters">
          <h5>Skills</h5>
          <div className="filter-options">
            {allSkills.map((skill) => (
              <div className="form-check" key={skill}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={skill}
                  id={skill}
                  onChange={handleCategoryCheckBox}
                />
                <label className="form-check-label" htmlFor={skill}>
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="projects-list">
        <h3>All Projects</h3>
        <div className="project-cards">
          {displayProjects.map((project) => (
            <div
              className="project-card"
              key={project._id}
              onClick={() => navigate(`/project-details/${project._id}`)}
            >
              <div className="card-header">
                <h4>{project.title}</h4>
                <p>{new Date(project.postedDate).toLocaleDateString()}</p>
              </div>
              <div className="card-body">
                <p>{project.description}</p>
                <h5>Budget: ₹{project.budget}</h5>
              </div>
              <div className="skills">
                {project.skills.map((skill) => (
                  <span className="skill-badge" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
              <div className="card-footer">
                <p>{project.bids.length} bids</p>
                <p>
                  ₹{' '}
                  {project.bids.length > 0
                    ? (project.bidAmounts.reduce((a, c) => a + c, 0) / project.bids.length).toFixed(2)
                    : 0}{' '}
                  (avg bid)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .admin-projects-page {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 30px;
          gap: 20px;
        }

        .sidebar {
          width: 600px;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header h3 {
          margin-bottom: 20px;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .search-bar input {
          width: 100%;
         
        }

        .filters h5 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #333;
        }

        .form-check {
          margin-bottom: 12px;
        }

        .form-check label {
          font-size: 1rem;
          color: #555;
        }

        .projects-list {
          flex-grow: 1;
          width: 100%;
        }

        .project-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .project-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          padding: 30px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .card-header h4 {
          font-size: 1.5rem;
          margin: 0;
          color: #333;
        }

        .card-body p {
          font-size: 1rem;
          color: #666;
          margin: 10px 0;
        }

        .skills .skill-badge {
          background-color: #red;
          color: white;
          padding: 6px 12px;
          margin: 6px;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .card-footer {
          margin-top: 15px;
          font-size: 1rem;
          color: #777;
        }

        @media (max-width: 768px) {
          .admin-projects-page {
            flex-direction: column;
            align-items: center;
          }

          .projects-list {
            width: 100%;
          }

          .sidebar {
            width: 100%;
            margin-bottom: 30px;
          }

          .project-cards {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProjects;
