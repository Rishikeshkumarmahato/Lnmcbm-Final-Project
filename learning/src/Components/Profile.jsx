import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        profilePicture: user?.profilePicture || ''
    });

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:5000/api/enrollment/my-courses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setEnrolledCourses(data.data);
                }
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:5000/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            const data = await response.json();
            if (data.success) {
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="profile-info">
                    <h1>{user?.username || 'User'}</h1>
                    <p>{user?.email || 'No email provided'}</p>
                </div>
            </div>

            <div className="profile-tabs">
                <button 
                    className={activeTab === 'profile' ? 'active' : ''} 
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button 
                    className={activeTab === 'courses' ? 'active' : ''} 
                    onClick={() => setActiveTab('courses')}
                >
                    My Courses
                </button>
            </div>

            <div className="profile-content">
                {activeTab === 'profile' && (
                    <div className="detail-section">
                        <h2>Personal Information</h2>
                        <form onSubmit={handleProfileUpdate}>
                            <div className="detail-item">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    value={profileData.username}
                                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                                />
                            </div>
                            <div className="detail-item">
                                <label>Email</label>
                                <p>{profileData.email}</p>
                            </div>
                            <div className="detail-item">
                                <label>Phone</label>
                                <p>{profileData.phone}</p>
                            </div>
                            <div className="detail-item">
                                <label>Bio</label>
                                <textarea 
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                            <button type="submit" className="save-btn">Save Changes</button>
                        </form>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div className="courses-grid">
                        {enrolledCourses.map((course) => (
                            <div className="course-card" key={course._id}>
                                <h3>{course.courseName}</h3>
                                <p>Instructor: {course.instructor}</p>
                                <div className="course-progress">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress" 
                                            style={{ width: `${course.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <p>Progress: {course.progress || 0}%</p>
                                </div>
                                <button className="continue-btn">Continue Learning</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;