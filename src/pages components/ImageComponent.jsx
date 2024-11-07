import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/imagecomponent.css';

const ImageComponent = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Apply fade-out animation by adding a class
        document.querySelector('.container-image').classList.add('fade-out');

        // Navigate to TitleAnimation component with a delay to allow the animation to finish
        setTimeout(() => {
            navigate('/project-title', {
                state: { StartTitle: 'MASATO RIESSER' , midTitle : 'for', endTitle : ' VALENTINO ROSSO' }
            });
        }, 500); // Adjust delay to match fade-out duration
    };

    return (
        <div className="container-image cursor-pointer" onClick={handleClick}>
            <div className="director-line">
                <span className="director">DIRECTOR</span>
            </div>
            <h1 className='image-header'>
                MASATO RIESSER <span className=' mid-header'> for </span> VALENTINO ROSSO
            </h1>
            <div className="video-container">
                <video 
                    src='/assets/video2.mp4' 
                    alt="Mariacarla Boscono for Valentino Rosso" 
                    autoPlay 
                    loop 
                    muted 
                    className="video-element"
                />
            </div>
            <p className="credits">
                Directed by Masato Riesser, Director Of Photography Nicolas Petris, <br /> Editing by Vincent Fleischmann. Featuring Mariacarla Boscono, <br /> Jill Kortleve, Malika Louback & Jeanne Zheng.
            </p>
        </div>
    );
};

export default ImageComponent;
