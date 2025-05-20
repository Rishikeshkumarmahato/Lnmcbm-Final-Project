import React, { useState, useEffect } from 'react'
import './Slider.css';
import sliderimg from '../assets/sliderimg.svg'
import { sliderContent } from './SliderContent';

const Slider = () => {
    const [next, setNext] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState('next');

    useEffect(() => {
        let slideTimer;
        if (isAutoPlaying) {
            slideTimer = setInterval(() => {
                handleNext();
            }, 5000);
        }
        return () => clearInterval(slideTimer);
    }, [isAutoPlaying, next]);

    const handlePrev = () => {
        setDirection('prev');
        setIsAutoPlaying(false);
        if (next === 0) {
            setNext(sliderContent.length - 1);
        } else {
            setNext(next - 1);
        }
        // Resume auto-play after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const handleNext = () => {
        setDirection('next');
        if (next === sliderContent.length - 1) {
            setNext(0);
        } else {
            setNext(next + 1);
        }
    };

    // Pause auto-play on hover
    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

    return (
        <>
            <h1 id='coming'>Coming Soon</h1>
            <div className="sliderContainer">
                <div 
                    className='slider'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="leftbtn" onClick={handlePrev}>
                        <button><i className="fa-solid fa-chevron-left"></i></button>
                    </div>
                    <div className={`sliderBody slide-${direction}`}>
                        <div className='sliderBody_img'>
                            <img src={sliderimg} alt="Slider illustration" />
                        </div>
                        <div className='sliderBody_content'>
                            <h1>{sliderContent[next].title}</h1>
                            <div className='sliderBody_content_item'>
                                <label>
                                    <i className="fa-solid fa-award"></i> Special Recognition
                                </label>
                                <p>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    Starts at {sliderContent[next].time} AM | {sliderContent[next].date}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rightbtn" onClick={() => {
                        setIsAutoPlaying(false);
                        handleNext();
                        // Resume auto-play after 10 seconds of inactivity
                        setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}>
                        <button><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <div className="slider-indicators">
                        {sliderContent.map((_, index) => (
                            <div
                                key={index}
                                className={`indicator ${index === next ? 'active' : ''}`}
                                onClick={() => {
                                    setIsAutoPlaying(false);
                                    setDirection(index > next ? 'next' : 'prev');
                                    setNext(index);
                                    setTimeout(() => setIsAutoPlaying(true), 10000);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider;