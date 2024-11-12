import React, { useEffect, useState } from 'react'
import '../../styles/admin/allApplications.css'
import axios from 'axios'

const AllApplications = () => {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [])

  const fetchApplications = async () => {
    await axios.get("http://localhost:6001/fetch-applications").then(
      (response) => {
        setApplications(response.data.reverse());
        console.log(response.data);
      }
    ).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="user-applications-page">
      <h3 className="page-title">All Applications</h3>

      <div className="user-applications-body">
        {applications.map((application) => (
          <div className="user-application-card">
            <div className="user-application-header">
              <h4>{application.title}</h4>
              <span className={`status-badge ${application.status === "Accepted" ? "accepted" : "rejected"}`}>{application.status}</span>
            </div>

            <div className="user-application-body">
              <div className="application-section">
                <h5>Client Details</h5>
                <p><strong>Client Name:</strong> {application.clientName}</p>
                <p><strong>Client Email:</strong> {application.clientEmail}</p>
                <p><strong>Budget:</strong> &#8377; {application.budget}</p>
              </div>

              <div className="vertical-line"></div>

              <div className="application-section">
                <h5>Freelancer Details</h5>
                <p><strong>Freelancer Name:</strong> {application.freelancerName}</p>
                <p><strong>Freelancer Email:</strong> {application.freelancerEmail}</p>
                <p><strong>Proposed Budget:</strong> &#8377; {application.bidAmount}</p>
              </div>
            </div>

            <div className="application-proposal">
              <h5>Proposal</h5>
              <p>{application.proposal}</p>
            </div>

            <div className="skills-section">
              <h5>Required Skills</h5>
              <div className="skills-badges">
                {application.requiredSkills.map((skill) => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllApplications;
