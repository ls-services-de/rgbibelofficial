"use client"

import React, { useState, useRef } from 'react';


const Kooperation = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            setIsVideoPlaying(true);
            videoRef.current.play().catch(error => {
                console.error('Error attempting to play the video:', error);
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-[150px] justify-center text-white p-4">
            <h2 className="text-4xl font-bold text-white mb-12">Wo Leistung auf Innovation trifft</h2>
            <p className="text-dimWhite mb-6 text-center text-2xl max-w-3xl leading-relaxed">
            RGBibelOfficial und Triebwerk Energy stehen für eine klare Mission: dir die beste Gaming-Performance zu einem fairen Preis zu bieten. Wir kombinieren unsere hochwertigen Gaming-PCs mit der innovativen Energieversorgung von Triebwerk, damit du ohne Kompromisse spielen kannst.
            </p>
            <div className="relative w-full max-w-xl mt-7">
                <video
                    ref={videoRef}
                    width="100%"
                    height="315"
                    controls
                    style={{ display: isVideoPlaying ? 'block' : 'none' }}
                >
                    <source src="/assets/vision.mp4" type="video/mp4" />
                    Ihr Browser unterstützt das Video-Tag nicht.
                </video>
                {!isVideoPlaying && (
                    <div className="relative">
                        <img
                            src="/assets/vision.png"
                            alt="Video Thumbnail"
                            className="w-full"
                        />
                        <img
                            src="playbutton-yellow.png"
                            alt="Play Button"
                            className="absolute inset-0 w-20 h-auto m-auto cursor-pointer"
                            onClick={handlePlayVideo}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Kooperation;
