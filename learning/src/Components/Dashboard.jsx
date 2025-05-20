import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        enrolledCourses: 0,
        completedLessons: 0,
        certificates: 0,
        totalHours: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [courseProgress, setCourseProgress] = useState([]);

    useEffect(() => {
        // Dummy data for demonstration
        setStats({
            enrolledCourses: 3,
            completedLessons: 12,
            certificates: 1,
            totalHours: 24
        });

        setRecentActivity([
            {
                id: 1,
                type: 'lesson',
                course: 'Web Development Bootcamp',
                title: 'Completed HTML Basics',
                time: '2 hours ago'
            },
            {
                id: 2,
                type: 'quiz',
                course: 'Data Science Fundamentals',
                title: 'Passed Python Quiz',
                time: '1 day ago'
            },
            {
                id: 3,
                type: 'certificate',
                course: 'Digital Marketing',
                title: 'Earned Certificate',
                time: '3 days ago'
            }
        ]);

        setCourseProgress([
            {
                id: 1,
                name: 'Web Development Bootcamp',
                progress: 65,
                lastAccessed: '2 hours ago'
            },
            {
                id: 2,
                name: 'Data Science Fundamentals',
                progress: 30,
                lastAccessed: '1 day ago'
            },
            {
                id: 3,
                name: 'Digital Marketing',
                progress: 100,
                lastAccessed: '3 days ago'
            }
        ]);
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome back, {user?.username || 'User'}!</h1>
                <p>Here's an overview of your learning journey</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <i className="fa-solid fa-book"></i>
                    <div className="stat-info">
                        <h3>{stats.enrolledCourses}</h3>
                        <p>Enrolled Courses</p>
                    </div>
                </div>
                <div className="stat-card">
                    <i className="fa-solid fa-check-circle"></i>
                    <div className="stat-info">
                        <h3>{stats.completedLessons}</h3>
                        <p>Completed Lessons</p>
                    </div>
                </div>
                <div className="stat-card">
                    <i className="fa-solid fa-certificate"></i>
                    <div className="stat-info">
                        <h3>{stats.certificates}</h3>
                        <p>Certificates</p>
                    </div>
                </div>
                <div className="stat-card">
                    <i className="fa-solid fa-clock"></i>
                    <div className="stat-info">
                        <h3>{stats.totalHours}h</h3>
                        <p>Learning Hours</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="course-progress-section">
                    <h2>Course Progress</h2>
                    <div className="progress-cards">
                        {courseProgress.map(course => (
                            <div className="progress-card" key={course.id}>
                                <h3>{course.name}</h3>
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <div className="progress-info">
                                    <span>{course.progress}% Complete</span>
                                    <span>Last accessed: {course.lastAccessed}</span>
                                </div>
                                <button className="continue-btn">Continue Learning</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recent-activity-section">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        {recentActivity.map(activity => (
                            <div className="activity-item" key={activity.id}>
                                <div className="activity-icon">
                                    <i className={`fa-solid fa-${activity.type === 'lesson' ? 'book' : 
                                        activity.type === 'quiz' ? 'question-circle' : 'certificate'}`}></i>
                                </div>
                                <div className="activity-info">
                                    <h4>{activity.title}</h4>
                                    <p>{activity.course}</p>
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 