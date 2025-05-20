import React, { useState, useEffect } from 'react';
import './Faq.css';
import { faqContents } from './FaqContents';
import Header from './Header';
import Footer from './Footer';
import img1 from '../assets/Faq/img1.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const Faq = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('General');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const categories = [
        { id: 0, name: 'General', icon: 'fa-solid fa-circle-info' },
        { id: 1, name: 'Courses', icon: 'fa-solid fa-book-open' },
        { id: 2, name: 'Exam', icon: 'fa-solid fa-pen-to-square' },
        { id: 3, name: 'Exam Registration', icon: 'fa-solid fa-file-signature' },
        { id: 4, name: 'Post Exam', icon: 'fa-solid fa-graduation-cap' },
        { id: 5, name: 'Alert', icon: 'fa-solid fa-triangle-exclamation' }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm) {
                setIsSearching(true);
                const results = faqContents[activeCategory].filter(item =>
                    item.ques.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.ans.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSearchResults(results);
            } else {
                setIsSearching(false);
                setSearchResults(faqContents[activeCategory]);
            }
        }, 300); // Debounce search

        return () => clearTimeout(timer);
    }, [searchTerm, activeCategory]);

    const handleCategoryChange = (categoryId, categoryName) => {
        setActiveCategory(categoryId);
        setType(categoryName);
        setActiveQuestion(null);
        setSearchTerm('');
    };

    const handleQuestionClick = (questionId) => {
        setActiveQuestion(activeQuestion === questionId ? null : questionId);
    };

    const questionsToDisplay = searchTerm ? searchResults : faqContents[activeCategory];

    return (
        <>
            <Header />
            <motion.div 
                className='faq-container'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className='faq_image'
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={img1} alt="FAQ Banner" />
                </motion.div>
                
                <motion.div 
                    className='search-container'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="search-box">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Search your question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <motion.button
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <i className="fa-solid fa-times"></i>
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                <div className='faq'>
                    <motion.div 
                        className='faq_item1'
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ul>
                            {categories.map((category) => (
                                <motion.li 
                                    key={category.id}
                                    className={activeCategory === category.id ? 'active' : ''}
                                    onClick={() => handleCategoryChange(category.id, category.name)}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <i className={category.icon}></i>
                                    <span>{category.name}</span>
                                    {activeCategory === category.id && (
                                        <motion.i 
                                            className="fa-solid fa-chevron-right active-indicator"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div 
                        className='faq_item2'
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="category-header">
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <i className={categories[activeCategory].icon}></i>
                                {type}
                            </motion.h1>
                            <motion.p 
                                className="question-count"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {questionsToDisplay.length} {questionsToDisplay.length === 1 ? 'Question' : 'Questions'}
                            </motion.p>
                        </div>
                        
                        <AnimatePresence>
                            {questionsToDisplay.length === 0 ? (
                                <motion.div 
                                    className="no-results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <i className="fa-solid fa-search"></i>
                                    <p>No questions found matching your search</p>
                                </motion.div>
                            ) : (
                                questionsToDisplay.map((item, index) => (
                                    <motion.div 
                                        className={`ques_ans ${activeQuestion === item.id ? 'active' : ''}`}
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        layout
                                    >
                                        <div 
                                            className="question"
                                            onClick={() => handleQuestionClick(item.id)}
                                        >
                                            <h3>{item.ques}</h3>
                                            <motion.i 
                                                className={`fa-solid ${activeQuestion === item.id ? 'fa-minus' : 'fa-plus'}`}
                                                animate={{ rotate: activeQuestion === item.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {activeQuestion === item.id && (
                                                <motion.div 
                                                    className="answer"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p>{item.ans}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
            <Footer />
        </>
    );
};

export default Faq;