import React, { useState, useEffect } from 'react'
import { allCoursesContent } from './AllCoursesContent'
import './Courses.css';
import Header from './Header';
import { useParams } from 'react-router-dom';
import my_video from '../assets/course_background.mp4'

const Courses = () => {
  const {id} = useParams();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showEnrollSuccess, setShowEnrollSuccess] = useState(false);
  const [showCourseContent, setShowCourseContent] = useState(false);
  const [currentCourseContent, setCurrentCourseContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch enrolled courses on component mount
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

  // Check if the category exists
  if (!allCoursesContent[id]) {
    return (
      <>
        <Header/>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Course category not found!</h2>
        </div>
      </>
    );
  }

  const handleEnrollClick = async (course) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/enrollment/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: course.head,
          courseName: course.head,
          instructor: course.inst
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setShowLoginAlert(true);
          setTimeout(() => setShowLoginAlert(false), 3000);
          return;
        }
        throw new Error(data.message || 'Failed to enroll in course');
      }

      if (data.success) {
        setEnrolledCourses(prev => [...prev, data.data]);
        setShowEnrollSuccess(true);
        setTimeout(() => setShowEnrollSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
    }
  };

  const handleExploreClick = (course) => {
    setCurrentCourseContent(course);
    setShowCourseContent(true);
  };

  const handlePreviewClick = (course) => {
    setSelectedCourse(course);
    setShowPreview(true);
  };

  const isEnrolled = (course) => {
    return enrolledCourses.some(enrolled => enrolled.courseId === course.head);
  };

  const PreviewModal = ({ course, onClose }) => {
    if (!course) return null;

    return (
      <div className="preview-modal-overlay" onClick={onClose}>
        <div className="preview-modal-content" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>
          <div className="preview-header">
            <img src={course.image} alt={course.head} />
            <div className="preview-info">
              <h2>{course.head}</h2>
              <h3>{course.inst}</h3>
              <h4>Course Preview</h4>
            </div>
          </div>
          <div className="preview-body">
            <div className="preview-section">
              <h3>Course Overview</h3>
              <p>This is a comprehensive course designed to help you master the fundamentals and advanced concepts. You'll learn through practical examples and hands-on projects.</p>
            </div>
            <div className="preview-section">
              <h3>What You'll Learn</h3>
              <ul>
                <li>Key concept 1 and its applications</li>
                <li>Advanced techniques and methodologies</li>
                <li>Real-world project implementation</li>
                <li>Best practices and industry standards</li>
              </ul>
            </div>
            <div className="preview-section">
              <h3>Course Duration</h3>
              <p>8 weeks (self-paced)</p>
            </div>
            <div className="preview-section">
              <h3>Prerequisites</h3>
              <p>Basic understanding of the subject area</p>
            </div>
          </div>
          <div className="preview-footer">
            {isEnrolled(course) ? (
              <button 
                className="explore-button"
                onClick={() => handleExploreClick(course)}
              >
                Explore Now
              </button>
            ) : (
              <button 
                className={`enroll-button ${isEnrolled(course) ? 'enrolled' : ''}`}
                onClick={() => handleEnrollClick(course)}
              >
                {isEnrolled(course) ? 'Enrolled' : 'Enroll Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CourseContent = ({ course, onClose }) => {
    if (!course) return null;

    return (
      <div className="course-content-overlay" onClick={onClose}>
        <div className="course-content" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>
          <div className="course-content-header">
            <h1>{course.head}</h1>
            <h2>{course.inst}</h2>
          </div>
          
          <div className="course-content-body">
            <div className="course-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: '0%' }}></div>
              </div>
              <p>Course Progress: 0%</p>
            </div>

            <div className="course-sections">
              <h3>Course Content</h3>
              <div className="section-list">
                <div className="section">
                  <h4>Module 1: Introduction</h4>
                  <ul>
                    <li className="locked">
                      <span>1.1 Welcome to the Course</span>
                      <i className="fas fa-lock"></i>
                    </li>
                    <li className="locked">
                      <span>1.2 Course Overview</span>
                      <i className="fas fa-lock"></i>
                    </li>
                    <li className="locked">
                      <span>1.3 Getting Started</span>
                      <i className="fas fa-lock"></i>
                    </li>
                  </ul>
                </div>

                <div className="section">
                  <h4>Module 2: Fundamentals</h4>
                  <ul>
                    <li className="locked">
                      <span>2.1 Basic Concepts</span>
                      <i className="fas fa-lock"></i>
                    </li>
                    <li className="locked">
                      <span>2.2 Core Principles</span>
                      <i className="fas fa-lock"></i>
                    </li>
                    <li className="locked">
                      <span>2.3 Practical Examples</span>
                      <i className="fas fa-lock"></i>
                    </li>
                  </ul>
                </div>

                <div className="section">
                  <h4>Module 3: Advanced Topics</h4>
                  <ul>
                    <li className="locked">
                      <span>3.1 Advanced Concepts</span>
                      <i className="fas fa-lock"></i>
                    </li>
                    <li className="locked">
                      <span>3.2 Case Studies</span>
                      <i className="fas fa-lock"></i>
                    </li>
                    <li className="locked">
                      <span>3.3 Final Project</span>
                      <i className="fas fa-lock"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="course-resources">
              <h3>Course Resources</h3>
              <div className="resources-list">
                <div className="resource">
                  <i className="fas fa-file-pdf"></i>
                  <span>Course Syllabus</span>
                </div>
                <div className="resource">
                  <i className="fas fa-book"></i>
                  <span>Reading Materials</span>
                </div>
                <div className="resource">
                  <i className="fas fa-tasks"></i>
                  <span>Assignments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header/>
      <h1 id='related_courses'>Related Courses</h1>
      
      {/* Alert Messages */}
      {showLoginAlert && (
        <div className="alert-message login-alert">
          Please login to enroll in courses
        </div>
      )}
      {showEnrollSuccess && (
        <div className="alert-message success-alert">
          Successfully enrolled in the course!
        </div>
      )}

      <div className='allCourses'>  
        <video autoPlay loop muted className="background-video">
          <source src={my_video} type="video/mp4" />
        </video>      
        {allCoursesContent[id].map((course, index) => (
          <div className='course_item' key={index}>
            <div className="course-image-container">
              <img src={course.image} alt={course.head} />
              <div className="course-overlay">
                <button className="preview-btn" onClick={() => handlePreviewClick(course)}>Preview Course</button>
              </div>
            </div>
            <h2>{course.head}</h2>
            <h3>{course.inst}</h3>
            <h6>{course.prof}</h6>
            <div className='purchase'>
              <p>Free</p>
              {isEnrolled(course) ? (
                <button 
                  className="explore-button"
                  onClick={() => handleExploreClick(course)}
                >
                  Explore Now
                </button>
              ) : (
                <button 
                  onClick={() => handleEnrollClick(course)}
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showPreview && (
        <PreviewModal 
          course={selectedCourse} 
          onClose={() => setShowPreview(false)} 
        />
      )}

      {showCourseContent && (
        <CourseContent 
          course={currentCourseContent} 
          onClose={() => setShowCourseContent(false)} 
        />
      )}
    </>
  )
}

export default Courses