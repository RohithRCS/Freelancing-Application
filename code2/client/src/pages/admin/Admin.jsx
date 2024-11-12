import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get('http://localhost:6001/fetch-projects')
      .then((response) => {
        setProjectsCount(response.data.length);
        const comPros = response.data.filter((pro) => pro.status === 'Completed');
        setCompletedProsCount(comPros.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:6001/fetch-applications')
      .then((response) => {
        setApplicationsCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = async () => {
    await axios
      .get('http://localhost:6001/fetch-users')
      .then((response) => {
        setUsersCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '20px',
          color: '#333',
          borderBottom: '2px solid #007bff',
          display: 'inline-block',
          paddingBottom: '10px',
        }}
      >
        Admin Dashboard
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#555' }}>All Projects</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0', color: '#007bff' }}>
            {projectsCount}
          </p>
          <button
            onClick={() => navigate('/admin-projects')}
            style={{
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            View Projects
          </button>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#555' }}>
            Completed Projects
          </h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0', color: '#007bff' }}>
            {completedProsCount}
          </p>
          <button
            onClick={() => navigate('/admin-projects')}
            style={{
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            View Projects
          </button>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#555' }}>Applications</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0', color: '#007bff' }}>
            {applicationsCount}
          </p>
          <button
            onClick={() => navigate('/admin-applications')}
            style={{
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            View Applications
          </button>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#555' }}>Users</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0', color: '#007bff' }}>
            {usersCount}
          </p>
          <button
            onClick={() => navigate('/all-users')}
            style={{
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            View Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
