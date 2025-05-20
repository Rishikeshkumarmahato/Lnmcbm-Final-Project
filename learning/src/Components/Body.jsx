import React, { useState, useEffect } from 'react'
import './Body.css';
import { why } from './why';
import img1 from '../assets/design/img1.jpg'
import { explore_courses } from './Explore_courses';
import { testinomial } from './Testinomial';
import Counter from './Counter';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';

const Body = () => {
    const [choice, setChoice] = useState(0)
    const [courseChoice, setcourseChoice] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [showEnrollSuccess, setShowEnrollSuccess] = useState(false);
    const [showCourseContent, setShowCourseContent] = useState(false);
    const [currentCourseContent, setCurrentCourseContent] = useState(null);
    const { isLoggedIn } = useAuth();

    // Using Intersection Observer for scroll animations
    const [whyRef, whyInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const [exploreRef, exploreInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const [feedbackRef, feedbackInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Auto-rotate through why section images
    useEffect(() => {
        const timer = setInterval(() => {
            setChoice((prev) => (prev + 1) % why.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

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

        if (isLoggedIn) {
            fetchEnrolledCourses();
        }
    }, [isLoggedIn]);

    const handlePreviewClick = (course) => {
        setSelectedCourse(course);
        setShowPreview(true);
    };

    const handleEnrollClick = (course) => {
        const isLoggedIn = localStorage.getItem('user');

        if (!isLoggedIn) {
            setShowLoginAlert(true);
            setTimeout(() => setShowLoginAlert(false), 3000);
            return;
        }

        setEnrolledCourses(prev => [...prev, course]);
        setShowEnrollSuccess(true);
        setTimeout(() => setShowEnrollSuccess(false), 3000);
    };

    const handleExploreClick = (course) => {
        setCurrentCourseContent(course);
        setShowCourseContent(true);
    };

    const isEnrolled = (course) => {
        return enrolledCourses.some(enrolled => enrolled.c_name === course.c_name);
    };

    const CourseContent = ({ course, onClose }) => {
        if (!course) return null;

        return (
            <div className="course-content-overlay" onClick={onClose}>
                <div className="course-content" onClick={e => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>×</button>
                    <div className="course-content-header">
                        <h1>{course.c_name}</h1>
                        <h2>{course.c_sponsor}</h2>
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

    const PreviewModal = ({ course, onClose }) => {
        if (!course) return null;

        return (
            <div className="preview-modal-overlay" onClick={onClose}>
                <div className="preview-modal-content" onClick={e => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>×</button>
                    <div className="preview-header">
                        <img src={course.image} alt={course.c_name} />
                        <div className="preview-info">
                            <h2>{course.c_name}</h2>
                            <h3>{course.c_sponsor}</h3>
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

    return (
        <>
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

            {/* Enrolled Courses Section */}
            {isLoggedIn && enrolledCourses.length > 0 && (
                <div className="enrolled-courses-section">
                    <h2>Your Enrolled Courses</h2>
                    <div className="enrolled-courses-grid">
                        {enrolledCourses.map((enrollment) => (
                            <div className="course_item" key={enrollment._id}>
                                <div className="course-image-container">
                                    <img 
                                        src={explore_courses.flat().find(c => c.c_name === enrollment.courseName)?.image || img1} 
                                        alt={enrollment.courseName} 
                                    />
                                    <div className="course-overlay">
                                        <button 
                                            className="explore-button"
                                            onClick={() => handleExploreClick({
                                                c_name: enrollment.courseName,
                                                c_sponsor: enrollment.instructor
                                            })}
                                        >
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                                <h2>{enrollment.courseName}</h2>
                                <h3>{enrollment.instructor}</h3>
                                <div className="course-progress">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress" 
                                            style={{ width: `${enrollment.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <p>Progress: {enrollment.progress || 0}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div ref={whyRef} className={`fade-in-section ${whyInView ? 'is-visible' : ''}`}>
                <h1 id='why'>Why ज्ञानSetu ?</h1>
                <div className='reason'>
                    <div className='reason_content'>
                        <div className={`box ${choice === 0 ? 'active' : ''}`} onClick={() => setChoice(0)}>
                            <div className='icon'><i className="fa-brands fa-google-scholar"></i></div>
                            <div>
                                <h2>Free Course from Top Universities</h2>
                                <p>Find Free courses from the Best Universities</p>
                            </div>
                        </div>
                        <div className={`box ${choice === 1 ? 'active' : ''}`} onClick={() => setChoice(1)}>
                            <div className='icon'><i className="fa-solid fa-laptop"></i></div>
                            <div>
                                <h2>Self-Paced Learning</h2>
                                <p>Learn at your own pace, Anytime, Anywhere</p>
                            </div>
                        </div>
                        <div className={`box ${choice === 2 ? 'active' : ''}`} onClick={() => setChoice(2)}>
                            <div className='icon'><i className="fa-solid fa-certificate"></i></div>
                            <div>
                                <h2>Earn Certifications</h2>
                                <p>Earn Certifications and Recognition from the Top Universities</p>
                            </div>
                        </div>
                        <div className={`box ${choice === 3 ? 'active' : ''}`} onClick={() => setChoice(3)}>
                            <div className='icon'><i className="fa-solid fa-graduation-cap"></i></div>
                            <div>
                                <h2>Get University Credits</h2>
                                <p>Earn University Credits and get them transferred to your degree</p>
                            </div>
                        </div>
                    </div>
                    <div className='reason_img'>
                        <img src={why[choice].source} alt="Feature illustration" />
                    </div>
                </div>
            </div>

            <div ref={exploreRef} className={`fade-in-section ${exploreInView ? 'is-visible' : ''}`}>
                <h1 id='explore'>Explore Courses</h1>
                <div className='explore_courses'>
                    <div className='course_name'>
                        <ul>
                            {['Design', 'Engineering', 'Health Sciences', 'Humanity & Arts', 'Management', 'School', 'Sciences', 'Others'].map((tab, index) => (
                                <li
                                    key={index}
                                    className={courseChoice === index ? 'active' : ''}
                                    onClick={() => {
                                        setcourseChoice(index);
                                        setActiveTab(index);
                                    }}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </div>
                    <div className="ex_courses">
                        {explore_courses[courseChoice].map((course, i) => (
                            <div className='course_item' key={i}>
                                <div className="course-image-container">
                                    <img src={course.image} alt={course.c_name} />
                                    <div className="course-overlay">
                                        <button className="preview-btn" onClick={() => handlePreviewClick(course)}>Preview Course</button>
                                    </div>
                                </div>
                                <h2>{course.c_name}</h2>
                                <h3>{course.c_sponsor}</h3>
                                <h6>{course.c_faculty}</h6>
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
                                            className={isEnrolled(course) ? 'enrolled' : ''}
                                            onClick={() => handleEnrollClick(course)}
                                        >
                                            {isEnrolled(course) ? 'Enrolled' : 'Enroll Now'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={feedbackRef} className={`feedback fade-in-section ${feedbackInView ? 'is-visible' : ''}`}>
                <h1>Hear from our Achievers</h1>
                <p id='first'>ज्ञानSetu courses have been empowering learners in multiple ways. Hear directly from our achievers on how courses have impacted them.</p>
                <div className='feed'>
                    {testinomial.map((testimonial, i) => (
                        <div className='feedItem' key={i}>
                            <div className='feedImg'>
                                <img src={testimonial.image} alt={testimonial.u_name} />
                                <h5>{testimonial.u_name}</h5>
                            </div>
                            <p>{testimonial.feed}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Counter />
            <hr />

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
    );
};

export default Body;