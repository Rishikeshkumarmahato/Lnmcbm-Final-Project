import React from 'react';
import './Scholarship.css';

const Scholarship = () => {
    const scholarships = [
        {
            title: "Merit Scholarship",
            amount: "$5,000",
            deadline: "2024-06-30",
            eligibility: "GPA 3.5 or higher",
            description: "For outstanding academic achievers across all disciplines."
        },
        {
            title: "Need-Based Grant",
            amount: "$3,000",
            deadline: "2024-07-15",
            eligibility: "Demonstrated financial need",
            description: "Supporting students with financial constraints to pursue their education."
        },
        {
            title: "STEM Excellence Award",
            amount: "$4,500",
            deadline: "2024-06-15",
            eligibility: "STEM majors with research experience",
            description: "For students pursuing careers in Science, Technology, Engineering, or Mathematics."
        }
    ];

    return (
        <div className="scholarship-container">
            <div className="scholarship-header">
                <h1>Available Scholarships</h1>
                <p>Discover opportunities to fund your education</p>
            </div>
            
            <div className="scholarships-grid">
                {scholarships.map((scholarship, index) => (
                    <div className="scholarship-card" key={index}>
                        <h2>{scholarship.title}</h2>
                        <div className="scholarship-amount">
                            <span>{scholarship.amount}</span>
                        </div>
                        <div className="scholarship-details">
                            <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                            <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                            <p>{scholarship.description}</p>
                        </div>
                        <button className="apply-button">Apply Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scholarship; 