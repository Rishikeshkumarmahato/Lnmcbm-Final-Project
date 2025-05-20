import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Settings = () => {
    const { user } = useAuth();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [notifications, setNotifications] = useState({
        email: false,
        courseUpdates: false,
        newFeatures: false
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:5000/api/profile/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('Password updated successfully!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                alert(data.message || 'Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password');
        }
    };

    const handleNotificationChange = async (e) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));

        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:5000/api/profile/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    [name]: checked
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('Notification preferences updated!');
            }
        } catch (error) {
            console.error('Error updating notification preferences:', error);
            alert('Failed to update notification preferences');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <h1>Account Settings</h1>
                    <p>Manage your account preferences and security</p>
                </div>
            </div>

            <div className="profile-content">
                <div className="settings-section">
                    <h2>Change Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input 
                                type="password" 
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                placeholder="Enter current password"
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input 
                                type="password" 
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input 
                                type="password" 
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button type="submit" className="save-btn">Update Password</button>
                    </form>
                </div>

                <div className="settings-section">
                    <h2>Notification Preferences</h2>
                    <div className="checkbox-group">
                        <label>
                            <input 
                                type="checkbox" 
                                name="email"
                                checked={notifications.email}
                                onChange={handleNotificationChange}
                            /> 
                            Email Notifications
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="courseUpdates"
                                checked={notifications.courseUpdates}
                                onChange={handleNotificationChange}
                            /> 
                            Course Updates
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="newFeatures"
                                checked={notifications.newFeatures}
                                onChange={handleNotificationChange}
                            /> 
                            New Features
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 